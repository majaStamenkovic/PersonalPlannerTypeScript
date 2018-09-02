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
        router.put('/:oid',controller.dopuniLekciju);
        router.delete('/:oid',controller.obrisiLekciju);

        return router;
    }
}