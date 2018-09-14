import {IFakultetModel} from '../models/interfaces/aktivnosti/IFakultetModel'

export class Fakultet{
    private _fakultetModel : IFakultetModel;

    constructor(lekcijaModel: IFakultetModel){
        this._fakultetModel=lekcijaModel;
    }

    get nazivPredmeta():string{
        return this._fakultetModel.nazivPredmeta;
    }
    get datumIVreme():Date{
        return this._fakultetModel.datumIVreme;
    }

    get nazivAktivnosti():string{
        return this._fakultetModel.nazivAktivnosti;
    }

    get brojLekcije():number{
        return this._fakultetModel.brojLekcije;
    }

    set nazivPredmeta(nazivPredmeta:string){
        this._fakultetModel.nazivPredmeta = nazivPredmeta;
    }

    set nazivAktivnosti(tipLekcije:string){
        this._fakultetModel.nazivAktivnosti = tipLekcije;
    }

    set brojLekcije(brojLekcije:number){
        this._fakultetModel.brojLekcije = brojLekcije;
    }
    get obaveza():IFakultetModel{
        return this._fakultetModel;
    }
}