"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (null == undefined)
    console.log('Jednaki'); //true
else
    console.log('Nisu jednaki');
if (null === undefined)
    console.log('Jednaki'); //false
else
    console.log('Nisu jednaki');
/*
mongoose.connect("mongodb://maja:majadb1@ds123852.mlab.com:23852/fonapp", { useNewUrlParser: true }).
then(()=>console.log('Connected to mongodb'));
//var db = mongoose.connection;
//db.on("error", console.error.bind(console, "MongoDB Connection error"));
let lekcija = new Lekcija(<ILekcijaModel>{
    nazivPredmeta:"Programski jezici",
    brojLekcije:5,
    tipLekcije:"vezbe"
});

let repo = new LekcijaRepository();
*/
/*
repo.ubaci(<ILekcijaModel>{
    nazivPredmeta:"Programski jezici",
    brojLekcije:7,
    tipLekcije:"predavanje"
}).then(()=>{repo.vratiSve();}).then((data)=>console.log(data));
*/
/*
async function ubaciIIspisi(){
    let ubaci = await repo.ubaci(<ILekcijaModel>{
        nazivPredmeta:"RMT",
        brojLekcije:10,
        tipLekcije:"predavanje"
    });
    console.log(ubaci);
    console.log('----------------------------------------------');
    console.log('----------------------------------------------');
    repo.vratiSve().then((data)=>console.log(data));
}

ubaciIIspisi();
*/
//repo.obrisi(ObjectID.createFromHexString('5b8b9d5032e64219b880a98c')).then((data)=>console.log(data)).catch();
//repo.vratiSve().then((data)=>console.log(data));
/*
async function izmeniIIspisi(){
    let ubaci = await repo.izmeniLekciju(ObjectID.createFromHexString('5b8b9d5032e64219b880a98c'),<ILekcijaModel>{
        nazivPredmeta:"RMT",
        brojLekcije:8,
        tipLekcije:"vezbe"
    });
    console.log(ubaci);
    console.log('----------------------------------------------');
    console.log('----------------------------------------------');
    repo.vratiSve().then((data)=>console.log(data));
}
*/
//izmeniIIspisi();
//repo.vratiSve().then((data)=>console.log(data));
//repo.vratiJednu({nazivPredmeta:"Programski jezici"}).then((data)=>console.log(data));
