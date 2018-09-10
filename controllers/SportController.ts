import { Request, Response, json } from 'express';
import { SportRepository } from '../repository/SportRepository';
import { ISportModel } from '../models/interfaces/aktivnosti/ISportModel';
import { ObjectID } from 'bson'
import { Sport } from '../business/Sport';
import { zavrsetak } from '../helpers/DateUtil';

export class SportController {

    public kreirajObavezu(req: Request, res: Response) {
        const repo = new SportRepository();

        try {
            let trening = new Sport(<ISportModel>req.body);
            repo.ubaci(trening.obaveza)
                .then((data) => res.status(201).send(data))
                .catch((error) => res.status(500).send({ "error": error.message }))

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }

    }

    public vratiSveObaveze(req: Request, res: Response) {
        const repo = new SportRepository();
        try {
            repo.vratiSve({ "username": req.body.username })
                .then((data) => { res.status(200).send(data) })
                .catch((err) => res.status(500).send({ "error": err.message }))

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public vratiObavezu(req: Request, res: Response) {
        const repo = new SportRepository();
        const obavezaID = req.params.oid;
        try {
            repo.vratiJednu(ObjectID.createFromHexString(obavezaID))
                .then((data) => {
                    //console.log(data);
                    if (data === null)
                        res.status(404).send({ "error": "Nije pronadjeno" });
                    else if (data.username != req.body.username)
                        res.status(401).send({ "error": "Neautorizovan pristup" });
                    else {
                        res.status(200).send(data);
                        //console.log(zavrsetak(data.datumIVreme,<number>data.trajanje));
                    }
                })
                .catch((err) => res.status(400).send({ "error": err.message }))

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public async izmeniObavezu(req: Request, res: Response) {
        const repo = new SportRepository();
        let obavezaID = ObjectID.createFromHexString(req.params.oid);
        try {
            let mozeDaMenja = await repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            } else {
                let obaveza = <ISportModel>req.body;
                repo.izmeniObavezu(obavezaID, obaveza)
                    .then((data) => res.status(200).send(data))
                    .catch((err) => res.status(500).send({ "error": err.message }))
            }


        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public async dopuniObavezu(req: Request, res: Response) {
        const repo = new SportRepository();
        let obavezaID = ObjectID.createFromHexString(req.params.oid);

        //console.log(zaIzmenu);
        try {
            let mozeDaMenja = await repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            } else {
                const izmene = req.body;
                const zaIzmenu = {};
                for (const izmena of izmene) {
                    zaIzmenu[izmena.nazivPolja] = izmena.novaVrednost;
                }
                repo.dopuniObavezu(obavezaID, zaIzmenu)
                    .then((data) => res.status(200).send(data))
                    .catch((err) => res.status(500).send({ "error": err.message }))
            }
        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public async obrisiObavezu(req: Request, res: Response) {
        const repo = new SportRepository();
        const obavezaID = req.params.oid;
        try {
            let mozeDaBrise = await repo.vratiJednu(obavezaID);
            if (mozeDaBrise === null || mozeDaBrise.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            } else {
                repo.obrisi(ObjectID.createFromHexString(obavezaID))
                    .then((data) => {
                        if (data === null)
                            res.status(404).send({ "error": "Nije pronadjeno" });
                        else res.status(200).send(data);
                    })
                    .catch((err) => res.status(500).send({ "error": err.message }))
            }
        } catch (e) {
            //console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({ "error": e.message })
        }
    }

}