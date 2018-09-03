"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sport {
    constructor(lekcijaModel) {
        this._sportModel = lekcijaModel;
    }
    get lokacija() {
        return this._sportModel.lokacija;
    }
    get nazivAktivnosti() {
        return this._sportModel.nazivAktivnosti;
    }
    get trajanje() {
        return this._sportModel.trajanje;
    }
    set lokacija(lokacija) {
        this._sportModel.lokacija = lokacija;
    }
    set nazivAktivnosti(tipLekcije) {
        this._sportModel.nazivAktivnosti = tipLekcije;
    }
    set trajanje(trajanje) {
        this._sportModel.trajanje = trajanje;
    }
    get obaveza() {
        return this._sportModel;
    }
}
exports.Sport = Sport;
