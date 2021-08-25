import * as express from 'express';
import * as apiRouter from './routes';
import * as cors from 'cors';
import * as morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(morgan('dev'));

app.use('/api/', apiRouter.default);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
