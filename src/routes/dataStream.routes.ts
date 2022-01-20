import {Router} from 'express';
import knex from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

const dataStreamRouter = Router();

// listar todas as streams
dataStreamRouter.get('/', async (request, response) => {

    const streams = await knex('DataStream').select('*');

    return response.json(streams);
});

// consultar uma stream pela sua key
dataStreamRouter.get('/:key', async (request, response) => {

    const {key} = request.params;

    const stream = await knex
        .select('id',
                'key',
                'label',
                'measurementUnit_id as unitId',
                'sensorDevice_id as deviceId')
        .from('DataStream').where('key', key).first();

    if(!stream) return response.status(400).json({message: 'Data stream not found.'});
    
    const measurementCount = await knex('SensorData')
            .count('* as measurementCount')
            .where('SensorData.dataStream_id', stream.id);
    
    stream['measurementCount'] = measurementCount[0].measurementCount;

    const measurementsList = await knex
            .select('timestamp', 'value')
            .from('SensorData')
            .where('SensorData.datastream_id', stream.id);

    stream['measurements'] = measurementsList;
    
    delete stream.enabled;

    return response.json(stream);
});

// registrar uma stream em um dispositivo
dataStreamRouter.post('/:key', async (request, response) => {

    const {key} = request.params;

    const {
        label,
        unitId
    } = request.body;

    const device = await knex('SensorDevice').where('key', key).first();
    
    if(!device) return response.status(400).json({message: 'Device not found.'});

    const existenceChecker = await knex('MeasurementUnit').where('id', unitId).first();

    if(!existenceChecker) return response.status(400).json({message: 'Measurement unit not found.'});

    const newStreamKey = uuidv4();
    
    const stream = {
        key: newStreamKey,
        label,
        enabled: false,
        measurementUnit_id: unitId,
        sensorDevice_id: device.id
    };

    const newStreamId = await knex('DataStream').insert(stream);

    return response.json({
        id: newStreamId[0],
        key: newStreamKey,
        label,
        unitId,
        deviceId: device.id,
        measurementCount: 0
    })
});

export default dataStreamRouter;