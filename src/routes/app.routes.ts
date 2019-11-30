import { Application } from 'express';
import { LivelinessController } from '../controllers/app.liveliness';
import { RequestMiddleware } from '../middlewares/app.requestmiddleware';

export class AppRoutes {
    private livelinessController = new LivelinessController();
    private requestMiddleware = new RequestMiddleware();
    public routes(app: Application): void {
        app.route('/liveliness').get(this.requestMiddleware.validateRequest, this.livelinessController.getLiveliness);
    }
}
