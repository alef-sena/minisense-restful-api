import {Router} from 'express';
import userRouter from './user.routes';
import measurementUnitRouter from './measurementUnit.routes';
import sensorDeviceRouter from './sensorDevice.routes';
import dataStreamRouter from './dataStream.routes';
import sensorDataRouter from './sensorData.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/measurementUnit', measurementUnitRouter);
routes.use('/sensorDevice', sensorDeviceRouter);
routes.use('/dataStream', dataStreamRouter);
routes.use('/sensorData', sensorDataRouter);

export default routes;