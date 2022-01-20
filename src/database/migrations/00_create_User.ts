import {Knex} from 'knex';

// criar a tabela User
export async function up(knex: Knex){
    
    return knex.schema.createTable('User', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
    });
};

// excluir tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('User');
}