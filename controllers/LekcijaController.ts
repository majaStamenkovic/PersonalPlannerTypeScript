import {Request,Response,json} from 'express';
import { LekcijaRepository } from '../repository/LekcijaRepository';
import { ILekcijaModel } from '../models/interfaces/ILekcijaModel';
import {ObjectID} from 'bson'
import { Lekcija } from '../business/Lekcija';

export class LekcijaController{

    public kreirajLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        //let lekcija = Lekcija.createLekcija(req.body.nazivPredmeta,req.body.tipLekcije,req.body.brojLekcije,req.body.datumOdrzavanja);
        try{
            let lekcija = new Lekcija(<ILekcijaModel>req.body);
            repo.ubaci(lekcija.lekcija)
            .then((data)=>res.status(201).send(data))
            .catch((error)=>res.status(500).send({"error":error.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
        
    }

    public vratiSveLekcije(req:Request, res:Response){
        const repo = new LekcijaRepository();
        try{
            repo.vratiSve()
            .then((data)=>res.status(200).send(data))
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public vratiLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        const lekcijaID = req.params.oid;
        try{
            repo.vratiJednu(ObjectID.createFromHexString(lekcijaID))
            .then((data)=>{
                
                res.status(200).send(data); 
                let datum=data.datumIVreme;
                datum.setMinutes(data.datumIVreme.getMinutes()+<number>data.trajanje);
                console.log('Zavrsetak: ',datum.toLocaleTimeString())})
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public izmeniLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        let lekcijaID = ObjectID.createFromHexString(req.params.oid);
        let lekcija = <ILekcijaModel>req.body;
        //console.log(lekcija);
        try{
            repo.izmeniLekciju(lekcijaID,lekcija)
            .then((data)=>res.status(200).send(data))
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public dopuniLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        let lekcijaID = ObjectID.createFromHexString(req.params.oid);
        const izmene = req.body;
        const zaIzmenu={};
        for (const izmena of izmene){
            zaIzmenu[izmena.nazivPolja] = izmena.novaVrednost;
        }
        console.log(zaIzmenu);
        try{
            repo.dopuniLekciju(lekcijaID,zaIzmenu)
            .then((data)=>res.status(200).send(data))
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public obrisiLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        const lekcijaID = req.params.oid;
        console.log(lekcijaID);
        try{
            repo.obrisi(ObjectID.createFromHexString(lekcijaID))
            .then((data)=>res.status(200).send(data))
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            //console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({"error": e.message})
        }
    }

}