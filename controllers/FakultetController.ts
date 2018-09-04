import { Request, Response } from 'express';
import { FakultetRepository } from '../repository/FakultetRepository';
import { IFakultetModel } from '../models/interfaces/IFakultetModel';
import { ObjectID } from 'bson'
import { Fakultet } from '../business/Fakultet';

export class FakultetController{

    public kreirajObavezu(req:Request, res:Response){
        const repo = new FakultetRepository();
        
        try{
            let lekcija = new Fakultet(<IFakultetModel>req.body);
            repo.ubaci(lekcija.obaveza)
            .then((data)=>res.status(201).send(data))
            .catch((error)=>res.status(500).send({"error":error.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
        
    }

    public vratiSveObaveze(req:Request, res:Response){
        const repo = new FakultetRepository();
        try{
            repo.vratiSve()
            .then((data)=>{res.status(200).send(data)})
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public vratiObavezu(req:Request, res:Response){
        const repo = new FakultetRepository();
        const obavezaID = req.params.oid;
        try{
            repo.vratiJednu(ObjectID.createFromHexString(obavezaID))
            .then((data)=>{
                console.log(data);
                if(data===null)
                    res.status(404).send({"error":"Nije pronadjeno"});
                else {
                    res.status(200).send(data);
                    //console.log(zavrsetak(data.datumIVreme,data.trajanje));
                }
            })
            .catch((err)=>res.status(400).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public izmeniObavezu(req:Request, res:Response){
        const repo = new FakultetRepository();
        let obavezaID = ObjectID.createFromHexString(req.params.oid);
        let obaveza = <IFakultetModel>req.body;
        try{
            repo.izmeniObavezu(obavezaID,obaveza)
            .then((data)=>res.status(200).send(data))
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public dopuniObavezu(req:Request, res:Response){
        const repo = new FakultetRepository();
        let obavezaID = ObjectID.createFromHexString(req.params.oid);
        const izmene = req.body;
        const zaIzmenu={};
        for (const izmena of izmene){
            zaIzmenu[izmena.nazivPolja] = izmena.novaVrednost;
        }
        //console.log(zaIzmenu);
        try{
            repo.dopuniObavezu(obavezaID,zaIzmenu)
            .then((data)=>res.status(200).send(data))
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

    public obrisiObavezu(req:Request, res:Response){
        const repo = new FakultetRepository();
        const obavezaID = req.params.oid;
        try{
            repo.obrisi(ObjectID.createFromHexString(obavezaID))
            .then((data)=>{
                if(data===null)
                    res.status(404).send({"error":"Nije pronadjeno"});
                else res.status(200).send(data);
            })
            .catch((err)=>res.status(500).send({"error":err.message}))
            
        } catch(e) {
            //console.log(e);
            //Uhvatice npr ako nije prosledjen format koji odgovara ObjectID
            res.status(400).send({"error": e.message})
        }
    }

}