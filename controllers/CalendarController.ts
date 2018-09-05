import { DrustvoRepository } from "../repository/DrustvoRepository";
import {Request,Response} from 'express';
import { SportRepository } from "../repository/SportRepository";
import { FakultetRepository } from "../repository/FakultetRepository";
import { Drustvo } from "../business/Drustvo";
import { Sport } from "../business/Sport";
import { Fakultet } from "../business/Fakultet";
import { DrustvoController } from "./DrustvoController";
import { SportController } from "./SportController";
import { FakultetController } from "./FakultetController";


export class CalendarController{

    public async vratiSveObaveze(req:Request, res:Response){
        const drustvoRepo = new DrustvoRepository();
        const sportRepo = new SportRepository();
        const fakultetRepo = new FakultetRepository();

        try{
            console.log(req.query);
            
            const drustvo = await drustvoRepo.vratiSve(req.query);
            const sport = await sportRepo.vratiSve(req.query);
            const fakultet = await fakultetRepo.vratiSve(req.query);
            
            let rezultat ={};
            if(drustvo.length>0) rezultat["drustvene aktivnosti"]=drustvo;
            if(sport.length>0) rezultat["sportske aktivnosti"]=sport;
            if(fakultet.length>0) rezultat["fakultetske obaveze"]=fakultet;
            res.status(200).send(rezultat);
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }

        public async vratiSveObaveze2(req:Request, res:Response){
            const drustvoRepo = new DrustvoRepository();
            const sportRepo = new SportRepository();
            const fakultetRepo = new FakultetRepository();
    
            try{
                console.log(req.query);
                
                const drustvo = await drustvoRepo.vratiSve(req.query);
                const sport = await sportRepo.vratiSve(req.query);
                const fakultet = await fakultetRepo.vratiSve(req.query);
                
                let rezultat ={};
                let prikazDrustvo = drustvo.filter((aktivnost)=>aktivnost.username==req.body.username);
                if(prikazDrustvo.length>0){
                    rezultat["drustvene obaveze"]=prikazDrustvo;
                }  
                let prikazFakultet = fakultet.filter((aktivnost)=>aktivnost.username==req.body.username);
                if(prikazFakultet.length>0){
                    rezultat["fakultetske obaveze"]=prikazFakultet;
                }
                let prikazSport = sport.filter((aktivnost)=>aktivnost.username==req.body.username);
                if(prikazSport.length>0){
                    rezultat["sportske aktivnosti"]=prikazSport;
                }                
                res.status(200).send(rezultat);
                
            } catch(e) {
                console.log(e);
                res.status(400).send({"error": e.message})
            }
        }

    public async vratiPoDatumu(req:Request, res:Response){
        const drustvoRepo = new DrustvoRepository();
        const sportRepo = new SportRepository();
        const fakultetRepo = new FakultetRepository();
        console.log(req.query.month);
        if(req.query.month!=undefined && req.query.month=='true'){
            try{
                console.log('Usla u if granu')
                console.log(req.params.datum);
                
                const drustvo = await drustvoRepo.vratiSve();
                const sport = await sportRepo.vratiSve();
                const fakultet = await fakultetRepo.vratiSve();
                let datum = new Date(req.params.datum)
                console.log(datum)
                //console.log(req.query.datumIVreme);
                let drustvo2=drustvo.filter((aktivnost)=>{
                    let drustvenaAkt = new Drustvo(aktivnost);
                    return drustvenaAkt.datumIVreme.getFullYear()==datum.getFullYear() &&
                        drustvenaAkt.datumIVreme.getMonth()==datum.getMonth()
                            
                });
                let sport2=sport.filter((aktivnost)=>{
                    let sportskaAktivnost = new Sport(aktivnost);
                    return sportskaAktivnost.datumIVreme.getFullYear()==datum.getFullYear() &&
                    sportskaAktivnost.datumIVreme.getMonth()==datum.getMonth()
                            
                });
    
                let fakultet2=fakultet.filter((aktivnost)=>{
                    let fakultetskaAktivnost = new Fakultet(aktivnost);
                    return fakultetskaAktivnost.datumIVreme.getFullYear()==datum.getFullYear() &&
                    fakultetskaAktivnost.datumIVreme.getMonth()==datum.getMonth()
                            
                });
                
                let rezultat ={};
                if(drustvo2.length>0) rezultat["drustvene aktivnosti"]=drustvo2;
                if(sport2.length>0) rezultat["sportske aktivnosti"]=sport2;
                if(fakultet2.length>0) rezultat["fakultetske obaveze"]=fakultet2;
                res.status(200).send(rezultat);
                
            } catch(e) {
                console.log(e);
                res.status(400).send({"error": e.message})
            }
        } else
        try{
            console.log(req.params.datum);
            
            const drustvo = await drustvoRepo.vratiSve(req.query);
            const sport = await sportRepo.vratiSve(req.query);
            const fakultet = await fakultetRepo.vratiSve(req.query);
            
            let datum = new Date(req.params.datum)
            console.log(datum)
            //console.log(req.query.datumIVreme);
            let drustvo2=drustvo.filter((aktivnost)=>{
                let drustvenaAkt = new Drustvo(aktivnost);
                return drustvenaAkt.datumIVreme.getFullYear()==datum.getFullYear() &&
                    drustvenaAkt.datumIVreme.getMonth()==datum.getMonth() &&
                    drustvenaAkt.datumIVreme.getDate()==datum.getDate()
                        
            });
            let sport2=sport.filter((aktivnost)=>{
                let sportskaAktivnost = new Sport(aktivnost);
                return sportskaAktivnost.datumIVreme.getFullYear()==datum.getFullYear() &&
                sportskaAktivnost.datumIVreme.getMonth()==datum.getMonth() &&
                sportskaAktivnost.datumIVreme.getDate()==datum.getDate()
                        
            });

            let fakultet2=fakultet.filter((aktivnost)=>{
                let fakultetskaAktivnost = new Fakultet(aktivnost);
                return fakultetskaAktivnost.datumIVreme.getFullYear()==datum.getFullYear() &&
                fakultetskaAktivnost.datumIVreme.getMonth()==datum.getMonth() &&
                fakultetskaAktivnost.datumIVreme.getDate()==datum.getDate()
                        
            });
            
            let rezultat ={};
            if(drustvo2.length>0) rezultat["drustvene aktivnosti"]=drustvo2;
            if(sport2.length>0) rezultat["sportske aktivnosti"]=sport2;
            if(fakultet2.length>0) rezultat["fakultetske obaveze"]=fakultet2;
            res.status(200).send(rezultat);
            
        } catch(e) {
            console.log(e);
            res.status(400).send({"error": e.message})
        }
    }
}