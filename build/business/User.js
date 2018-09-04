"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userModel) {
        this._userModel = userModel;
    }
    get username() {
        return this._userModel.username;
    }
    get email() {
        return this._userModel.email;
    }
    get password() {
        return this._userModel.password;
    }
    set username(username) {
        this._userModel.username = username;
    }
    set password(password) {
        this._userModel.password = password;
    }
    set email(email) {
        this._userModel.email = email;
    }
    get informacijeOKorisniku() {
        return this._userModel;
    }
}
exports.User = User;
