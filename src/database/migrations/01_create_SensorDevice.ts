import {Knex} from 'knex';

// criar a tabela SensorDevice
export async function up(knex: Knex){
    
    return knex.schema.createTable('SensorDevice', (table) => {
        table.increments('id').primary();
        table.string('key').notNullable().unique();
        table.string('label').notNullable();
        table.string('description').notNullable();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('User');
    });
};

// excluir tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('SensorDevice');
}