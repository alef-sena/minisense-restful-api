import {Knex} from 'knex';

// criar a tabela SensorData
export async function up(knex: Knex){
    
    return knex.schema.createTable('SensorData', (table) => {
        table.increments('id').primary();
        table.string('timestamp').notNullable();
        table.double('value').notNullable();
        table.integer('measurementUnit_id')
            .notNullable()
            .references('id')
            .inTable('MeasurementUnit');
        table.integer('dataStream_id')
            .notNullable()
            .references('id')
            .inTable('DataStream');
    });
};

// excluir tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('SensorData');
}