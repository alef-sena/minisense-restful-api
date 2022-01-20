import {Knex} from 'knex';

// inserindo registros de teste na tabela MeasurementUnit
export async function seed(knex: Knex){
    await knex('MeasurementUnit').insert([
        {symbol: 'ºC', description: 'celsius'},
        {symbol: 'mg/m³C', description: 'megagram per cubic metre'},
        {symbol: 'hPA', description: 'hectopasca'},
        {symbol: 'lux', description: 'lux'},
        {symbol: '%', description: 'percent'}
    ]);
}