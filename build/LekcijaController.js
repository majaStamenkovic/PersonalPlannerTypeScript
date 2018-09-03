"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lekcija_1 = require("./Lekcija");
const LekcijaRepository_1 = require("./LekcijaRepository");
const mongoose = __importStar(require("mongoose"));
mongoose.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true });
let lekcija = new Lekcija_1.Lekcija({
    nazivPredmeta: "Programski jezici",
    brojLekcije: 5,
    tipLekcije: "vezbe"
});
let repo = new LekcijaRepository_1.LekcijaRepository();
repo.ubaci({
    nazivPredmeta: "Programski jezici",
    brojLekcije: 5,
    tipLekcije: "vezbe"
});
console.log(repo.vratiSve());
