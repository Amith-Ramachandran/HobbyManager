import mongoose from 'mongoose';
import config from '../config/app.config';
import logger from '../utilities/logger';
import constants from '../constants/constants';

export default class ConnectionManger {
    private host = config.get('database.host');
    private port = config.get('database.port');
    private db = config.get('database.dbname');

    constructor() {
        this.__connectDB();
    }

    private async __connectDB(): Promise<void> {
        try {
            await mongoose.connect(`mongodb://${this.host}:${this.port}/${this.db}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            logger.info(constants.succesfullDBConnection);
        } catch (error) {
            console.error(constants.failedDBConnection);
            console.exception(error);
        }
    }

    public closeConnection(): void {
        mongoose.connection.close();
    }
}
