import {Router} from 'express';
import { CalendarController } from '../controllers/CalendarController';
import {verifikacija} from '../helpers/auth'
const router = Router();
export class CalendarRouter{
    private _calendarController: CalendarController;

    constructor(){
        this._calendarController=new CalendarController();
    }

    get routes(){
        let controller = this._calendarController;
        router.get('/',verifikacija, controller.vratiSveObaveze2);
        router.get('/:datum',verifikacija, controller.vratiPoDatumu);

        return router;
    }
}