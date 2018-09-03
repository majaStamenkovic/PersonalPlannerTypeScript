import mongoose from "mongoose";
import { ObjectID } from "bson";
import express from 'express';
import bodyParser from 'body-parser'
import { FakultetRouter } from "./routes/FakultetRouter";
import {SportRouter} from './routes/SportRouter'

mongoose.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true }).
then(()=>console.log('Connected to mongodb'));

const app = express();

// Podesavanje bodyParser OBAVEZNO PRE RUTA!!!!!!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const router = new FakultetRouter();
app.use('/fakultet',new FakultetRouter().routes);
app.use('/sport',new SportRouter().routes);

app.listen(3000,'localhost',()=>{console.log('Listening...')});
