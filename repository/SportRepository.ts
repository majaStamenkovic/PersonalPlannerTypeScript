import {RepositoryBase} from './RepositoryBase';
import {Document, Model} from 'mongoose';
import { ISportModel } from '../models/interfaces/ISportModel';
import { SportModel } from '../models/SportModel';
import { ObjectID } from 'bson';

export class SportRepository extends RepositoryBase<ISportModel>{
    
    constructor(){
        super(SportModel);
    }
   

    async vratiSve():Promise<ISportModel[]>{
        let treninzi = await this.find();
        return <ISportModel[]> treninzi;
    }

    async vratiJednu(lekcijaID:ObjectID):Promise<ISportModel>{
        let trening = await this.findOne(lekcijaID);
        return <ISportModel> trening;
    }

    async ubaci(novi: ISportModel):Promise<ISportModel>{
       let noviObjekat = await this.insert(novi);;
        return noviObjekat;
    }

    async obrisi(objectID: ObjectID):Promise<ISportModel>{
        let obrisanObjekat = await this.delete(objectID);
        return obrisanObjekat;
    }
    
    async izmeniObavezu(objectID:ObjectID,izmena:ISportModel):Promise<ISportModel>{
        let izmenjenObjekat= this.update(objectID,izmena);
        return izmenjenObjekat;
    }
    
    async dopuniObavezu(objectID:ObjectID,izmena:object):Promise<ISportModel>{
        let izmenjenObjekat= this.update(objectID,{$set:izmena});
        return izmenjenObjekat;
    }

     
}