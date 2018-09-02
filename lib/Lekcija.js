"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lekcija {
    constructor(lekcijaModel) {
        this._lekcijaModel = lekcijaModel;
    }
    get nazivPredmeta() {
        return this._lekcijaModel.nazivPredmeta;
    }
    get tipLekcije() {
        return this._lekcijaModel.tipLekcije;
    }
    get brojLekcije() {
        return this._lekcijaModel.brojLekcije;
    }
    set nazivPredmeta(nazivPredmeta) {
        this._lekcijaModel.nazivPredmeta = nazivPredmeta;
    }
    set tipLekcije(tipLekcije) {
        this._lekcijaModel.tipLekcije = tipLekcije;
    }
    set brojLekcije(brojLekcije) {
        this._lekcijaModel.brojLekcije = brojLekcije;
    }
    get lekcija() {
        return this._lekcijaModel;
    }
    static createLekcija(nazivPredmeta, tipLekcije, brojLekcije) {
        return {
            nazivPredmeta: nazivPredmeta,
            tipLekcije: tipLekcije,
            brojLekcije: brojLekcije
        };
    }
}
exports.Lekcija = Lekcija;
