import {IFakultetModel} from '../models/interfaces/IFakultetModel'

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
    public static createLekcija(nazivPredmeta:string,nazivAktivnosti:string,datumIVreme:string,brojLekcije?:number,sala?:string,napomene?:string):IFakultetModel{
        return <IFakultetModel>{
            nazivPredmeta: nazivPredmeta,
            nazivAktivnosti: nazivAktivnosti,
            brojLekcije: brojLekcije,
            datumIVreme:new Date(datumIVreme),
            napomene:napomene,
            sala:sala
        }
    }
}