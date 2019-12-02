import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import constants from '../constants/constants';
import logger from '../utilities/logger';
import { UserModel } from '../db/models/user';

export class UserController {
    private userService: UserService = new UserService();
    // Get all users in the system
    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).send({ data: users });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    // Get a user details
    public getUserDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.getUserDetails(req.params.id);
            res.status(200).send({ data: user });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    // Create a user with basic details
    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).send({ message: constants.successfullUserCreation, data: user });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    // Update a user details
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: UserModel | undefined | null = await this.userService.updateUser(req.params.id, req.body);
            if (user) {
                res.status(200).send({ message: constants.succesfullUpdation, data: user });
            } else {
                res.status(200).send({ message: constants.failedUpdation });
            }
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };
}
