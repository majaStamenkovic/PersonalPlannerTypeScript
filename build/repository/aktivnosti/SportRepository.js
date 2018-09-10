"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SportModel_1 = require("../../models/SportModel");
const AktivnostiRepository_1 = require("./base/AktivnostiRepository");
class SportRepository extends AktivnostiRepository_1.AktivnostiRepository {
    constructor() {
        super(SportModel_1.SportModel);
    }
}
exports.SportRepository = SportRepository;
