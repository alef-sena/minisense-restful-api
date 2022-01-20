import {Router} from 'express';
import knex from '../database/connection';

const measurementUnitRouter = Router();

// listar todas as unidades de medida
measurementUnitRouter.get('/', async (request, response) => {
    
    const units = await knex('MeasurementUnit').select('*');

    return response.json(units);
});

// consultar uma unidade de medida pela descrição
measurementUnitRouter.get('/:measurementUnitDescription', async (request, response) => {

    const {measurementUnitDescription} = request.params;

    const unit = await knex('MeasurementUnit').where('description', measurementUnitDescription).first();

    if(!unit) return response.status(400).json({message: 'Measurement unit not found.'});
    
    return response.json(unit);
});

// registrar uma unidade de medida
measurementUnitRouter.post('/', async (request, response) => {
    
    const {symbol, description} = request.body;

    const unit = {
        symbol, 
        description
    };

    const existenceChecker = await knex('MeasurementUnit').where('symbol', symbol).first();

    if(existenceChecker) return response.status(400).json({message: 'Measurement unit already exists.'});

    const newId = await knex('MeasurementUnit').insert(unit);

    return response.json({
        id: newId[0],
        ...unit
    });
});

export default measurementUnitRouter;