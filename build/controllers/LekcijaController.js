"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LekcijaRepository_1 = require("../repository/LekcijaRepository");
const bson_1 = require("bson");
const Lekcija_1 = require("../business/Lekcija");
class LekcijaController {
    kreirajLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        //let lekcija = Lekcija.createLekcija(req.body.nazivPredmeta,req.body.tipLekcije,req.body.brojLekcije,req.body.datumOdrzavanja);
        try {
            let lekcija = new Lekcija_1.Lekcija(req.body);
            repo.ubaci(lekcija.lekcija)
                .then((data) => res.status(201).send(data))
                .catch((error) => res.status(500).send({ "error": error.message }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message });
        }
    }
    vratiSveLekcije(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        try {
            repo.vratiSve()
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message });
        }
    }
    vratiLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        const lekcijaID = req.params.oid;
        try {
            repo.vratiJednu(bson_1.ObjectID.createFromHexString(lekcijaID))
                .then((data) => {
                res.status(200).send(data);
                let datum = data.datumIVreme;
                datum.setMinutes(data.datumIVreme.getMinutes() + data.trajanje);
                console.log('Zavrsetak: ', datum.toLocaleTimeString());
            })
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message });
        }
    }
    izmeniLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        let lekcijaID = bson_1.ObjectID.createFromHexString(req.params.oid);
        let lekcija = req.body;
        //console.log(lekcija);
        try {
            repo.izmeniLekciju(lekcijaID, lekcija)
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message });
        }
    }
    dopuniLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        let lekcijaID = bson_1.ObjectID.createFromHexString(req.params.oid);
        const izmene = req.body;
        const zaIzmenu = {};
        for (const izmena of izmene) {
            zaIzmenu[izmena.nazivPolja] = izmena.novaVrednost;
        }
        console.log(zaIzmenu);
        try {
            repo.dopuniLekciju(lekcijaID, zaIzmenu)
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message });
        }
    }
    obrisiLekciju(req, res) {
        const repo = new LekcijaRepository_1.LekcijaRepository();
        const lekcijaID = req.params.oid;
        console.log(lekcijaID);
        try {
            repo.obrisi(bson_1.ObjectID.createFromHexString(lekcijaID))
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(500).send({ "error": err.message }));
        }
        catch (e) {
            //console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({ "error": e.message });
        }
    }
}
exports.LekcijaController = LekcijaController;
