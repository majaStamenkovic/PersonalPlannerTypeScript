"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../helpers/constants");
const SportSchema = new mongoose_1.Schema({
    nazivAktivnosti: {
        type: String,
        required: true
    },
    datumIVreme: {
        type: Date,
        required: true
    },
    trajanje: {
        type: Number,
        default: 105
    },
    username: {
        type: String,
        required: true
    },
    lokacija: String,
    napomene: String
});
exports.SportModel = mongoose_1.model(constants_1.TABLE_NAME_SPORT, SportSchema);
