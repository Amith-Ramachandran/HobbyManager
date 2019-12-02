import { User, UserModel } from '../db/models/user';
import logger from '../utilities/logger';

export class UserService {
    public async getAllUsers(): Promise<Array<UserModel> | undefined> {
        try {
            const users: Array<UserModel> = await User.find({}, { _id: 0, hobby: 0 });

            logger.info(users);
            return users;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async getUserDetails(userID: string): Promise<UserModel | undefined | null> {
        try {
            const user: UserModel | null = await User.findOne({ _id: userID }, { _id: 0, hobby: 0 });
            return user;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async createUser(requestData: UserModel): Promise<UserModel | undefined> {
        try {
            const userInfo: object = { name: requestData.name };
            const user: UserModel = new User(userInfo);
            const newUser: UserModel = await user.save();
            return newUser;
        } catch (error) {
            logger.exception(error);
        }
    }

    public async updateUser(userID: string, requestData: UserModel): Promise<UserModel | undefined> {
        try {
            const user: UserModel | null = await User.findOne({ _id: userID });
            if (user) {
                const newUser: UserModel = await User.update(
                    { _id: userID },
                    {
                        name: requestData.name,
                    },
                );
                return newUser;
            } else {
                return;
            }
        } catch (error) {
            logger.exception(error);
        }
    }
}
