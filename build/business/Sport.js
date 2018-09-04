"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sport {
    constructor(sportModel) {
        this._sportModel = sportModel;
    }
    get lokacija() {
        return this._sportModel.lokacija;
    }
    get datumIVreme() {
        return this._sportModel.datumIVreme;
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
    set nazivAktivnosti(nazivAktivnosti) {
        this._sportModel.nazivAktivnosti = nazivAktivnosti;
    }
    set trajanje(trajanje) {
        this._sportModel.trajanje = trajanje;
    }
    get obaveza() {
        return this._sportModel;
    }
}
exports.Sport = Sport;
