import {Request,Response,json} from 'express';
import { LekcijaRepository } from '../LekcijaRepository';
import { ILekcijaModel } from '../ILekcijaModel';
import {ObjectID} from 'bson'
import { Lekcija } from '../Lekcija';

export class LekcijaController{

    public kreirajLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        let lekcija = new Lekcija(<ILekcijaModel>req.body);
        console.log(req.body);
        //let lekcija = <ILekcijaModel>req.body;
        console.log(lekcija);
        try{
            repo.ubaci(lekcija.lekcija)
            .then((data)=>res.send(data))
            .catch((err)=>res.send({"error":"greska1"}))
            
        } catch(e) {
            console.log(e);
            res.send({"error": "doslo je do greske"})
        }
        
    }

    public vratiSveLekcije(req:Request, res:Response){
        const repo = new LekcijaRepository();
        try{
            repo.vratiSve()
            .then((data)=>res.send(data))
            .catch((err)=>res.send({"error":"doslo je do greske"}))
            
        } catch(e) {
            console.log(e);
            res.send({"error": "doslo je do greske"})
        }
    }

    public vratiLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        const lekcijaID = req.params.oid;
        try{
            repo.vratiJednu(ObjectID.createFromHexString(lekcijaID))
            .then((data)=>res.send(data))
            .catch((err)=>res.send({"error":"doslo je do greske"}))
            
        } catch(e) {
            console.log(e);
            res.send({"error": "doslo je do greske"})
        }
    }

    public dopuniLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        let lekcijaID = ObjectID.createFromHexString(req.params.oid);
        let lekcija = <ILekcijaModel>req.body;
        console.log(lekcija);
        try{
            repo.izmeniLekciju(lekcijaID,lekcija)
            .then((data)=>res.send(data))
            .catch((err)=>res.send({"error":"greska2"}))
            
        } catch(e) {
            console.log(e);
            res.send({"error": "doslo je do greske"})
        }
    }

    public obrisiLekciju(req:Request, res:Response){
        const repo = new LekcijaRepository();
        const lekcijaID = req.params.oid;
        console.log(lekcijaID);
        try{
            repo.obrisi(ObjectID.createFromHexString(lekcijaID))
            .then((data)=>res.send(data))
            .catch((err)=>res.send({"error":"doslo je do greske"}))
            
        } catch(e) {
            console.log(e);
            res.send({"error": "doslo je do greske"})
        }
    }

}