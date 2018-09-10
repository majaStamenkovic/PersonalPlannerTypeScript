"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DrustvoController_1 = require("../controllers/aktivnosti/DrustvoController");
class DrustvoRouter {
    constructor() {
        this._drustvoController = new DrustvoController_1.DrustvoController();
    }
    get routes() {
        const router = express_1.Router();
        let controller = this._drustvoController;
        router.get('/', controller.vratiSveObaveze);
        router.post('/', controller.kreirajObavezu);
        router.get('/:oid', controller.vratiObavezu);
        router.put('/:oid', controller.izmeniObavezu);
        router.delete('/:oid', controller.obrisiObavezu);
        router.patch('/:oid', controller.dopuniObavezu);
        return router;
    }
}
exports.DrustvoRouter = DrustvoRouter;
