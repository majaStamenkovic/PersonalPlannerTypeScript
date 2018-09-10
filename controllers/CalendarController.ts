import { DrustvoRepository } from "../repository/aktivnosti/DrustvoRepository";
import { Request, Response } from 'express';
import { SportRepository } from "../repository/aktivnosti/SportRepository";
import { FakultetRepository } from "../repository/aktivnosti/FakultetRepository";
import { Drustvo } from "../business/Drustvo";
import { Sport } from "../business/Sport";
import { Fakultet } from "../business/Fakultet";
import { DrustvoController } from "./aktivnosti/DrustvoController";
import { SportController } from "./aktivnosti/SportController";
import { FakultetController } from "./aktivnosti/FakultetController";
import { IAktivnostiModel } from "../models/interfaces/aktivnosti/base/IAktivnostiModel";

export class CalendarController {

    public async vratiSveObaveze(req: Request, res: Response) {
        const drustvoRepo = new DrustvoRepository();
        const sportRepo = new SportRepository();
        const fakultetRepo = new FakultetRepository();

        try {
            // Dodaje se zahtev da su samo korisnikove aktivnosti
            req.query.username = req.body.username;
            const drustvo = await drustvoRepo.vratiSve(req.query);
            const sport = await sportRepo.vratiSve(req.query);
            const fakultet = await fakultetRepo.vratiSve(req.query);

            let rezultat = {};
            if (drustvo != undefined && drustvo.length > 0) rezultat["drustvene aktivnosti"] = drustvo;
            if (sport != undefined && sport.length > 0) rezultat["sportske aktivnosti"] = sport;
            if (fakultet != undefined && fakultet.length > 0) rezultat["fakultetske obaveze"] = fakultet;
            res.status(200).send(rezultat);

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }
    public async vratiSveObaveze3(req: Request, res: Response) {

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
            const rezultat = await CalendarController.vratiSveAkt(criteria);
            res.status(200).send(rezultat);

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    private static async vratiSveAkt(criteria: object): Promise<object> {
        const drustvoRepo = new DrustvoRepository();
        const sportRepo = new SportRepository();
        const fakultetRepo = new FakultetRepository();


        const drustvo = await drustvoRepo.vratiSve(criteria);
        const sport = await sportRepo.vratiSve(criteria);
        const fakultet = await fakultetRepo.vratiSve(criteria);

        let rezultat = {};
        if (drustvo != undefined && drustvo.length > 0) rezultat["drustvene aktivnosti"] = drustvo;
        if (sport != undefined && sport.length > 0) rezultat["sportske aktivnosti"] = sport;
        if (fakultet != undefined && fakultet.length > 0) rezultat["fakultetske obaveze"] = fakultet;
        return rezultat;
    }

    private static kriterijumPretrage(zahtev: any): object {
        let criteria = zahtev;
        criteria.username = zahtev.username;
        // Obrada datuma
        if (criteria.datumIVreme != undefined) {
            criteria.datumIVreme = new Date(zahtev.datumIVreme);
            if (zahtev.lte) {
                criteria.datumIVreme = { $lte: criteria.datumIVreme };
                delete criteria.lte;
            }
            else criteria.datumIVreme = { $gte: criteria.datumIVreme };
        }
        // Obrada opsega vremena
        if (criteria.datumIVremePosle != undefined && criteria.datumIVremePre != undefined) {
            const datumIVremePosle = new Date(zahtev.datumIVremePosle);
            const datumIVremePre = new Date(zahtev.datumIVremePre);
            criteria.datumIVreme = { $gte: datumIVremePosle, $lte: datumIVremePre };
            delete criteria.datumIVremePosle;
            delete criteria.datumIVremePre;
        }
        //console.log(criteria);
        return criteria;
    }

    public async vratiPoDatumu(req: Request, res: Response) {
        const drustvoRepo = new DrustvoRepository();
        const sportRepo = new SportRepository();
        const fakultetRepo = new FakultetRepository();

        console.log(req.query.month);
        if (req.query.month != undefined && req.query.month == 'true') {
            try {
                console.log('Usla u if granu')
                console.log(req.params.datum);

                const drustvo = await drustvoRepo.vratiSve();
                const sport = await sportRepo.vratiSve();
                const fakultet = await fakultetRepo.vratiSve();
                let datum = new Date(req.params.datum)
                console.log(datum)
                //console.log(req.query.datumIVreme);
                let drustvo2 = drustvo.filter((aktivnost) => {
                    let drustvenaAkt = new Drustvo(aktivnost);
                    return drustvenaAkt.datumIVreme.getFullYear() == datum.getFullYear() &&
                        drustvenaAkt.datumIVreme.getMonth() == datum.getMonth()

                });
                let sport2 = sport.filter((aktivnost) => {
                    let sportskaAktivnost = new Sport(aktivnost);
                    return sportskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                        sportskaAktivnost.datumIVreme.getMonth() == datum.getMonth()

                });

                let fakultet2 = fakultet.filter((aktivnost) => {
                    let fakultetskaAktivnost = new Fakultet(aktivnost);
                    return fakultetskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                        fakultetskaAktivnost.datumIVreme.getMonth() == datum.getMonth()

                });

                let rezultat = {};
                if (drustvo2.length > 0) rezultat["drustvene aktivnosti"] = drustvo2;
                if (sport2.length > 0) rezultat["sportske aktivnosti"] = sport2;
                if (fakultet2.length > 0) rezultat["fakultetske obaveze"] = fakultet2;
                res.status(200).send(rezultat);

            } catch (e) {
                console.log(e);
                res.status(400).send({ "error": e.message })
            }
        } else
            try {
                console.log(req.params.datum);

                const drustvo = await drustvoRepo.vratiSve(req.query);
                const sport = await sportRepo.vratiSve(req.query);
                const fakultet = await fakultetRepo.vratiSve(req.query);

                let datum = new Date(req.params.datum)
                console.log(datum)
                //console.log(req.query.datumIVreme);
                let drustvo2 = drustvo.filter((aktivnost) => {
                    let drustvenaAkt = new Drustvo(aktivnost);
                    return drustvenaAkt.datumIVreme.getFullYear() == datum.getFullYear() &&
                        drustvenaAkt.datumIVreme.getMonth() == datum.getMonth() &&
                        drustvenaAkt.datumIVreme.getDate() == datum.getDate()

                });
                let sport2 = sport.filter((aktivnost) => {
                    let sportskaAktivnost = new Sport(aktivnost);
                    return sportskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                        sportskaAktivnost.datumIVreme.getMonth() == datum.getMonth() &&
                        sportskaAktivnost.datumIVreme.getDate() == datum.getDate()

                });

                let fakultet2 = fakultet.filter((aktivnost) => {
                    let fakultetskaAktivnost = new Fakultet(aktivnost);
                    return fakultetskaAktivnost.datumIVreme.getFullYear() == datum.getFullYear() &&
                        fakultetskaAktivnost.datumIVreme.getMonth() == datum.getMonth() &&
                        fakultetskaAktivnost.datumIVreme.getDate() == datum.getDate()

                });

                let rezultat = {};
                if (drustvo2.length > 0) rezultat["drustvene aktivnosti"] = drustvo2;
                if (sport2.length > 0) rezultat["sportske aktivnosti"] = sport2;
                if (fakultet2.length > 0) rezultat["fakultetske obaveze"] = fakultet2;
                res.status(200).send(rezultat);

            } catch (e) {
                console.log(e);
                res.status(400).send({ "error": e.message })
            }
    }
}