"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = express_1.Router();
class UserRouter {
    constructor() {
        this._userController = new UserController_1.UserController();
    }
    get routes() {
        let controller = this._userController;
        router.post('/login', controller.logovanjeKorisnika);
        router.post('/signup', controller.kreiranjeKorisnika);
        return router;
    }
}
exports.UserRouter = UserRouter;
