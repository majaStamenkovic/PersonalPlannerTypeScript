import {Schema, Document, model } from 'mongoose';
import {ISportModel} from './interfaces/ISportModel';

const TABLE_NAME = 'sport';
const SportSchema : Schema = new Schema({
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
        //required: true
    },
    lokacija: String,
    napomene: String
})
export const SportModel= model<ISportModel>(TABLE_NAME,SportSchema);