"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TABLE_NAME = 'sport';
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
    lokacija: String,
    napomene: String
});
exports.SportModel = mongoose_1.model(TABLE_NAME, SportSchema);
