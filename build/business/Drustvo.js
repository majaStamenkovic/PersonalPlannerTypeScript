"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Drustvo {
    constructor(lekcijaModel) {
        this._drustvoModel = lekcijaModel;
    }
    get lokacija() {
        return this._drustvoModel.lokacija;
    }
    get nazivAktivnosti() {
        return this._drustvoModel.nazivAktivnosti;
    }
    get trajanje() {
        return this._drustvoModel.trajanje;
    }
    set lokacija(lokacija) {
        this._drustvoModel.lokacija = lokacija;
    }
    set nazivAktivnosti(tipLekcije) {
        this._drustvoModel.nazivAktivnosti = tipLekcije;
    }
    set trajanje(trajanje) {
        this._drustvoModel.trajanje = trajanje;
    }
    get plan() {
        return this._drustvoModel;
    }
}
exports.Drustvo = Drustvo;
