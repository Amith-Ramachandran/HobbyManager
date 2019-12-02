import app from './app';
import constants from './constants/constants';
import config from './config/app.config';
import { AppRoutes } from './routes/app.routes';
import logger from './utilities/logger';

const port = config.get('port');

const appRouts = new AppRoutes();

appRouts.routes(app);

//Application starts here
app.listen(port, () => {
    logger.info(`${constants.serverStarted}${port}`);
});
