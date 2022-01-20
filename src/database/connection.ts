import knex from 'knex';
import path from 'path';

// criar a conexão com o banco de dados SQLite3
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
});

export default connection;