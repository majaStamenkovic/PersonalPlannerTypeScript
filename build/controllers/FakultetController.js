"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FakultetRepository_1 = require("../repository/FakultetRepository");
const bson_1 = require("bson");
const Fakultet_1 = require("../business/Fakultet");
class FakultetController {
    kreirajObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        try {
            let lekcija = new Fakultet_1.Fakultet(req.body);
            repo.ubaci(lekcija.obaveza)
                .then((data) => res.status(201).send(data))
                .catch((error) => res.status(500).send({ "error": error.message }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message });
        }
    }
    vratiSveObaveze(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        try {
            repo.vratiSve()
                .then((data) => { res.status(200).send(data); })
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message });
        }
    }
    vratiObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        const obavezaID = req.params.oid;
        try {
            repo.vratiJednu(bson_1.ObjectID.createFromHexString(obavezaID))
                .then((data) => {
                console.log(data);
                if (data === null)
                    res.status(404).send({ "error": "Nije pronadjeno" });
                else {
                    res.status(200).send(data);
                    //console.log(zavrsetak(data.datumIVreme,data.trajanje));
                }
            })
                .catch((err) => res.status(400).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message });
        }
    }
    izmeniObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        let obavezaID = bson_1.ObjectID.createFromHexString(req.params.oid);
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
    dopuniObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        let obavezaID = bson_1.ObjectID.createFromHexString(req.params.oid);
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
    obrisiObavezu(req, res) {
        const repo = new FakultetRepository_1.FakultetRepository();
        const obavezaID = req.params.oid;
        try {
            repo.obrisi(bson_1.ObjectID.createFromHexString(obavezaID))
                .then((data) => {
                if (data === null)
                    res.status(404).send({ "error": "Nije pronadjeno" });
                else
                    res.status(200).send(data);
            })
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            //console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({ "error": e.message });
        }
    }
}
exports.FakultetController = FakultetController;
