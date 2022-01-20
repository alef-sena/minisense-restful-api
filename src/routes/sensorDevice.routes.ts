import {Router} from 'express';
import knex from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

const sensorDeviceRouter = Router();

// listar todos os dispositivos
sensorDeviceRouter.get('/', async (request, response) => {

    const device = await knex('SensorDevice').select('*');

    return response.json(device);
});

// consultar um dispositivo pela sua key
sensorDeviceRouter.get('/device/:key', async (request, response) => {

    const {key} = request.params;

    const device = await knex('SensorDevice').where('key', key).first();

    if(!device) return response.status(400).json({message: 'Sensor device not found.'});

    const streamList = await knex
        .select('DataStream.id',
                'DataStream.key',
                'DataStream.label',
                'DataStream.measurementUnit_id as unitId',
                'DataStream.sensorDevice_id as deviceId')
        .from('SensorDevice')
        .join('DataStream', 'SensorDevice.id', '=', 'DataStream.sensorDevice_id')
        .where('DataStream.sensorDevice_id', device.id);

    for (let i in streamList) {

        const measurementCount = await knex('SensorData')
            .count('* as measurementCount')
            .where('SensorData.dataStream_id', streamList[i].id);
        
        streamList[i]['measurementCount'] = measurementCount[0].measurementCount;

        const measurementsList = await knex
            .select('timestamp', 'value')
            .from('SensorData')
            .where('SensorData.datastream_id', streamList[i].id)
            .limit(5);

        streamList[i]['measurements'] = measurementsList;
    }
    
    const formatedResponse = {
        id: device.id,
        key: device.key,
        label: device.label,
        description: device.description,
        streams: streamList
    };

    return response.json(formatedResponse);
});

// consultar dispositivos de um usuario atraves do seu email
sensorDeviceRouter.get('/userDevice/:email', async (request, response) => {

    const {email} = request.params;

    const user = await knex('User').where('email', email).first();
    
    if(!user) return response.status(400).json({message: 'User not found.'});
    
    const deviceList = await knex
        .select('SensorDevice.id',
                'SensorDevice.key',
                'SensorDevice.label',
                'SensorDevice.description')
        .from('SensorDevice')
        .join('User', 'SensorDevice.user_id', '=', 'User.id')
        .where('SensorDevice.user_id', user.id);
    
    for (let deviceIndex in deviceList) {
        
        const streams = await knex
            .select('DataStream.id',
                    'DataStream.key',
                    'DataStream.label',
                    'DataStream.measurementUnit_id as unitId',
                    'DataStream.sensorDevice_id as deviceId')
            .from('DataStream')
            .join('SensorDevice', 'DataStream.sensorDevice_id', '=', 'SensorDevice.id')
            .where('DataStream.sensorDevice_id', deviceList[deviceIndex].id);

        for (let streamIndex in streams){
            
            const measurementCount = await knex('DataStream')
                .count('* as measurementCount')
                .where('DataStream.sensorDevice_id', streams[streamIndex].id);

            streams[streamIndex]['measurementCount'] = measurementCount[0].measurementCount;
        }
            
        deviceList[deviceIndex]['streams'] = streams;
    }

    return response.json(deviceList);
});

// registrar um dispositivo para um usuário
sensorDeviceRouter.post('/', async (request, response) => {

    const {
        email,
        label,
        description
    } = request.body;

    const user = await knex('User').where('email', email).first();

    if(!user) return response.status(400).json({message: 'User not found.'});

    const existenceChecker = await knex('SensorDevice').where('label', label).first();

    if(existenceChecker) return response.status(400).json({message: 'Sensor device already exists.'});

    const key = uuidv4();

    const device = {
        key,
        label,
        description,
        user_id: user.id
    };

    const newDeviceId = await knex('SensorDevice').insert(device);

    return response.json({
        id: newDeviceId[0],
        ...device
    });
});

export default sensorDeviceRouter;