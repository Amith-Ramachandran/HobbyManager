import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();

const config = convict({
    host: {
        doc: 'Host address',
        default: 'localhost',
        env: 'HOST_NAME',
    },
    port: {
        doc: 'port number',
        default: 8000,
        env: 'PORT',
    },
    database: {
        host: {
            doc: 'DB Host',
            default: 'localhost',
            env: 'DB_HOST',
        },
        port: {
            doc: 'DB Port',
            default: '27017',
            env: 'DB_PORT',
        },
        dbname: {
            doc: 'DB name',
            default: '',
            env: 'DB_NAME',
        },
    },
});

config.validate({ allowed: 'strict' });

export default config;
