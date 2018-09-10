"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../helpers/constants");
const FakultetSchema = new mongoose_1.Schema({
    nazivPredmeta: {
        type: String,
        required: true
    },
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
    brojLekcije: Number,
    sala: String,
    napomene: String
});
exports.FakultetModel = mongoose_1.model(constants_1.TABLE_NAME_FAKULTET, FakultetSchema);
