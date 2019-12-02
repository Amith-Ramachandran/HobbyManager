import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ConnectionManger from './db/ConnectionManager';
import swaggerUi from 'swagger-ui-express';

class App {
    public app: Application;
    swaggerDocument = require('../swagger.json');

    constructor() {
        this.app = express();
        this.__setConfig();
        this.__connectDB();
    }

    private __setConfig(): void {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    }

    private __connectDB(): void {
        new ConnectionManger();
    }
}

const app = new App().app;
export default app;
