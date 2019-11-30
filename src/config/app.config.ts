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
});

config.validate({ allowed: 'strict' });

export default config;
