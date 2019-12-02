import { Request, Response } from 'express';
import { HobbyService } from '../services/hobby.service';
import constants from '../constants/constants';
import logger from '../utilities/logger';
import { HobbyModel } from '../db/models/hobby';

export class HobbyController {
    private hobbyService: HobbyService = new HobbyService();
    // Get all hobbies
    public getAllHobbies = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobbies = await this.hobbyService.getAllHobbies();
            res.status(200).send({ data: hobbies });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    //Get a hobby details
    public getHobbyDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobby = await this.hobbyService.getHobbyDetails(req.params.id);
            res.status(200).send({ data: hobby });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    // Update a hobby details
    public updateHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobby: HobbyModel | undefined | null = await this.hobbyService.updateHobby(req.params.id, req.body);
            if (hobby) {
                res.status(200).send({ message: constants.succesfullUpdation, data: hobby });
            } else {
                res.status(200).send({ message: constants.failedUpdation });
            }
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };
}
