import {Router} from 'express';
import { CalendarController } from '../controllers/CalendarController';

export class CalendarRouter{
    private _calendarController: CalendarController;

    constructor(){
        this._calendarController=new CalendarController();
    }

    get routes(){
        const router = Router();
        let controller = this._calendarController;
        router.get('/', controller.vratiSveObaveze);

        return router;
    }
}