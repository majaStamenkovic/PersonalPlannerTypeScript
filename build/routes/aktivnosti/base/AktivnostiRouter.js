"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Da li je potrebna ova klasa?
class AktivnostiRouter {
    constructor(controller) {
        this._controller = controller;
    }
    get routes() {
        const router = express_1.Router();
        router.get('/', this._controller.vratiSveObaveze);
        router.post('/', this._controller.kreirajObavezu);
        router.get('/:oid', this._controller.vratiObavezu);
        router.put('/:oid', this._controller.izmeniObavezu);
        router.delete('/:oid', this._controller.obrisiObavezu);
        router.patch('/:oid', this._controller.dopuniObavezu);
        return router;
    }
}
exports.AktivnostiRouter = AktivnostiRouter;
