import {RepositoryBase} from './RepositoryBase';
import {Document, Model} from 'mongoose';
import { ObjectID } from 'bson';
import { IDrustvoModel } from '../models/interfaces/IDrustvoModel';
import { DrustvoModel } from '../models/DrustvoModel';

export class DrustvoRepository extends RepositoryBase<IDrustvoModel>{
    
    constructor(){
        super(DrustvoModel);
    }

    async vratiSve(uslov:object ={}):Promise<IDrustvoModel[]>{
        let obaveze = await this.find(uslov);
        return <IDrustvoModel[]> obaveze;
    }

    async vratiJednu(lekcijaID:ObjectID):Promise<IDrustvoModel>{
        let obaveza = await this.findOne(lekcijaID);
        return <IDrustvoModel> obaveza;
    }

    async ubaci(novi: IDrustvoModel):Promise<IDrustvoModel>{
       let noviObjekat = await this.insert(novi);;
        return noviObjekat;
    }

    async obrisi(objectID: ObjectID):Promise<IDrustvoModel>{
        let obrisanObjekat = await this.delete(objectID);
        return obrisanObjekat;
    }
    
    async izmeniObavezu(objectID:ObjectID,izmena:IDrustvoModel):Promise<IDrustvoModel>{
        let izmenjenObjekat= this.update(objectID,izmena);
        return izmenjenObjekat;
    }
    
    async dopuniObavezu(objectID:ObjectID,izmena:object):Promise<IDrustvoModel>{
        let izmenjenObjekat= this.update(objectID,{$set:izmena});
        return izmenjenObjekat;
    }

     
}