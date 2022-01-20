import {Knex} from 'knex';

// criar a tabela MeasurementUnit
export async function up(knex: Knex){
    
    return knex.schema.createTable('MeasurementUnit', (table) => {
        table.increments('id').primary();
        table.string('symbol').notNullable();
        table.string('description').notNullable();
    });
};

// excluir tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('MeasurementUnit');
}