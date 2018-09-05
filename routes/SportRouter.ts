import {Router} from 'express';
import { SportController } from '../controllers/SportController';
import { verifikacija } from '../helpers/auth';

const router = Router();
export class SportRouter{
    private _sportController: SportController;

    constructor(){
        this._sportController=new SportController();
    }

    get routes(){
        let controller = this._sportController;
        router.get('/',verifikacija,controller.vratiSveObaveze);
        router.post('/',verifikacija,controller.kreirajObavezu);
        router.get('/:oid',verifikacija,controller.vratiObavezu);
        router.put('/:oid',verifikacija,controller.izmeniObavezu);
        router.delete('/:oid',verifikacija,controller.obrisiObavezu);
        router.patch('/:oid',verifikacija,controller.dopuniObavezu);

        return router;
    }
}