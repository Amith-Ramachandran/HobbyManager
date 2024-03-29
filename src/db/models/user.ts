import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
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
    hobby: [mongoose.Schema.Types.ObjectId];
}

export const User = mongoose.model<UserModel>('User', UserSchema);
