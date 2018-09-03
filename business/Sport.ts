import {ISportModel} from '../models/interfaces/ISportModel'

export class Sport{
    private _sportModel : ISportModel;

    constructor(lekcijaModel: ISportModel){
        this._sportModel=lekcijaModel;
    }

    get lokacija():string{
        return this._sportModel.lokacija;
    }

    get nazivAktivnosti():string{
        return this._sportModel.nazivAktivnosti;
    }

    get trajanje():number{
        return this._sportModel.trajanje;
    }

    set lokacija(lokacija:string){
        this._sportModel.lokacija = lokacija;
    }

    set nazivAktivnosti(tipLekcije:string){
        this._sportModel.nazivAktivnosti = tipLekcije;
    }

    set trajanje(trajanje:number){
        this._sportModel.trajanje = trajanje;
    }
    get obaveza():ISportModel{
        return this._sportModel;
    }
}