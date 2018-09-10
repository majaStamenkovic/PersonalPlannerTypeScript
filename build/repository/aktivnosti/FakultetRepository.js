"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FakultetModel_1 = require("../../models/FakultetModel");
const AktivnostiRepository_1 = require("./base/AktivnostiRepository");
class FakultetRepository extends AktivnostiRepository_1.AktivnostiRepository {
    constructor() {
        super(FakultetModel_1.FakultetModel);
    }
}
exports.FakultetRepository = FakultetRepository;
