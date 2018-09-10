import { Schema, model } from 'mongoose';
import { IFakultetModel } from './interfaces/aktivnosti/IFakultetModel';
import { TABLE_NAME_FAKULTET } from '../helpers/constants';

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
    username: {
        type: String,
        required: true
    },
    brojLekcije: Number,
    sala: String,
    napomene: String
})
export const FakultetModel= model<IFakultetModel>(TABLE_NAME_FAKULTET,FakultetSchema);