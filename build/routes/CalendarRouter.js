"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarController_1 = require("../controllers/CalendarController");
const auth_1 = require("../helpers/auth");
const router = express_1.Router();
class CalendarRouter {
    constructor() {
        this._calendarController = new CalendarController_1.CalendarController();
    }
    get routes() {
        let controller = this._calendarController;
        router.get('/', auth_1.verifikacija, controller.vratiSveObaveze2);
        router.get('/:datum', auth_1.verifikacija, controller.vratiPoDatumu);
        return router;
    }
}
exports.CalendarRouter = CalendarRouter;
