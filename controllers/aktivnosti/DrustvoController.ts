import { Request, Response } from 'express';
import { ObjectID } from 'bson'
import { DrustvoRepository } from '../../repository/aktivnosti/DrustvoRepository';
import { Drustvo } from '../../business/Drustvo';
import { IDrustvoModel } from '../../models/interfaces/aktivnosti/IDrustvoModel';
import { IAktivnostiController } from './interfaces/IAktivnostiController';

export class DrustvoController implements IAktivnostiController{

    public kreirajObavezu(req: Request, res: Response) {
        const repo = new DrustvoRepository();
        try {
            let druzenje = new Drustvo(<IDrustvoModel>req.body);
            repo.ubaci(druzenje.plan)
                .then((data) => res.status(201).send(data))
                .catch((error) => res.status(500).send({ "error": error.message }))
        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }

    }

    public vratiSveObaveze(req: Request, res: Response) {
        const repo = new DrustvoRepository();
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
        const repo = new DrustvoRepository();
        try {
            repo.vratiJednu(ObjectID.createFromHexString(req.params.oid))
                .then((data) => {
                    if (data == null)
                        res.status(404).send({ "error": "Nije pronadjeno" });
                    else if (data.username != req.body.username)
                        res.status(401).send({ "error": "Neautorizovan pristup" });
                    else {
                        res.status(200).send(data);
                    }
                })
                .catch((err) => res.status(500).send({ "error": err.message }))

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public async izmeniObavezu(req: Request, res: Response) {
        const repo = new DrustvoRepository();
        try {
            const obavezaID = ObjectID.createFromHexString(req.params.oid);
            const mozeDaMenja = await repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
                return;
            }
            let obaveza = <IDrustvoModel>req.body;
            repo.izmeniObavezu(obavezaID, obaveza)
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(500).send({ "error": err.message }))
        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public async dopuniObavezu(req: Request, res: Response) {
        const repo = new DrustvoRepository();
        try {
            let obavezaID = ObjectID.createFromHexString(req.params.oid);
            let mozeDaMenja = await repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
                return;
            }
            const izmene = req.body;
            const zaIzmenu = {};
            for (const izmena of izmene) {
                zaIzmenu[izmena.nazivPolja] = izmena.novaVrednost;
            }
            repo.dopuniObavezu(obavezaID, zaIzmenu)
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(500).send({ "error": err.message }))

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    public async obrisiObavezu(req: Request, res: Response) {
        const repo = new DrustvoRepository();
        try {
            const obavezaID = ObjectID.createFromHexString(req.params.oid);
            let mozeDaBrise = await repo.vratiJednu(obavezaID);
            if (mozeDaBrise === null || mozeDaBrise.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
                return;
            }
            repo.obrisi(obavezaID)
                .then((data) => { res.status(200).send(data); })
                .catch((err) => res.status(500).send({ "error": err.message }))

        } catch (e) {
            console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({ "error": e.message })
        }
    }

}