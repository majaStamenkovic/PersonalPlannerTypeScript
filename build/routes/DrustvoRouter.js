"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DrustvoController_1 = require("../controllers/DrustvoController");
const auth_1 = require("../helpers/auth");
const router = express_1.Router();
class DrustvoRouter {
    constructor() {
        this._drustvoController = new DrustvoController_1.DrustvoController();
    }
    get routes() {
        let controller = this._drustvoController;
        router.get('/', auth_1.verifikacija, controller.vratiSveObaveze);
        router.post('/', auth_1.verifikacija, controller.kreirajObavezu);
        router.get('/:oid', auth_1.verifikacija, controller.vratiObavezu);
        router.put('/:oid', auth_1.verifikacija, controller.izmeniObavezu);
        router.delete('/:oid', auth_1.verifikacija, controller.obrisiObavezu);
        router.patch('/:oid', auth_1.verifikacija, controller.dopuniObavezu);
        return router;
    }
}
exports.DrustvoRouter = DrustvoRouter;
