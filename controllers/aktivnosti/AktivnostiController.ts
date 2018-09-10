import {Request,Response} from 'express';
import { Document } from 'mongoose';
import {ObjectID} from 'bson';
import { IAktivnostiController } from "./interfaces/IAktivnostiController";
import { AktivnostiRepository } from '../../repository/aktivnosti/base/AktivnostiRepository';
import { IAktivnostiModel } from '../../models/interfaces/aktivnosti/base/IAktivnostiModel';

export abstract class AktivnostiController<T extends IAktivnostiModel> { //implements IAktivnostiController {
    
    //protected repo: AktivnostiRepository<T>;

    abstract kreirajObavezu(req: Request, res: Response): void;

    vratiObavezu1(req: Request, res: Response,repo:AktivnostiRepository<T>): void {
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
    
    vratiSveObaveze1(req: Request, res: Response,repo:AktivnostiRepository<T>): void {
        try {
            repo.vratiSve({ "username": req.body.username })
                .then((data) => res.status(200).send(data))
                .catch((err) => res.status(400).send({ "error": err.message }))

        } catch (e) {
            console.log(e);
            res.status(500).send({ "error": e.message })
        }
    }
    async izmeniObavezu1(req: Request, res: Response,repo:AktivnostiRepository<T>): Promise<void> {
        let obavezaID = ObjectID.createFromHexString(req.params.oid);
        try {
            let mozeDaMenja = await repo.vratiJednu(obavezaID);
            if (mozeDaMenja === null || mozeDaMenja.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            } else {
                let obaveza = <T>req.body;
                repo.izmeniObavezu(obavezaID, obaveza)
                    .then((data) => res.status(200).send(data))
                    .catch((err) => res.status(500).send({ "error": err.message }))
            }


        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }
    async dopuniObavezu1(req: Request, res: Response,repo:AktivnostiRepository<T>): Promise<void>{
        try {
            let obavezaID = ObjectID.createFromHexString(req.params.oid);
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
    async obrisiObavezu1(req: Request, res: Response,repo:AktivnostiRepository<T>): Promise<void> {
        try {
            const obavezaID = ObjectID.createFromHexString(req.params.oid);
            let mozeDaBrise = await repo.vratiJednu(obavezaID);
            if (mozeDaBrise === null || mozeDaBrise.username != req.body.username) {
                res.status(401).send({ "error": "Neautorizovan pristup" });
            } else {
                repo.obrisi(obavezaID)
                    .then((data) => { res.status(200).send(data); })
                    .catch((err) => res.status(500).send({ "error": err.message }))
            }

        } catch (e) {
            //console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({ "error": e.message })
        }
    }

}