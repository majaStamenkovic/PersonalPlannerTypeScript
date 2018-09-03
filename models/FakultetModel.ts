import {Schema, Document, model } from 'mongoose';
import {IFakultetModel} from './interfaces/IFakultetModel';

const TABLE_NAME = 'leka';
const FakultetSchema : Schema = new Schema({
    nazivPredmeta: {
        type: String,
        required: true
    },
    nazivAktivnosti: {
        type: String,
        required: true
    },
    
    datumIVreme:{
        type:Date,
        required: true
    },
    trajanje: {
        type:Number,
        default:105
    },
    brojLekcije: Number,
    sala: String,
    napomene: String
})
export const FakultetModel= model<IFakultetModel>(TABLE_NAME,FakultetSchema);