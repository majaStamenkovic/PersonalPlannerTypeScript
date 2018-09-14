"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarController_1 = require("../controllers/CalendarController");
class CalendarRouter {
    constructor() {
        this._calendarController = new CalendarController_1.CalendarController();
    }
    get routes() {
        const router = express_1.Router();
        let controller = this._calendarController;
        router.get('/', controller.vratiSveObaveze);
        return router;
    }
}
exports.CalendarRouter = CalendarRouter;
