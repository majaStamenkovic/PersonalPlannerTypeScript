"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TABLE_NAME = 'leka';
const LekcijaSchema = new mongoose_1.Schema({
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
    brojLekcije: Number,
    sala: String,
    napomene: String
});
exports.LekcijaModel = mongoose_1.model(TABLE_NAME, LekcijaSchema);
