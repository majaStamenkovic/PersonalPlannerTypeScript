"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DrustvoModel_1 = require("../models/DrustvoModel");
const AktivnostiRepository_1 = require("./AktivnostiRepository");
class DrustvoRepository extends AktivnostiRepository_1.AktivnostiRepository {
    constructor() {
        super(DrustvoModel_1.DrustvoModel);
    }
}
exports.DrustvoRepository = DrustvoRepository;
