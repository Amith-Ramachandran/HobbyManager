import { Hobby, HobbyModel } from '../db/models/hobby';
import logger from '../utilities/logger';

export class HobbyService {
    public async getAllHobbies(): Promise<Array<HobbyModel> | undefined> {
        try {
            const hobbies: Array<HobbyModel> = await Hobby.find({}, {});
            logger.info(hobbies);
            return hobbies;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async getHobbyDetails(hobbyID: string): Promise<HobbyModel | undefined | null> {
        try {
            const hobby: HobbyModel | null = await Hobby.findOne({ _id: hobbyID }, {});
            return hobby;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async updateHobby(hobbyID: string, requestData: HobbyModel): Promise<HobbyModel | undefined> {
        try {
            const hobby: HobbyModel | null = await Hobby.findOne({ _id: hobbyID });
            if (hobby) {
                const updatedHobby: HobbyModel = await Hobby.updateOne(
                    { _id: hobbyID },
                    {
                        name: requestData.name,
                        spassionLevel: requestData.passionLevel,
                        year: requestData.year,
                    },
                );
                return updatedHobby;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }
}
