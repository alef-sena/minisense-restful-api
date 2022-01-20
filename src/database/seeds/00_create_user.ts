import {Knex} from 'knex';

// inserindo registros de teste na tabela User
export async function seed(knex: Knex){
    await knex('User').insert([
        {username: 'test', email: 'test@gmail.com'},
        {username: 'support', email: 'support@gmail.com'},
        {username: 'aaa', email: 'aaa@gmail.com'},
        {username: 'aux', email: 'aux@gmail.com'},
        {username: 'john', email: 'john@gmail.com'},
        {username: 'noobMaster69', email: 'noobMaster69@gmail.com'},
        {username: 'supremeTester', email: 'supremeTester@gmail.com'},
        {username: 'importantCompany', email: 'importantCompany@gmail.com'},
        {username: 'richUser', email: 'richUser@gmail.com'}
    ]);
}