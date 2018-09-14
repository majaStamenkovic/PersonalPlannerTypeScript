"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fakultet {
    constructor(lekcijaModel) {
        this._fakultetModel = lekcijaModel;
    }
    get nazivPredmeta() {
        return this._fakultetModel.nazivPredmeta;
    }
    get datumIVreme() {
        return this._fakultetModel.datumIVreme;
    }
    get nazivAktivnosti() {
        return this._fakultetModel.nazivAktivnosti;
    }
    get brojLekcije() {
        return this._fakultetModel.brojLekcije;
    }
    set nazivPredmeta(nazivPredmeta) {
        this._fakultetModel.nazivPredmeta = nazivPredmeta;
    }
    set nazivAktivnosti(tipLekcije) {
        this._fakultetModel.nazivAktivnosti = tipLekcije;
    }
    set brojLekcije(brojLekcije) {
        this._fakultetModel.brojLekcije = brojLekcije;
    }
    get obaveza() {
        return this._fakultetModel;
    }
}
exports.Fakultet = Fakultet;
