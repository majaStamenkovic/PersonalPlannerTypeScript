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
const FakultetRepository_1 = require("../repository/aktivnosti/FakultetRepository");
const bson_1 = require("bson");
const Fakultet_1 = require("../business/Fakultet");
class FakultetController {
    kreirajObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        try {
            let lekcija = new Fakultet_1.Fakultet(req.body);
            repo.ubaci(lekcija.obaveza)
                .then((data) => res.status(201).send(data))
                .catch((error) => res.status(400).send({ "error": error.message }));
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message });
        }
    }
    vratiSveObaveze(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        try {
            repo.vratiSve({ "username": req.body.username })
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(400).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message });
        }
    }
    vratiObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        try {
            repo.vratiJednu(bson_1.ObjectID.createFromHexString(req.params.oid))
                .then((data) => {
                if (data == null)
                    res.status(404).send({ "error": "Nije pronadjeno" });
                else if (data.username != req.body.username)
                    res.status(401).send({ "error": "Neautorizovan pristup" });
                else {
                    res.status(200).send(data);
                }
            })
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message });
        }
    }
    izmeniObavezu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new FakultetRepository_1.FakultetRepository();
            let obavezaID = bson_1.ObjectID.createFromHexString(req.params.oid);
            let mozeDaMenja = yield repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            }
            else {
                let obaveza = req.body;
                try {
                    repo.izmeniObavezu(obavezaID, obaveza)
                        .then((data) => res.status(200).send(data))
                        .catch((err) => res.status(500).send({ "error": err.message }));
                }
                catch (e) {
                    console.log(e);
                    res.status(400).send({ "error": e.message });
                }
            }
        });
    }
    dopuniObavezu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new FakultetRepository_1.FakultetRepository();
            let obavezaID = bson_1.ObjectID.createFromHexString(req.params.oid);
            let mozeDaMenja = yield repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            }
            else {
                const izmene = req.body;
                const zaIzmenu = {};
                for (const izmena of izmene) {
                    zaIzmenu[izmena.nazivPolja] = izmena.novaVrednost;
                }
                //console.log(zaIzmenu);
                try {
                    repo.dopuniObavezu(obavezaID, zaIzmenu)
                        .then((data) => res.status(200).send(data))
                        .catch((err) => res.status(500).send({ "error": err.message }));
                }
                catch (e) {
                    console.log(e);
                    res.status(400).send({ "error": e.message });
                }
            }
        });
    }
    obrisiObavezu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new FakultetRepository_1.FakultetRepository();
            try {
                const obavezaID = bson_1.ObjectID.createFromHexString(req.params.oid);
                let mozeDaBrise = yield repo.vratiJednu(obavezaID);
                if (mozeDaBrise === null || mozeDaBrise.username != req.body.username) {
                    res.status(401).send({ "error": "Neautorizovan pristup" });
                }
                else {
                    repo.obrisi(obavezaID)
                        .then((data) => { res.status(200).send(data); })
                        .catch((err) => res.status(500).send({ "error": err.message }));
                }
            }
            catch (e) {
                //console.log(e);
                //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
                res.status(400).send({ "error": e.message });
            }
        });
    }
    // Vraca sve pa filtrira po username
    vratiSveObaveze2(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        try {
            repo.vratiSve()
                .then((data) => {
                let korisnikoviPodaci = data.filter((lekcija) => lekcija.username == req.body.username);
                res.status(200).send(korisnikoviPodaci);
            })
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message });
        }
    }
}
exports.FakultetController = FakultetController;
