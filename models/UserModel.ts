import { Schema, Document, model } from 'mongoose';
import { IUserModel } from './interfaces/IUserModel';

const TABLE_NAME = 'user';
const UserSchema : Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    
    password:{
        type:String,
        required: true
    }
})
export const UserModel= model<IUserModel>(TABLE_NAME,UserSchema);