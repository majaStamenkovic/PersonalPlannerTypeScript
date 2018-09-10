import { Document, Model } from 'mongoose';
import { IFakultetModel } from '../models/interfaces/aktivnosti/IFakultetModel';
import { FakultetModel } from '../models/FakultetModel';
import { ObjectID } from 'bson';
import { AktivnostiRepository } from './AktivnostiRepository';

export class FakultetRepository extends AktivnostiRepository<IFakultetModel>{
    
    constructor(){
        super(FakultetModel);
    }
   
    /*

    async vratiSve(uslov:object ={}):Promise<IFakultetModel[]>{
        let obaveze = await this.find(uslov);
        return <IFakultetModel[]> obaveze;
    }

    async vratiJednu(lekcijaID:ObjectID):Promise<IFakultetModel>{
        let obaveza = await this.findOne(lekcijaID);
        return <IFakultetModel> obaveza;
    }

    async ubaci(novi: IFakultetModel):Promise<IFakultetModel>{
       let noviObjekat = await this.insert(novi);;
        return noviObjekat;
    }

    async obrisi(objectID: ObjectID):Promise<IFakultetModel>{
        let obrisanObjekat = await this.delete(objectID);
        return obrisanObjekat;
    }
    
    async izmeniObavezu(objectID:ObjectID,izmena:IFakultetModel):Promise<IFakultetModel>{
        let izmenjenObjekat= this.update(objectID,izmena);
        return izmenjenObjekat;
    }
    
    async dopuniObavezu(objectID:ObjectID,izmena:object):Promise<IFakultetModel>{
        let izmenjenObjekat= this.update(objectID,{$set:izmena});
        return izmenjenObjekat;
    }
    */
     
}