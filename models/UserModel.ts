import { Schema, Document, model } from 'mongoose';
import { IUserModel } from './interfaces/user/IUserModel';
import { TABLE_NAME_USER } from '../helpers/constants';

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
export const UserModel= model<IUserModel>(TABLE_NAME_USER,UserSchema);