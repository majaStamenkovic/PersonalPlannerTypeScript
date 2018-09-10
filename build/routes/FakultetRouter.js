"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FakultetController_1 = require("../controllers/aktivnosti/FakultetController");
class FakultetRouter {
    constructor() {
        this._fakultetController = new FakultetController_1.FakultetController();
    }
    get routes() {
        let controller = this._fakultetController;
        const router = express_1.Router();
        router.get('/', controller.vratiSveObaveze);
        router.post('/', controller.kreirajObavezu);
        router.get('/:oid', controller.vratiObavezu);
        router.put('/:oid', controller.izmeniObavezu);
        router.delete('/:oid', controller.obrisiObavezu);
        router.patch('/:oid', controller.dopuniObavezu);
        return router;
    }
}
exports.FakultetRouter = FakultetRouter;
