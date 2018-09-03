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
        return this._lekcijaModel.nazivAktivnosti;
    }

    get brojLekcije():number{
        return this._lekcijaModel.brojLekcije;
    }

    set nazivPredmeta(nazivPredmeta:string){
        this._lekcijaModel.nazivPredmeta = nazivPredmeta;
    }

    set nazivAktivnosti(tipLekcije:string){
        this._lekcijaModel.nazivAktivnosti = tipLekcije;
    }

    set brojLekcije(brojLekcije:number){
        this._lekcijaModel.brojLekcije = brojLekcije;
    }
    get lekcija():ILekcijaModel{
        return this._lekcijaModel;
    }
    public static createLekcija(nazivPredmeta:string,nazivAktivnosti:string,datumIVreme:string,brojLekcije?:number,sala?:string,napomene?:string):ILekcijaModel{
        return <ILekcijaModel>{
            nazivPredmeta: nazivPredmeta,
            nazivAktivnosti: nazivAktivnosti,
            brojLekcije: brojLekcije,
            datumIVreme:new Date(datumIVreme),
            napomene:napomene,
            sala:sala
        }
    }
}