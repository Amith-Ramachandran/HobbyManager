import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ConnectionManger from './db/ConnectionManager';

class App {
    public app: Application;

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
    }

    private __connectDB(): void {
        new ConnectionManger();
    }
}

const app = new App().app;
export default app;
