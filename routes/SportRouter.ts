import {Router} from 'express';
import { SportController } from '../controllers/aktivnosti/SportController';
import { AktivnostiRouter } from './aktivnosti/base/AktivnostiRouter';

export class SportRouter {
    private _sportController: SportController;

    constructor(){
        this._sportController=new SportController();
    }

    get routes(){
        const router = Router();
        let controller = this._sportController;
        router.get('/',controller.vratiSveObaveze);
        router.post('/',controller.kreirajObavezu);
        router.get('/:oid',controller.vratiObavezu);
        router.put('/:oid',controller.izmeniObavezu);
        router.delete('/:oid',controller.obrisiObavezu);
        router.patch('/:oid',controller.dopuniObavezu);

        return router;
    }
}