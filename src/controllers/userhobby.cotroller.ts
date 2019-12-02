import { Request, Response } from 'express';
import { UserHobbyService } from '../services/userhobby.service';
import constants from '../constants/constants';
import logger from '../utilities/logger';
import { UserModel } from '../db/models/user';
import { HobbyModel } from '../db/models/hobby';

export class UserHobbyController {
    private userHobbyService: UserHobbyService = new UserHobbyService();

    public getUsersWithHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const userHobbies: Array<UserModel> | undefined = await this.userHobbyService.getUsersWithHobby();
            res.status(200).send({ message: userHobbies });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public createUserWithHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userHobbyService.createUserWithHobby(req.body);
            res.status(200).send({ message: user });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public deleteUserWithHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: object | undefined = await this.userHobbyService.deleteUser(req.params.id);
            if (user) {
                res.status(200).send({ message: constants.succesfullDeletion });
            } else {
                res.status(200).send({ message: constants.failedDeletion });
            }
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public createHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const result: HobbyModel | undefined = await this.userHobbyService.createHobby(req.params.userID, req.body);
            res.status(200).send({ data: result });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public deleteHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const result: object | undefined = await this.userHobbyService.deleteHobby(
                req.params.userID,
                req.params.hobbyID,
            );
            if (result) {
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
