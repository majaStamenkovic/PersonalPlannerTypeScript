import {Router} from 'express';
import { SportController } from '../controllers/SportController';

const router = Router();
export class SportRouter{
    private _sportController: SportController;

    constructor(){
        this._sportController=new SportController();
    }

    get routes(){
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