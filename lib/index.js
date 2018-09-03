"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const LekcijaRouter_1 = require("./routes/LekcijaRouter");
mongoose_1.default.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true }).
    then(() => console.log('Connected to mongodb'));
const app = express_1.default();
// Podesavanje bodyParser OBAVEZNO PRE RUTA!!!!!!!
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
const router = new LekcijaRouter_1.LekcijaRouter();
app.use(router.routes);
app.listen(3000, 'localhost', () => { console.log('Listening...'); });
