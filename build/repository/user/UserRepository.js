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
const RepositoryBase_1 = require("../base/RepositoryBase");
const UserModel_1 = require("../../models/UserModel");
class UserRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super(UserModel_1.UserModel);
    }
    vratiKorisnika(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByCriteria(criteria);
            return user;
        });
    }
    ubaciKorisnika(novi) {
        return __awaiter(this, void 0, void 0, function* () {
            let noviUser = yield this.insert(novi);
            ;
            return noviUser;
        });
    }
    obrisiKorisnika(objectID) {
        return __awaiter(this, void 0, void 0, function* () {
            let obrisanUser = yield this.delete(objectID);
            return obrisanUser;
        });
    }
}
exports.UserRepository = UserRepository;
