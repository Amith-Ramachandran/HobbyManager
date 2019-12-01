import mongoose from 'mongoose';

const HobbySchema = new mongoose.Schema({
    passionLevel: {
        type: String,
        required: true,
        trim: true,
        enum: ['Low', 'Medium', 'High', 'Very-High'],
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1910,
        max: new Date().getFullYear(),
    },
});

HobbySchema.set('toJSON', {
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

export interface HobbyModel extends mongoose.Document {
    passionLevel: string;
    name: string;
    year: number;
}

export const Hobby = mongoose.model<HobbyModel>('Hobby', HobbySchema);
