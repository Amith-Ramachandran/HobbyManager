import { Request, Response } from 'express';
import constants from '../constants/constants';

export class RequestMiddleware {
    public validateRequest(req: Request, res: Response, next: Function): void {
        const jwtToken = req.headers.jwttoken;
        if (!jwtToken) {
            res.status(400).json({ message: constants.unauthorisedAccess });
        } else {
            next();
        }
    }
}
