import {Router} from 'express';
import knex from '../database/connection';

const sensorDataRouter = Router();

// listar todos os dados de streams
sensorDataRouter.get('/', async (request, response) => {

    const datas = await knex('SensorData').select('*');

    return response.json(datas);
});

// registrar uma medição em uma stream
sensorDataRouter.post('/:key', async (request, response) => {

    const {key} = request.params;

    const {
        timestamp,
        value
    } = request.body;

    const stream = await knex('DataStream').where('key', key).first();
    
    if(!stream) return response.status(400).json({message: 'Data stream not found.'});

    const data = {
        timestamp,
        value,
        measurementUnit_id: stream.measurementUnit_id,
        dataStream_id: stream.id
    };

    const newDataId = await knex('SensorData').insert(data);

    return response.json({
        id: newDataId[0],
        timestamp,
        value,
        unitId: data.measurementUnit_id
    });
});

export default sensorDataRouter;