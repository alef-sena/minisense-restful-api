import {Knex} from 'knex';
import { v4 as uuidv4 } from 'uuid';

// inserindo registros de teste na tabela DataStream
export async function seed(knex: Knex){
    await knex('DataStream').insert([
        {key: uuidv4(), label: 'temperatura', enabled: false, measurementUnit_id: 3, sensorDevice_id: 1},
        {key: uuidv4(), label: 'humidade', enabled: false, measurementUnit_id: 2, sensorDevice_id: 1},
        {key: uuidv4(), label: 'distancia', enabled: false, measurementUnit_id: 5, sensorDevice_id: 3},
        {key: uuidv4(), label: 'calor', enabled: false, measurementUnit_id: 1, sensorDevice_id: 3},
        {key: uuidv4(), label: 'sinal', enabled: false, measurementUnit_id: 3, sensorDevice_id: 3},
        {key: uuidv4(), label: 'velocidade', enabled: false, measurementUnit_id: 3, sensorDevice_id: 6},
        {key: uuidv4(), label: 'decibeis', enabled: false, measurementUnit_id: 1, sensorDevice_id: 7},
        {key: uuidv4(), label: 'internet', enabled: false, measurementUnit_id: 4, sensorDevice_id: 8},
        {key: uuidv4(), label: 'alcance', enabled: false, measurementUnit_id: 1, sensorDevice_id: 9},
        {key: uuidv4(), label: 'frio', enabled: false, measurementUnit_id: 5, sensorDevice_id: 9},
        {key: uuidv4(), label: 'tamanho', enabled: false, measurementUnit_id: 2, sensorDevice_id: 11},
        {key: uuidv4(), label: 'cobertura', enabled: false, measurementUnit_id: 1, sensorDevice_id: 12},
        {key: uuidv4(), label: 'cor', enabled: false, measurementUnit_id: 4, sensorDevice_id: 13},
        {key: uuidv4(), label: 'dureza', enabled: false, measurementUnit_id: 4, sensorDevice_id: 13},
        {key: uuidv4(), label: 'consistencia', enabled: false, measurementUnit_id: 3, sensorDevice_id: 13},
        {key: uuidv4(), label: 'boniteza', enabled: false, measurementUnit_id: 1, sensorDevice_id: 16},
    ]);
}