import { Request, Response } from 'express';
import { Calendar } from "../business/Calendar";

export class CalendarController {

    public async vratiSveObaveze(req: Request, res: Response) {

        try {
            req.query.username = req.body.username;
            const criteria = Calendar.kriterijumPretrage(req.query);
            const rezultat = await Calendar.vratiSveAkt(criteria);
            res.status(200).send(rezultat);

        } catch (e) {
            console.log(e);
            res.status(400).send({ "error": e.message })
        }
    }

    

}