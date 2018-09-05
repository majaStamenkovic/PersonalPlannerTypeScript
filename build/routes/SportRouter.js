"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SportController_1 = require("../controllers/SportController");
const auth_1 = require("../helpers/auth");
const router = express_1.Router();
class SportRouter {
    constructor() {
        this._sportController = new SportController_1.SportController();
    }
    get routes() {
        let controller = this._sportController;
        router.get('/', auth_1.verifikacija, controller.vratiSveObaveze);
        router.post('/', auth_1.verifikacija, controller.kreirajObavezu);
        router.get('/:oid', auth_1.verifikacija, controller.vratiObavezu);
        router.put('/:oid', auth_1.verifikacija, controller.izmeniObavezu);
        router.delete('/:oid', auth_1.verifikacija, controller.obrisiObavezu);
        router.patch('/:oid', auth_1.verifikacija, controller.dopuniObavezu);
        return router;
    }
}
exports.SportRouter = SportRouter;
