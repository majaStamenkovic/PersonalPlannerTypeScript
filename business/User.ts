import {IUserModel} from '../models/interfaces/IUserModel'

export class User{
    private _userModel : IUserModel;

    constructor(userModel: IUserModel){
        this._userModel=userModel;
    }

    get username():string{
        return this._userModel.username;
    }

    get email():string{
        return this._userModel.email;
    }

    get password():string{
        return this._userModel.password;
    }

    set username(username:string){
        this._userModel.username = username;
    }

    set password(password:string){
        this._userModel.password = password;
    }

    set email(email:string){
        this._userModel.email = email;
    }
    get informacijeOKorisniku():IUserModel{
        return this._userModel;
    }
}