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
const RepositoryBase_1 = require("../../base/RepositoryBase");
class AktivnostiRepository extends RepositoryBase_1.RepositoryBase {
    vratiSve(uslov = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let aktivnosti = yield this.find(uslov);
            return aktivnosti;
        });
    }
    vratiJednu(objectID) {
        return __awaiter(this, void 0, void 0, function* () {
            let aktivnost = yield this.findOne(objectID);
            return aktivnost;
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
    izmeniObavezu(objectID, izmena) {
        return __awaiter(this, void 0, void 0, function* () {
            let izmenjenObjekat = this.update(objectID, izmena);
            return izmenjenObjekat;
        });
    }
    dopuniObavezu(objectID, izmena) {
        return __awaiter(this, void 0, void 0, function* () {
            let izmenjenObjekat = this.update(objectID, { $set: izmena });
            return izmenjenObjekat;
        });
    }
}
exports.AktivnostiRepository = AktivnostiRepository;
