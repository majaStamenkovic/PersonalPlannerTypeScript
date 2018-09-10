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
const UserRouter_1 = require("./routes/UserRouter");
const auth_1 = require("./helpers/auth");
mongoose_1.default.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true })
    .then(() => {
    console.log('Connected to mongodb');
});
const app = express_1.default();
// Podesavanje bodyParser pre ruta
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use('/fakultet', auth_1.verifikacija, new FakultetRouter_1.FakultetRouter().routes);
app.use('/sport', auth_1.verifikacija, new SportRouter_1.SportRouter().routes);
app.use('/drustvo', auth_1.verifikacija, new DrustvoRouter_1.DrustvoRouter().routes);
app.use('/calendar', new CalendarRouter_1.CalendarRouter().routes);
app.use('/user', new UserRouter_1.UserRouter().routes);
app.listen(3000, 'localhost', () => { console.log('Listening...'); });
