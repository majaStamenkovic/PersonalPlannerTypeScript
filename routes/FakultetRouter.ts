import {Router} from 'express';
import { FakultetController } from '../controllers/FakultetController';

const router = Router();
export class FakultetRouter{
    private _fakultetController: FakultetController;

    constructor(){
        this._fakultetController=new FakultetController();
    }

    get routes(){
        let controller = this._fakultetController;
        router.get('/',controller.vratiSveObaveze);
        router.post('/',controller.kreirajObavezu);
        router.get('/:oid',controller.vratiObavezu);
        router.put('/:oid',controller.izmeniObavezu);
        router.delete('/:oid',controller.obrisiObavezu);
        router.patch('/:oid',controller.dopuniObavezu);

        return router;
    }
}