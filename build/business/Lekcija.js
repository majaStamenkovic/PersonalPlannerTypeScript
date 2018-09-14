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
        return this._lekcijaModel.nazivAktivnosti;
    }
    get brojLekcije() {
        return this._lekcijaModel.brojLekcije;
    }
    set nazivPredmeta(nazivPredmeta) {
        this._lekcijaModel.nazivPredmeta = nazivPredmeta;
    }
    set nazivAktivnosti(tipLekcije) {
        this._lekcijaModel.nazivAktivnosti = tipLekcije;
    }
    set brojLekcije(brojLekcije) {
        this._lekcijaModel.brojLekcije = brojLekcije;
    }
    get lekcija() {
        return this._lekcijaModel;
    }
}
exports.Lekcija = Lekcija;
