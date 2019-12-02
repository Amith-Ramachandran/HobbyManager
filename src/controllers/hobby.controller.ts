import { Request, Response } from 'express';
import { HobbyService } from '../services/hobby.service';
import constants from '../constants/constants';
import logger from '../utilities/logger';

export class HobbyController {
    private hobbyService: HobbyService = new HobbyService();
    public getAllHobbies = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobbies = await this.hobbyService.getAllHobbies();
            res.status(200).send({ data: hobbies });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public getHobbyDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobby = await this.hobbyService.getHobbyDetails(req.params.id);
            res.status(200).send({ data: hobby });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };

    public updateHobby = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobby: any = await this.hobbyService.updateHobby(req.params.id, req.body);
            if (hobby && hobby.n) {
                res.status(200).send({ message: constants.succesfullUpdation });
            } else {
                res.status(200).send({ message: constants.failedUpdation });
            }
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: constants.internalServerError });
        }
    };
}
