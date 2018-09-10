import {Router} from 'express';
import { CalendarController } from '../controllers/CalendarController';
import {verifikacija} from '../helpers/auth'
export class CalendarRouter{
    private _calendarController: CalendarController;

    constructor(){
        this._calendarController=new CalendarController();
    }

    get routes(){
        const router = Router();
        let controller = this._calendarController;
        router.get('/',verifikacija, controller.vratiSveObaveze3);
        router.get('/:datum',verifikacija, controller.vratiPoDatumu);

        return router;
    }
}