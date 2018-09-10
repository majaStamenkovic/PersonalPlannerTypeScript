"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SportController_1 = require("../controllers/aktivnosti/SportController");
class SportRouter {
    constructor() {
        this._sportController = new SportController_1.SportController();
    }
    get routes() {
        const router = express_1.Router();
        let controller = this._sportController;
        router.get('/', controller.vratiSveObaveze);
        router.post('/', controller.kreirajObavezu);
        router.get('/:oid', controller.vratiObavezu);
        router.put('/:oid', controller.izmeniObavezu);
        router.delete('/:oid', controller.obrisiObavezu);
        router.patch('/:oid', controller.dopuniObavezu);
        return router;
    }
}
exports.SportRouter = SportRouter;
