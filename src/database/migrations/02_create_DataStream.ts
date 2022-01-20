import {Knex} from 'knex';

// criar a tabela DataStream
export async function up(knex: Knex){
    
    return knex.schema.createTable('DataStream', (table) => {
        table.increments('id').primary();
        table.string('key').notNullable().unique();
        table.string('label').notNullable();
        table.boolean('enabled').notNullable();
        table.integer('measurementUnit_id')
            .notNullable()
            .references('id')
            .inTable('MeasurementUnit');
        table.integer('sensorDevice_id')
            .notNullable()
            .references('id')
            .inTable('SensorDevice');
    });
};

// excluir tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('DataStream');
}