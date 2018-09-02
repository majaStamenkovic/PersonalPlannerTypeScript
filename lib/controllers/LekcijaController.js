"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LekcijaRepository_1 = require("../LekcijaRepository");
const bson_1 = require("bson");
const Lekcija_1 = require("../Lekcija");
class LekcijaController {
    kreirajLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        let lekcija = new Lekcija_1.Lekcija(req.body);
        console.log(req.body);
        //let lekcija = <ILekcijaModel>req.body;
        console.log(lekcija);
        try {
            repo.ubaci(lekcija.lekcija)
                .then((data) => res.send(data))
                .catch((err) => res.send({ "error": "greska1" }));
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "doslo je do greske" });
        }
    }
    vratiSveLekcije(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        try {
            repo.vratiSve()
                .then((data) => res.send(data))
                .catch((err) => res.send({ "error": "doslo je do greske" }));
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "doslo je do greske" });
        }
    }
    vratiLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        const lekcijaID = req.params.oid;
        try {
            repo.vratiJednu(bson_1.ObjectID.createFromHexString(lekcijaID))
                .then((data) => res.send(data))
                .catch((err) => res.send({ "error": "doslo je do greske" }));
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "doslo je do greske" });
        }
    }
    dopuniLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        let lekcijaID = bson_1.ObjectID.createFromHexString(req.params.oid);
        let lekcija = req.body;
        console.log(lekcija);
        try {
            repo.izmeniLekciju(lekcijaID, lekcija)
                .then((data) => res.send(data))
                .catch((err) => res.send({ "error": "greska2" }));
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "doslo je do greske" });
        }
    }
    obrisiLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        const lekcijaID = req.params.oid;
        console.log(lekcijaID);
        try {
            repo.obrisi(bson_1.ObjectID.createFromHexString(lekcijaID))
                .then((data) => res.send(data))
                .catch((err) => res.send({ "error": "doslo je do greske" }));
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "doslo je do greske" });
        }
    }
}
exports.LekcijaController = LekcijaController;
