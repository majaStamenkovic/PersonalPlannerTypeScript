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
class RepositoryBase {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    find(criteria = {}) {
        let promise = new Promise((resolve, reject) => {
            this._model.find(criteria, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        });
        return promise;
    }
    findOne(objectID) {
        let criteria = { _id: objectID };
        let promise = new Promise((resolve, reject) => {
            this._model.findOne(criteria, ((error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }));
        });
        return promise;
    }
    insert(objectToInsert) {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let object = yield this._model.create(objectToInsert);
            if (object) {
                console.log('Uspesno dodat');
                resolve(object);
            }
            else {
                console.log('Doslo je do greske prilikom ubacivanja objekta');
                reject();
            }
        }));
        return promise;
    }
    delete(objectID) {
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let object = yield this._model.findOneAndRemove({ _id: objectID }).exec();
            if (object) {
                console.log('Uspesno obrisan');
                resolve(object);
            }
            else {
                console.log('Doslo je do greske prilikom brisanja objekta _id:', objectID);
                reject();
            }
        }));
        return promise;
    }
    update(objectID, novi) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let object = yield this._model.findOneAndUpdate({ _id: objectID }, novi).exec();
                if (object) {
                    console.log('Uspesna izmena');
                    resolve(object);
                }
                else {
                    console.log('Objekat ne postoji');
                    reject();
                }
            }));
            return promise;
        });
    }
}
exports.RepositoryBase = RepositoryBase;
