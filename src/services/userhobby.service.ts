import { User, UserModel } from '../db/models/user';
import logger from '../utilities/logger';
import { Hobby, HobbyModel } from '../db/models/hobby';

export class UserHobbyService {
    public async getUsersWithHobby(): Promise<any | undefined> {
        try {
            const userHobbies: Array<any> = await User.find({})
                .populate('hobby')
                .exec();
            return userHobbies;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async createUserWithHobby(requestData: UserModel): Promise<UserModel | undefined> {
        try {
            const userInfo: object = { name: requestData.name };
            const hobbyInfo: object = requestData.hobby;

            const user: any = new User(userInfo);
            const hobbyData: any = new Hobby(hobbyInfo);

            const newHobby: HobbyModel = await hobbyData.save();
            user.hobby.push(newHobby._id);
            const newUser: UserModel = await user.save();
            return newUser;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async deleteUser(userID: string): Promise<UserModel | undefined> {
        try {
            const user: any | null = await User.findOne({ _id: userID });
            if (user) {
                const result: any = await Hobby.deleteMany({ _id: { $in: user.hobby } });
                const response: any = await User.deleteOne({ _id: userID });
                console.log(response);
                return response;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }

    public async createHobby(userID: string, hobbyDetails: HobbyModel): Promise<HobbyModel | undefined> {
        try {
            const user: any | null = await User.findOne({ _id: userID });
            if (user) {
                const hobbyData: any = new Hobby(hobbyDetails);
                const newHobby: HobbyModel = await hobbyData.save();
                user.hobby.push(newHobby._id);
                const newUser: UserModel = await User.updateOne(
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

    public async deleteHobby(userID: string, hobbyID: string): Promise<object | undefined> {
        try {
            const user: any | null = await User.findOne({ _id: userID });
            const hobby: any | null = await Hobby.findOne({ _id: hobbyID });
            if (user && hobby) {
                const index: number = user.hobby.indexOf(hobby._id);
                if (index > -1) {
                    user.hobby.splice(index, 1);
                }
                console.log(index, user.hobby);
                const newUser: any = await User.updateOne(
                    { _id: userID },
                    {
                        hobby: user.hobby,
                    },
                );
                const result: any = await Hobby.deleteOne({ _id: hobbyID });
                console.log(result);
                return result;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }
}
