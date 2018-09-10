import { IAktivnostiController } from "../../../controllers/aktivnosti/interfaces/IAktivnostiController";
import { Router } from 'express'

// Da li je potrebna ova klasa?
export abstract class AktivnostiRouter<T extends IAktivnostiController>{
    private _controller: T;

    constructor(controller){
        this._controller=controller;
    }
    get routes(){
        const router = Router();
        router.get('/',this._controller.vratiSveObaveze);
        router.post('/',this._controller.kreirajObavezu);
        router.get('/:oid',this._controller.vratiObavezu);
        router.put('/:oid',this._controller.izmeniObavezu);
        router.delete('/:oid',this._controller.obrisiObavezu);
        router.patch('/:oid',this._controller.dopuniObavezu);

        return router;
    }
}