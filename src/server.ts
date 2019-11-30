import app from './app';
import constants from './constants/constants';
import config from './config/app.config';
import { AppRoutes } from './routes/app.routes';

const port = config.get('port');

const appRouts = new AppRoutes();

appRouts.routes(app);

app.listen(port, () => {
    console.log(`${constants.serverStarted}${port}`);
});
