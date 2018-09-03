import { IDrustvoModel } from '../models/interfaces/IDrustvoModel';

export class Drustvo{
    private _drustvoModel : IDrustvoModel;

    constructor(lekcijaModel: IDrustvoModel){
        this._drustvoModel=lekcijaModel;
    }

    get lokacija():string{
        return this._drustvoModel.lokacija;
    }

    get nazivAktivnosti():string{
        return this._drustvoModel.nazivAktivnosti;
    }

    get trajanje():number{
        return this._drustvoModel.trajanje;
    }

    set lokacija(lokacija:string){
        this._drustvoModel.lokacija = lokacija;
    }

    set nazivAktivnosti(tipLekcije:string){
        this._drustvoModel.nazivAktivnosti = tipLekcije;
    }

    set trajanje(trajanje:number){
        this._drustvoModel.trajanje = trajanje;
    }
    get plan():IDrustvoModel{
        return this._drustvoModel;
    }
}