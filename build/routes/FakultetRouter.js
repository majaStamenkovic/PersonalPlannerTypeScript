"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FakultetController_1 = require("../controllers/FakultetController");
const auth_1 = require("../helpers/auth");
const router = express_1.Router();
class FakultetRouter {
    constructor() {
        this._fakultetController = new FakultetController_1.FakultetController();
    }
    get routes() {
        let controller = this._fakultetController;
        router.get('/', auth_1.verifikacija, controller.vratiSveObaveze);
        router.post('/', auth_1.verifikacija, controller.kreirajObavezu);
        router.get('/:oid', auth_1.verifikacija, controller.vratiObavezu);
        router.put('/:oid', auth_1.verifikacija, controller.izmeniObavezu);
        router.delete('/:oid', auth_1.verifikacija, controller.obrisiObavezu);
        router.patch('/:oid', auth_1.verifikacija, controller.dopuniObavezu);
        return router;
    }
}
exports.FakultetRouter = FakultetRouter;
