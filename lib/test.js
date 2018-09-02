"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lekcija_1 = require("./Lekcija");
const LekcijaRepository_1 = require("./LekcijaRepository");
const mongoose_1 = __importDefault(require("mongoose"));
const bson_1 = require("bson");
mongoose_1.default.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true }).
    then(() => console.log('Connected to mongodb'));
//var db = mongoose.connection;
//db.on("error", console.error.bind(console, "MongoDB Connection error"));
let lekcija = new Lekcija_1.Lekcija({
    nazivPredmeta: "Programski jezici",
    brojLekcije: 5,
    tipLekcije: "vezbe"
});
let repo = new LekcijaRepository_1.LekcijaRepository();
/*
repo.ubaci(<ILekcijaModel>{
    nazivPredmeta:"Programski jezici",
    brojLekcije:7,
    tipLekcije:"predavanje"
}).then(()=>{repo.vratiSve();}).then((data)=>console.log(data));
*/
function ubaciIIspisi() {
    return __awaiter(this, void 0, void 0, function* () {
        let ubaci = yield repo.ubaci({
            nazivPredmeta: "RMT",
            brojLekcije: 10,
            tipLekcije: "predavanje"
        });
        console.log(ubaci);
        console.log('----------------------------------------------');
        console.log('----------------------------------------------');
        repo.vratiSve().then((data) => console.log(data));
    });
}
ubaciIIspisi();
//repo.obrisi(ObjectID.createFromHexString('5b8b9d5032e64219b880a98c')).then((data)=>console.log(data)).catch();
//repo.vratiSve().then((data)=>console.log(data));
function izmeniIIspisi() {
    return __awaiter(this, void 0, void 0, function* () {
        let ubaci = yield repo.izmeniLekciju(bson_1.ObjectID.createFromHexString('5b8b9d5032e64219b880a98c'), {
            nazivPredmeta: "RMT",
            brojLekcije: 8,
            tipLekcije: "vezbe"
        });
        console.log(ubaci);
        console.log('----------------------------------------------');
        console.log('----------------------------------------------');
        repo.vratiSve().then((data) => console.log(data));
    });
}
//izmeniIIspisi();
//repo.vratiSve().then((data)=>console.log(data));
//repo.vratiJednu({nazivPredmeta:"Programski jezici"}).then((data)=>console.log(data));
