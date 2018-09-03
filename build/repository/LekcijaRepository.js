"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryBase_1 = require("./RepositoryBase");
const LekcijaModel_1 = require("../models/LekcijaModel");
class LekcijaRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super(LekcijaModel_1.LekcijaModel);
    }
    vratiSve() {
        return __awaiter(this, void 0, void 0, function* () {
            let nesto = yield this.find();
            return nesto;
        });
    }
    vratiJednu(lekcijaID) {
        return __awaiter(this, void 0, void 0, function* () {
            let lekcija = yield this.findOne(lekcijaID);
            return lekcija;
        });
    }
    ubaci(novi) {
        return __awaiter(this, void 0, void 0, function* () {
            let noviObjekat = yield this.insert(novi);
            ;
            return noviObjekat;
        });
    }
    obrisi(objectID) {
        return __awaiter(this, void 0, void 0, function* () {
            let obrisanObjekat = yield this.delete(objectID);
            return obrisanObjekat;
        });
    }
    izmeniLekciju(objectID, izmena) {
        return __awaiter(this, void 0, void 0, function* () {
            let izmenjenObjekat = this.update(objectID, izmena);
            return izmenjenObjekat;
        });
    }
    dopuniLekciju(objectID, izmena) {
        return __awaiter(this, void 0, void 0, function* () {
            let izmenjenObjekat = this.update(objectID, { $set: izmena });
            //let izmenjenObjekat = LekcijaModel.findOneAndUpdate(objectID,{$set:izmena}).exec();
            return izmenjenObjekat;
        });
    }
}
exports.LekcijaRepository = LekcijaRepository;
