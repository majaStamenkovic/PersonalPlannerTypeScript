import { Schema, model } from 'mongoose';
import { IDrustvoModel } from './interfaces/aktivnosti/IDrustvoModel';
import { TABLE_NAME_DRUSTVO } from '../helpers/constants';

const DrustvoSchema : Schema = new Schema({
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
        default:120
    },
    username: {
        type: String,
        required: true
    },
    lokacija: String,
    drustvo: [String]
})
export const DrustvoModel= model<IDrustvoModel>(TABLE_NAME_DRUSTVO,DrustvoSchema);