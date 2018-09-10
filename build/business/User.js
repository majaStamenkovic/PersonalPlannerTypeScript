"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userModel) {
        this._userModel = userModel;
    }
    get password() {
        return this._userModel.password;
    }
    set password(password) {
        this._userModel.password = password;
    }
    get informacijeOKorisniku() {
        return this._userModel;
    }
}
exports.User = User;
