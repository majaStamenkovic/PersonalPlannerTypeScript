import {Schema, Document, model } from 'mongoose';
import {ILekcijaModel} from './interfaces/ILekcijaModel';

const TABLE_NAME = 'leka';
const LekcijaSchema : Schema = new Schema({
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
export const LekcijaModel= model<ILekcijaModel>(TABLE_NAME,LekcijaSchema);