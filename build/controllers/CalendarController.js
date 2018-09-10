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
const DrustvoRepository_1 = require("../repository/aktivnosti/DrustvoRepository");
const SportRepository_1 = require("../repository/aktivnosti/SportRepository");
const FakultetRepository_1 = require("../repository/aktivnosti/FakultetRepository");
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
                // Dodaje se zahtev da su samo korisnikove aktivnosti
                req.query.username = req.body.username;
                const drustvo = yield drustvoRepo.vratiSve(req.query);
                const sport = yield sportRepo.vratiSve(req.query);
                const fakultet = yield fakultetRepo.vratiSve(req.query);
                let rezultat = {};
                if (drustvo != undefined && drustvo.length > 0)
                    rezultat["drustvene aktivnosti"] = drustvo;
                if (sport != undefined && sport.length > 0)
                    rezultat["sportske aktivnosti"] = sport;
                if (fakultet != undefined && fakultet.length > 0)
                    rezultat["fakultetske obaveze"] = fakultet;
                res.status(200).send(rezultat);
            }
            catch (e) {
                console.log(e);
                res.status(400).send({ "error": e.message });
            }
        });
    }
    vratiSveObaveze3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.username = req.body.username;
                const criteria = CalendarController.kriterijumPretrage(req.query);
                /*
                let criteria = req.query;
                // Dodaje se zahtev da su samo aktivnosti ulogovanog korisnika
                criteria.username= req.body.username;
                if(criteria.datumIVreme!=undefined){
                    criteria.datumIVreme = new Date(req.query.datumIVreme);
                    if(req.query.lte) {
                        criteria.datumIVreme={$lte:criteria.datumIVreme};
                        delete criteria.lte;
                    }
                    else criteria.datumIVreme={$gte:criteria.datumIVreme};
                }
                if(criteria.datumIVremePosle!=undefined && criteria.datumIVremePre!=undefined){
                    const datumIVremePosle = new Date(req.query.datumIVremePosle);
                    const datumIVremePre = new Date(req.query.datumIVremePre);
                    criteria.datumIVreme={$gte:datumIVremePosle,$lte:datumIVremePre} ;
                    delete criteria.datumIVremePosle;
                    delete criteria.datumIVremePre;
                }
                console.log(criteria);
                */
                const rezultat = yield CalendarController.vratiSveAkt(criteria);
                res.status(200).send(rezultat);
            }
            catch (e) {
                console.log(e);
                res.status(400).send({ "error": e.message });
            }
        });
    }
    static vratiSveAkt(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const drustvoRepo = new DrustvoRepository_1.DrustvoRepository();
            const sportRepo = new SportRepository_1.SportRepository();
            const fakultetRepo = new FakultetRepository_1.FakultetRepository();
            const drustvo = yield drustvoRepo.vratiSve(criteria);
            const sport = yield sportRepo.vratiSve(criteria);
            const fakultet = yield fakultetRepo.vratiSve(criteria);
            let rezultat = {};
            if (drustvo != undefined && drustvo.length > 0)
                rezultat["drustvene aktivnosti"] = drustvo;
            if (sport != undefined && sport.length > 0)
                rezultat["sportske aktivnosti"] = sport;
            if (fakultet != undefined && fakultet.length > 0)
                rezultat["fakultetske obaveze"] = fakultet;
            return rezultat;
        });
    }
    static kriterijumPretrage(zahtev) {
        let criteria = zahtev;
        criteria.username = zahtev.username;
        if (criteria.datumIVreme != undefined) {
            criteria.datumIVreme = new Date(zahtev.datumIVreme);
            if (zahtev.lte) {
                criteria.datumIVreme = { $lte: criteria.datumIVreme };
                delete criteria.lte;
            }
            else
                criteria.datumIVreme = { $gte: criteria.datumIVreme };
        }
        if (criteria.datumIVremePosle != undefined && criteria.datumIVremePre != undefined) {
            const datumIVremePosle = new Date(zahtev.datumIVremePosle);
            const datumIVremePre = new Date(zahtev.datumIVremePre);
            criteria.datumIVreme = { $gte: datumIVremePosle, $lte: datumIVremePre };
            delete criteria.datumIVremePosle;
            delete criteria.datumIVremePre;
        }
        console.log(criteria);
        return criteria;
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
