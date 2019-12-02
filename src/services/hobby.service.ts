import { Hobby, HobbyModel } from '../db/models/hobby';
import logger from '../utilities/logger';

export class HobbyService {
    // Get all hobbies from the system
    public async getAllHobbies(): Promise<Array<HobbyModel> | undefined> {
        try {
            const hobbies: Array<HobbyModel> = await Hobby.find({}, {});
            logger.info(hobbies);
            return hobbies;
        } catch (error) {
            logger.exception(error);
        }
    }

    // Get one hobby details
    public async getHobbyDetails(hobbyID: string): Promise<HobbyModel | undefined | null> {
        try {
            const hobby: HobbyModel | null = await Hobby.findOne({ _id: hobbyID }, {});
            return hobby;
        } catch (error) {
            logger.exception(error);
        }
    }

    // Update one hobby details
    public async updateHobby(hobbyID: string, requestData: HobbyModel): Promise<HobbyModel | undefined | null> {
        try {
            const hobby: HobbyModel | null = await Hobby.findOne({ _id: hobbyID });
            if (hobby) {
                await Hobby.updateOne(
                    { _id: hobbyID },
                    {
                        name: requestData.name,
                        passionLevel: requestData.passionLevel,
                        year: requestData.year,
                    },
                );
                const updatedHobby: HobbyModel | null = await Hobby.findOne({ _id: hobbyID });
                return updatedHobby;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }
}
