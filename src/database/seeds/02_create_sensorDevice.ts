import {Knex} from 'knex';
import { v4 as uuidv4 } from 'uuid';

// inserindo registros de teste na tabela SensorDevice
export async function seed(knex: Knex){
    await knex('SensorDevice').insert([
        {key: uuidv4(), label: 'sensor 01', description: 'controle sala', user_id: 1},
        {key: uuidv4(), label: 'robozin', description: 'cuidar da casa', user_id: 1},
        {key: uuidv4(), label: 'dvd', description: 'assistir filme', user_id: 2},
        {key: uuidv4(), label: 'geladeira', description: 'controle frio', user_id: 2},
        {key: uuidv4(), label: 'fogao', description: 'controle calor', user_id: 2},
        {key: uuidv4(), label: 'maquina complexa', description: 'controle muito complexo', user_id: 2},
        {key: uuidv4(), label: 'mineradora', description: 'profundidade', user_id: 4},
        {key: uuidv4(), label: 'wifi', description: 'velocidade internet', user_id: 4},
        {key: uuidv4(), label: 'som', description: 'altura do som', user_id: 5},
        {key: uuidv4(), label: 'roteador', description: 'alcance do sinal', user_id: 5},
        {key: uuidv4(), label: 'computador', description: 'tempo ligado', user_id: 6},
        {key: uuidv4(), label: 'celular', description: 'bateria', user_id: 8},
        {key: uuidv4(), label: 'batedeira', description: 'força', user_id: 8},
        {key: uuidv4(), label: 'ventilador', description: 'velocidade giro', user_id: 8},
        {key: uuidv4(), label: 'maquina de costura', description: 'linha consumida', user_id: 9},
        {key: uuidv4(), label: 'lampada', description: 'luminosidade', user_id: 9}
    ]);
}