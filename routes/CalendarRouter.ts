import {Router} from 'express';
import { CalendarController } from '../controllers/CalendarController';

const router = Router();
export class CalendarRouter{
    private _calendarController: CalendarController;

    constructor(){
        this._calendarController=new CalendarController();
    }

    get routes(){
        let controller = this._calendarController;
        router.get('/',controller.vratiSveObaveze);
        router.get('/:datum',controller.vratiPoDatumu);

        return router;
    }
}