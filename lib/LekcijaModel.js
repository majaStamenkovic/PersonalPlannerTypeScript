"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TABLE_NAME = 'leka';
const LekcijaSchema = new mongoose_1.Schema({
    nazivPredmeta: {
        type: String,
        required: true
    },
    tipLekcije: {
        type: String,
        required: true
    },
    brojLekcije: {
        type: Number,
        required: true
    }
});
exports.LekcijaModel = mongoose_1.model(TABLE_NAME, LekcijaSchema);
