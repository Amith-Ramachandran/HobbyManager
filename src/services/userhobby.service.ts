import { User, UserModel } from '../db/models/user';
import logger from '../utilities/logger';
import { Hobby, HobbyModel } from '../db/models/hobby';

export class UserHobbyService {
    //Get all users withcorresponding hobbies
    public async getUsersWithHobby(): Promise<Array<UserModel> | undefined> {
        try {
            const userHobbies: Array<UserModel> = await User.find({})
                .populate('hobby')
                .exec();
            return userHobbies;
        } catch (error) {
            logger.exception(error);
        }
    }

    // Create user with hobby details
    public async createUserWithHobby(requestData: UserModel): Promise<UserModel | undefined> {
        try {
            const userInfo: object = { name: requestData.name };
            const hobbyInfo: object = requestData.hobby;

            const user: UserModel = new User(userInfo);
            const hobbyData: HobbyModel = new Hobby(hobbyInfo);

            const newHobby: HobbyModel = await hobbyData.save();
            user.hobby.push(newHobby._id);
            const newUser: UserModel = await user.save();
            return newUser;
        } catch (error) {
            logger.exception(error);
        }
    }

    //Delete a user and user's hobbies
    public async deleteUser(userID: string): Promise<object | undefined> {
        try {
            const user: UserModel | null = await User.findOne({ _id: userID });
            if (user) {
                await Hobby.deleteMany({ _id: { $in: user.hobby } });
                const response: object = await User.deleteOne({ _id: userID });
                return response;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }

    // Create a hobby for existing user.
    public async createHobby(userID: string, hobbyDetails: HobbyModel): Promise<HobbyModel | undefined> {
        try {
            const user: UserModel | null = await User.findOne({ _id: userID });
            if (user) {
                const hobbyData: HobbyModel = new Hobby(hobbyDetails);
                const newHobby: HobbyModel = await hobbyData.save();
                user.hobby.push(newHobby._id);
                await User.updateOne(
                    { _id: userID },
                    {
                        hobby: user.hobby,
                    },
                );
                return newHobby;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }

    // Delete a hobby from user and hobby collection.
    public async deleteHobby(userID: string, hobbyID: string): Promise<object | undefined> {
        try {
            const user: UserModel | null = await User.findOne({ _id: userID });
            const hobby: HobbyModel | null = await Hobby.findOne({ _id: hobbyID });
            if (user && hobby) {
                const index: number = user.hobby.indexOf(hobby._id);
                if (index > -1) {
                    user.hobby.splice(index, 1);
                }
                await User.updateOne(
                    { _id: userID },
                    {
                        hobby: user.hobby,
                    },
                );
                const result: object = await Hobby.deleteOne({ _id: hobbyID });
                return result;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }
}
