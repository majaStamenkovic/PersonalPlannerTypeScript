import {Document} from 'mongoose';
import { ObjectID } from 'bson';
import { RepositoryBase } from "../../base/RepositoryBase";


export class AktivnostiRepository<T extends Document> extends RepositoryBase<T>{

    async vratiSve(uslov:object ={}):Promise<T[]>{
        let aktivnosti = await this.find(uslov);
        return <T[]> aktivnosti;
    }

    async vratiJednu(objectID:ObjectID):Promise<T>{
        let aktivnost = await this.findOne(objectID);
        return <T> aktivnost;
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