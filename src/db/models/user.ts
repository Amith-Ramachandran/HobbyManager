import mongoose from 'mongoose';
import { HobbyModel } from './hobby';

const UserSchema = new mongoose.Schema({
    name: String,
    hobby: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }],
});

UserSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.__v;
        if (ret._id) {
            ret.id = ret._id.toString();
            delete ret._id;
        } else {
            delete ret.id;
        }
    },
});

export interface UserModel extends mongoose.Document {
    name: string;
    hobby: HobbyModel[];
}

export const User = mongoose.model<UserModel>('User', UserSchema);
