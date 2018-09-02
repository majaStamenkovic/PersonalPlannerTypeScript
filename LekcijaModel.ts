import {Schema, Document, model } from 'mongoose';
import {ILekcijaModel} from './ILekcijaModel';

const TABLE_NAME = 'leka';
const LekcijaSchema : Schema = new Schema({
    nazivPredmeta: {
        type: String,
        required: true
    },
    tipLekcije: {
        type: String,
        required: true
    },
    brojLekcije: {
        type: Number,
        required: true
    }
})
export const LekcijaModel= model<ILekcijaModel>(TABLE_NAME,LekcijaSchema);