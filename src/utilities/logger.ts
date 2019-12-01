import winston from 'winston';

// Basic logging layer. It helps to hide complexity from logic layer. Easy to replace the logging library or maintain the implementation at single place.

class Logger {
    private log: any;
    constructor() {
        this.log = winston.createLogger({
            level: 'info',
            transports: [new winston.transports.Console()],
        });
    }

    public info = (message: object | string): void => {
        this.log.info(message);
    };

    public error = (errMessage: object): void => {
        this.log.log('error', errMessage);
    };

    public exception = (err: { stack: object | string }): void => {
        this.log.log('error', err.stack);
    };
}

export default new Logger();
