import { Lekcija } from "./business/Lekcija";
import { ILekcijaModel } from "./models/interfaces/ILekcijaModel"
import {LekcijaRepository} from './repository/LekcijaRepository'
import mongoose from "mongoose";
import { ObjectID } from "bson";
import express from 'express';
import bodyParser from 'body-parser'
import { LekcijaRouter } from "./routes/LekcijaRouter";

mongoose.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true }).
then(()=>console.log('Connected to mongodb'));

const app = express();

// Podesavanje bodyParser OBAVEZNO PRE RUTA!!!!!!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const router = new LekcijaRouter();
app.use(router.routes);

app.listen(3000,'localhost',()=>{console.log('Listening...')});
