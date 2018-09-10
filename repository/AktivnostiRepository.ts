import {Document} from 'mongoose';
import { ObjectID } from 'bson';
import { RepositoryBase } from "./RepositoryBase";


export class AktivnostiRepository<T extends Document> extends RepositoryBase<T>{

    async vratiSve(uslov:object ={}):Promise<T[]>{
        let obaveze = await this.find(uslov);
        return <T[]> obaveze;
    }

    async vratiJednu(objectID:ObjectID):Promise<T>{
        let obaveza = await this.findOne(objectID);
        return <T> obaveza;
    }

    async ubaci(novi: T):Promise<T>{
       let noviObjekat = await this.insert(novi);;
        return noviObjekat;
    }

    async obrisi(objectID: ObjectID):Promise<T>{
        let obrisanObjekat = await this.delete(objectID);
        return obrisanObjekat;
    }
    
    async izmeniObavezu(objectID:ObjectID,izmena:T):Promise<T>{
        let izmenjenObjekat= this.update(objectID,izmena);
        return izmenjenObjekat;
    }
    
    async dopuniObavezu(objectID:ObjectID,izmena:object):Promise<T>{
        let izmenjenObjekat= this.update(objectID,{$set:izmena});
        return izmenjenObjekat;
    }
}