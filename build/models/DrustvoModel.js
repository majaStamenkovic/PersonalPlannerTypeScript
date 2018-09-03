"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TABLE_NAME = 'drustvo';
const DrustvoSchema = new mongoose_1.Schema({
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
        default: 120
    },
    lokacija: String,
    drustvo: [String]
});
exports.DrustvoModel = mongoose_1.model(TABLE_NAME, DrustvoSchema);
