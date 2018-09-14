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
class Calendar {
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
                rezultat["drustvene aktivnosti"] = Calendar.sortiraj(drustvo);
            if (sport != undefined && sport.length > 0)
                rezultat["sportske aktivnosti"] = Calendar.sortiraj(sport);
            if (fakultet != undefined && fakultet.length > 0)
                rezultat["fakultetske obaveze"] = Calendar.sortiraj(fakultet);
            return rezultat;
        });
    }
    // Sortira u rastuci niz
    static sortiraj(aktivnosti) {
        for (let i = 0; i < aktivnosti.length - 1; i++) {
            for (let j = i + 1; j < aktivnosti.length; j++) {
                if ((aktivnosti[i].datumIVreme.getTime() - aktivnosti[j].datumIVreme.getTime()) > 0) {
                    // Starija je aktivnost desno, znaci potrebna je zamena mesta
                    let pomocna = aktivnosti[i];
                    aktivnosti[i] = aktivnosti[j];
                    aktivnosti[j] = pomocna;
                }
            }
        }
        return aktivnosti;
    }
    static kriterijumPretrage(zahtev) {
        let criteria = zahtev;
        //criteria.username = zahtev.username;
        // Obrada datuma
        if (criteria.datumIVreme != undefined) {
            criteria.datumIVreme = new Date(zahtev.datumIVreme);
            if (zahtev.lte) {
                criteria.datumIVreme = { $lte: criteria.datumIVreme };
                delete criteria.lte;
            }
            else
                criteria.datumIVreme = { $gte: criteria.datumIVreme };
        }
        // Obrada opsega vremena
        if (criteria.datumDonja != undefined && criteria.datumGornja != undefined) {
            const datumDonja = new Date(zahtev.datumDonja);
            const datumGornja = new Date(zahtev.datumGornja);
            criteria.datumIVreme = { $gte: datumDonja, $lte: datumGornja };
            delete criteria.datumDonja;
            delete criteria.datumGornja;
        }
        //console.log(criteria);
        return criteria;
    }
}
exports.Calendar = Calendar;
