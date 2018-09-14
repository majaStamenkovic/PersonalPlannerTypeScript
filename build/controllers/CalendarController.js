"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Calendar_1 = require("../business/Calendar");
class CalendarController {
    vratiSveObaveze(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.username = req.body.username;
                const criteria = Calendar_1.Calendar.kriterijumPretrage(req.query);
                const rezultat = yield Calendar_1.Calendar.vratiSveAkt(criteria);
                res.status(200).send(rezultat);
            }
            catch (e) {
                console.log(e);
                res.status(400).send({ "error": e.message });
            }
        });
    }
}
exports.CalendarController = CalendarController;
