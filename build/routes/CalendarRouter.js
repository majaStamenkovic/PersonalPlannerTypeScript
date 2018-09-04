"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarController_1 = require("../controllers/CalendarController");
const router = express_1.Router();
class CalendarRouter {
    constructor() {
        this._calendarController = new CalendarController_1.CalendarController();
    }
    get routes() {
        let controller = this._calendarController;
        router.get('/', controller.vratiSveObaveze);
        router.get('/:datum', controller.vratiPoDatumu);
        return router;
    }
}
exports.CalendarRouter = CalendarRouter;
