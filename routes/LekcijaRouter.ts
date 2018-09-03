import {Router} from 'express';
import { LekcijaController } from '../controllers/LekcijaController';

const router = Router();
export class LekcijaRouter{
    private _lekcijaController: LekcijaController;

    constructor(){
        this._lekcijaController=new LekcijaController();
    }

    get routes(){
        let controller = this._lekcijaController;
        router.get('/',controller.vratiSveLekcije);
        router.post('/',controller.kreirajLekciju);
        router.get('/:oid',controller.vratiLekciju);
        router.put('/:oid',controller.izmeniLekciju);
        router.delete('/:oid',controller.obrisiLekciju);
        router.patch('/:oid',controller.dopuniLekciju);

        return router;
    }
}