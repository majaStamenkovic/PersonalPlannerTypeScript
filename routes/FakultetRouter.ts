import {Router} from 'express';
import { FakultetController } from '../controllers/FakultetController';
import { verifikacija } from '../helpers/auth';

const router = Router();
export class FakultetRouter{
    private _fakultetController: FakultetController;

    constructor(){
        this._fakultetController=new FakultetController();
    }

    get routes(){
        let controller = this._fakultetController;
        router.get('/',verifikacija,controller.vratiSveObaveze);
        router.post('/',verifikacija,controller.kreirajObavezu);
        router.get('/:oid',verifikacija,controller.vratiObavezu);
        router.put('/:oid',verifikacija,controller.izmeniObavezu);
        router.delete('/:oid',verifikacija,controller.obrisiObavezu);
        router.patch('/:oid',verifikacija,controller.dopuniObavezu);

        return router;
    }
}