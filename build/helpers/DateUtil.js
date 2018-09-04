"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zavrsetak(datum, trajanje) {
    datum.setMinutes(datum.getMinutes() + trajanje);
    return datum.toLocaleTimeString();
}
exports.zavrsetak = zavrsetak;
function daLiJeIstogDana(datum, aktivnost) {
}
exports.daLiJeIstogDana = daLiJeIstogDana;
