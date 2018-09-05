import {Router} from 'express';
import { DrustvoController } from '../controllers/DrustvoController';
import { verifikacija } from '../helpers/auth';

const router = Router();
export class DrustvoRouter{
    private _drustvoController: DrustvoController;

    constructor(){
        this._drustvoController=new DrustvoController();
    }

    get routes(){
        let controller = this._drustvoController;
        router.get('/',verifikacija,controller.vratiSveObaveze);
        router.post('/',verifikacija,controller.kreirajObavezu);
        router.get('/:oid',verifikacija,controller.vratiObavezu);
        router.put('/:oid',verifikacija,controller.izmeniObavezu);
        router.delete('/:oid',verifikacija,controller.obrisiObavezu);
        router.patch('/:oid',verifikacija,controller.dopuniObavezu);

        return router;
    }
}