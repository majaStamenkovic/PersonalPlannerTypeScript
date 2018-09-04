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
const DrustvoRepository_1 = require("../repository/DrustvoRepository");
const SportRepository_1 = require("../repository/SportRepository");
const FakultetRepository_1 = require("../repository/FakultetRepository");
const Drustvo_1 = require("../business/Drustvo");
const Sport_1 = require("../business/Sport");
const Fakultet_1 = require("../business/Fakultet");
class CalendarController {
    vratiSveObaveze(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const drustvoRepo = new DrustvoRepository_1.DrustvoRepository();
            const sportRepo = new SportRepository_1.SportRepository();
            const fakultetRepo = new FakultetRepository_1.FakultetRepository();
            try {
                console.log(req.query);
                const drustvo = yield drustvoRepo.vratiSve(req.query);
                const sport = yield sportRepo.vratiSve(req.query);
                const fakultet = yield fakultetRepo.vratiSve(req.query);
                let rezultat = {};
                if (drustvo.length > 0)
                    rezultat["drustvene aktivnosti"] = drustvo;
                if (sport.length > 0)
                    rezultat["sportske aktivnosti"] = sport;
                if (fakultet.length > 0)
                    rezultat["fakultetske obaveze"] = fakultet;
                res.status(200).send(rezultat);
            }
            catch (e) {
                console.log(e);
                res.status(400).send({ "error": e.message });
            }
        });
    }
    vratiPoDatumu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const drustvoRepo = new DrustvoRepository_1.DrustvoRepository();
            const sportRepo = new SportRepository_1.SportRepository();
            const fakultetRepo = new FakultetRepository_1.FakultetRepository();
            console.log(req.query.month);
            if (req.query.month != undefined && req.query.month == 'true') {
                try {
                    console.log('Usla u if granu');
                    console.log(req.params.datum);
                    const drustvo = yield drustvoRepo.vratiSve();
                    const sport = yield sportRepo.vratiSve();
                    const fakultet = yield fakultetRepo.vratiSve();
                    console.log(drustvo);
                    let datum = new Date(req.params.datum);
                    console.log(datum);
                    //console.log(req.query.datumIVreme);
                    let drustvo2 = drustvo.filter((aktivnost) => {
                        let drustvenaAkt = new Drustvo_1.Drustvo(aktivnost);
                        return drustvenaAkt.datumIVreme.getFullYear() == datum.getFullYear() &&
                            drustvenaAkt.datumIVreme.getMonth() == datum.getMonth();
                    });
                    let sport2 = sport.filter((aktivnost) => {
                        let sportskaAktivnost = new Sport_1.Sport(aktivnost);
                        return sportskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                            sportskaAktivnost.datumIVreme.getMonth() == datum.getMonth();
                    });
                    let fakultet2 = fakultet.filter((aktivnost) => {
                        let fakultetskaAktivnost = new Fakultet_1.Fakultet(aktivnost);
                        return fakultetskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                            fakultetskaAktivnost.datumIVreme.getMonth() == datum.getMonth();
                    });
                    let rezultat = {};
                    if (drustvo2.length > 0)
                        rezultat["drustvene aktivnosti"] = drustvo2;
                    if (sport2.length > 0)
                        rezultat["sportske aktivnosti"] = sport2;
                    if (fakultet2.length > 0)
                        rezultat["fakultetske obaveze"] = fakultet2;
                    res.status(200).send(rezultat);
                }
                catch (e) {
                    console.log(e);
                    res.status(400).send({ "error": e.message });
                }
            }
            else
                try {
                    console.log(req.params.datum);
                    const drustvo = yield drustvoRepo.vratiSve(req.query);
                    const sport = yield sportRepo.vratiSve(req.query);
                    const fakultet = yield fakultetRepo.vratiSve(req.query);
                    let datum = new Date(req.params.datum);
                    console.log(datum);
                    //console.log(req.query.datumIVreme);
                    let drustvo2 = drustvo.filter((aktivnost) => {
                        let drustvenaAkt = new Drustvo_1.Drustvo(aktivnost);
                        return drustvenaAkt.datumIVreme.getFullYear() == datum.getFullYear() &&
                            drustvenaAkt.datumIVreme.getMonth() == datum.getMonth() &&
                            drustvenaAkt.datumIVreme.getDate() == datum.getDate();
                    });
                    let sport2 = sport.filter((aktivnost) => {
                        let sportskaAktivnost = new Sport_1.Sport(aktivnost);
                        return sportskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                            sportskaAktivnost.datumIVreme.getMonth() == datum.getMonth() &&
                            sportskaAktivnost.datumIVreme.getDate() == datum.getDate();
                    });
                    let fakultet2 = fakultet.filter((aktivnost) => {
                        let fakultetskaAktivnost = new Fakultet_1.Fakultet(aktivnost);
                        return fakultetskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                            fakultetskaAktivnost.datumIVreme.getMonth() == datum.getMonth() &&
                            fakultetskaAktivnost.datumIVreme.getDate() == datum.getDate();
                    });
                    let rezultat = {};
                    if (drustvo2.length > 0)
                        rezultat["drustvene aktivnosti"] = drustvo2;
                    if (sport2.length > 0)
                        rezultat["sportske aktivnosti"] = sport2;
                    if (fakultet2.length > 0)
                        rezultat["fakultetske obaveze"] = fakultet2;
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
