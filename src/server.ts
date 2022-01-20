import express from 'express';
import cors from 'cors';
import {errors} from 'celebrate';
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use('/minisense-restful-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errors());

app.listen(3333, () => {console.log('Server started on port 3333')} );