import {Router} from 'express';
import knex from '../database/connection';

const userRouter = Router();

// listar todos os usuários
userRouter.get('/', async (request, response) => {

    const users = await knex('User').select('*');

    return response.json(users);
});

// consultar usuario pelo email
userRouter.get('/:email', async (request, response) => {

    const {email} = request.params;

    const user = await knex('User').where('email', email).first();

    if(!user) return response.status(400).json({message: 'User not found.'});
    
    return response.json(user);
});

// criar usuario
userRouter.post('/', async (request, response) => {

    const {username, email} = request.body;

    const user = {
        username, 
        email
    };

    const existenceChecker1 = await knex('User').where('username', username).first();
    const existenceChecker2 = await knex('User').where('email', email).first();

    if(existenceChecker1 || existenceChecker2) return response.status(400).json({message: 'Username or email already exists.'});

    const newId = await knex('User').insert(user);

    return response.json({
        id: newId[0],
        ...user
    });
});

export default userRouter;