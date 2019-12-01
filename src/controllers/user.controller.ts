import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import constants from '../constants/constants';
import logger from '../utilities/logger';

export class UserController {
    private userService: UserService = new UserService();

    public createUserWithHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.createUserWithHobby(req.body);
            res.status(200).send({ message: user });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).send({ data: users });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public getUserDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.getUserDetails(req.params.id);
            res.status(200).send({ data: user });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).send({ message: constants.successfullUserCreation, data: user });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: any = await this.userService.updateUser(req.params.id, req.body);
            if (user && user.n) {
                res.status(200).send({ message: constants.succesfullUpdation });
            } else {
                res.status(200).send({ message: constants.failedUpdation });
            }
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: any = await this.userService.deleteUser(req.params.id);
            if (user && user.n) {
                res.status(200).send({ message: constants.succesfullDeletion });
            } else {
                res.status(200).send({ message: constants.failedDeletion });
            }
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };
}
