import {ISportModel} from '../models/interfaces/ISportModel'

export class Sport{
    private _sportModel : ISportModel;

    constructor(sportModel: ISportModel){
        this._sportModel=sportModel;
    }

    get lokacija():string{
        return this._sportModel.lokacija;
    }

    get datumIVreme():Date{
        return this._sportModel.datumIVreme;
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

    set nazivAktivnosti(nazivAktivnosti:string){
        this._sportModel.nazivAktivnosti = nazivAktivnosti;
    }

    set trajanje(trajanje:number){
        this._sportModel.trajanje = trajanje;
    }
    get obaveza():ISportModel{
        return this._sportModel;
    }
}