import {Router} from 'express';
import { DrustvoController } from '../controllers/aktivnosti/DrustvoController';

export class DrustvoRouter{
    private _drustvoController: DrustvoController;

    constructor(){
        this._drustvoController=new DrustvoController();
    }

    get routes(){
        const router = Router();
        let controller = this._drustvoController;
        router.get('/',controller.vratiSveObaveze);
        router.post('/',controller.kreirajObavezu);
        router.get('/:oid',controller.vratiObavezu);
        router.put('/:oid',controller.izmeniObavezu);
        router.delete('/:oid',controller.obrisiObavezu);
        router.patch('/:oid',controller.dopuniObavezu);

        return router;
    }
}