import { Request, Response } from 'express';
import constants from '../constants/constants';

export class RequestMiddleware {
    public validateRequest(req: Request, res: Response, next: Function): void {
        const userId = req.headers.userid;
        if (!userId) {
            res.status(400).json({ message: constants.unauthorisedAccess });
        } else {
            next();
        }
    }
}
