"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LekcijaController_1 = require("../controllers/LekcijaController");
const router = express_1.Router();
class LekcijaRouter {
    constructor() {
        this._lekcijaController = new LekcijaController_1.LekcijaController();
    }
    get routes() {
        let controller = this._lekcijaController;
        router.get('/', controller.vratiSveLekcije);
        router.post('/', controller.kreirajLekciju);
        router.get('/:oid', controller.vratiLekciju);
        router.put('/:oid', controller.dopuniLekciju);
        router.delete('/:oid', controller.obrisiLekciju);
        return router;
    }
}
exports.LekcijaRouter = LekcijaRouter;
