import {IUserModel} from '../models/interfaces/user/IUserModel'

export class User{
    private _userModel : IUserModel;

    constructor(userModel: IUserModel){
        this._userModel=userModel;
    }

    get password():string{
        return this._userModel.password;
    }

    set password(password:string){
        this._userModel.password = password;
    }

    get informacijeOKorisniku():IUserModel{
        return this._userModel;
    }
}