import {ILekcijaModel} from './ILekcijaModel'

export class Lekcija{
    private _lekcijaModel : ILekcijaModel;

    constructor(lekcijaModel: ILekcijaModel){
        this._lekcijaModel=lekcijaModel;
    }

    get nazivPredmeta():string{
        return this._lekcijaModel.nazivPredmeta;
    }

    get tipLekcije():string{
        return this._lekcijaModel.tipLekcije;
    }

    get brojLekcije():number{
        return this._lekcijaModel.brojLekcije;
    }

    set nazivPredmeta(nazivPredmeta:string){
        this._lekcijaModel.nazivPredmeta = nazivPredmeta;
    }

    set tipLekcije(tipLekcije:string){
        this._lekcijaModel.tipLekcije = tipLekcije;
    }

    set brojLekcije(brojLekcije:number){
        this._lekcijaModel.brojLekcije = brojLekcije;
    }
}