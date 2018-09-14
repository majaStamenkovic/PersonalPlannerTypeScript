import mongoose from "mongoose";
import express from 'express';
import bodyParser from 'body-parser';
import { FakultetRouter } from "./routes/FakultetRouter";
import { SportRouter } from './routes/SportRouter';
import { DrustvoRouter } from "./routes/DrustvoRouter";
import { CalendarRouter } from "./routes/CalendarRouter";
import { UserRouter } from "./routes/UserRouter";
import { autorizacija } from "./helpers/auth";

mongoose.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true })
.then(()=>{
    console.log('Connected to mongodb');
});

const app = express();

// Podesavanje bodyParser pre ruta
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/fakultet',autorizacija, new FakultetRouter().routes);
app.use('/sport',autorizacija, new SportRouter().routes);
app.use('/drustvo',autorizacija, new DrustvoRouter().routes);
app.use('/calendar',autorizacija,new CalendarRouter().routes);
app.use('/user',new UserRouter().routes);

app.listen(3000,'localhost',()=>{console.log('Listening...')});