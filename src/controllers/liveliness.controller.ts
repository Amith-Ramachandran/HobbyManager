import { Request, Response } from 'express';
import messages from '../constants/constants';
import logger from '../utilities/logger';

export class LivelinessController {
    public getLiveliness(req: Request, res: Response): void {
        try {
            res.status(200).send({ message: messages.liveliness });
        } catch (error) {
            logger.exception(error);
            res.status(500).send({ message: messages.internalServerError });
        }
    }
}
