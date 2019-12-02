import { Application } from 'express';
import { LivelinessController } from '../controllers/liveliness.controller';
import { RequestMiddleware } from '../middlewares/request.middleware';
import { UserController } from '../controllers/user.controller';
import { UserHobbyController } from '../controllers/userhobby.cotroller';
import { HobbyController } from '../controllers/hobby.controller';

export class AppRoutes {
    private livelinessController = new LivelinessController();
    private requestMiddleware = new RequestMiddleware();
    private userController = new UserController();
    private userHobbyController = new UserHobbyController();
    private hobbyController = new HobbyController();

    public routes(app: Application): void {
        app.route('/liveliness').get(this.requestMiddleware.validateRequest, this.livelinessController.getLiveliness);

        app.route('/users').get(this.requestMiddleware.validateRequest, this.userController.getAllUsers);
        app.route('/users/:id').get(this.requestMiddleware.validateRequest, this.userController.getUserDetails);
        app.route('/users').post(this.requestMiddleware.validateRequest, this.userController.createUser);
        app.route('/users/:id').put(this.requestMiddleware.validateRequest, this.userController.updateUser);

        app.route('/hobbies').get(this.requestMiddleware.validateRequest, this.hobbyController.getAllHobbies);
        app.route('/hobbies/:id').get(this.requestMiddleware.validateRequest, this.hobbyController.getHobbyDetails);
        app.route('/hobbies/:id').put(this.requestMiddleware.validateRequest, this.hobbyController.updateHobby);

        app.route('/userhobbies').get(
            this.requestMiddleware.validateRequest,
            this.userHobbyController.getUsersWithHobby,
        );
        app.route('/userhobbies').post(
            this.requestMiddleware.validateRequest,
            this.userHobbyController.createUserWithHobby,
        );
        app.route('/users/:id').delete(
            this.requestMiddleware.validateRequest,
            this.userHobbyController.deleteUserWithHobby,
        );
        app.route('/users/:userID/hobbies').post(
            this.requestMiddleware.validateRequest,
            this.userHobbyController.createHobby,
        );
        app.route('/users/:userID/hobbies/:hobbyID').delete(
            this.requestMiddleware.validateRequest,
            this.userHobbyController.deleteHobby,
        );
    }
}
