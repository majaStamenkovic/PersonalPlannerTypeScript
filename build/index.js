"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const FakultetRouter_1 = require("./routes/FakultetRouter");
const SportRouter_1 = require("./routes/SportRouter");
const DrustvoRouter_1 = require("./routes/DrustvoRouter");
const CalendarRouter_1 = require("./routes/CalendarRouter");
mongoose_1.default.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true }).
    then(() => console.log('Connected to mongodb'));
const app = express_1.default();
// Podesavanje bodyParser OBAVEZNO PRE RUTA!!!!!!!
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
const router = new FakultetRouter_1.FakultetRouter();
app.use('/fakultet', new FakultetRouter_1.FakultetRouter().routes);
app.use('/sport', new SportRouter_1.SportRouter().routes);
app.use('/drustvo', new DrustvoRouter_1.DrustvoRouter().routes);
app.use('/calendar', new CalendarRouter_1.CalendarRouter().routes);
app.listen(3000, 'localhost', () => { console.log('Listening...'); });
