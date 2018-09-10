"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../helpers/auth");
class UserRouter {
    constructor() {
        this._userController = new UserController_1.UserController();
    }
    get routes() {
        const controller = this._userController;
        const router = express_1.Router();
        router.post('/login', controller.logovanjeKorisnika);
        router.post('/signup', controller.kreiranjeKorisnika);
        router.get('/account', auth_1.verifikacija, controller.korisnickiNalog);
        return router;
    }
}
exports.UserRouter = UserRouter;
