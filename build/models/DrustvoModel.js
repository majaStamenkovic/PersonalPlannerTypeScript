"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../helpers/constants");
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
    username: {
        type: String,
        required: true
    },
    lokacija: String,
    drustvo: [String]
});
exports.DrustvoModel = mongoose_1.model(constants_1.TABLE_NAME_DRUSTVO, DrustvoSchema);
