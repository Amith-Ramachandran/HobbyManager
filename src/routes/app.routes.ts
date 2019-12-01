import { Application } from 'express';
import { LivelinessController } from '../controllers/liveliness.controller';
import { RequestMiddleware } from '../middlewares/request.middleware';
import { UserController } from '../controllers/user.controller';

export class AppRoutes {
    private livelinessController = new LivelinessController();
    private requestMiddleware = new RequestMiddleware();
    private userController = new UserController();
    public routes(app: Application): void {
        app.route('/liveliness').get(this.requestMiddleware.validateRequest, this.livelinessController.getLiveliness);
        app.route('/users').post(this.requestMiddleware.validateRequest, this.userController.createUser);
        app.route('/users').get(this.requestMiddleware.validateRequest, this.userController.getAllUsers);
        app.route('/users/:id').get(this.requestMiddleware.validateRequest, this.userController.getUserDetails);
        app.route('/users/:id').put(this.requestMiddleware.validateRequest, this.userController.updateUser);
        app.route('/users/:id').delete(this.requestMiddleware.validateRequest, this.userController.deleteUser);
        app.route('/users/hobby').post(this.requestMiddleware.validateRequest, this.userController.createUserWithHobby);
    }
}
