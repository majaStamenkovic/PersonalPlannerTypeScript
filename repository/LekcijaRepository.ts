import {RepositoryBase} from './RepositoryBase';
import {Document, Model} from 'mongoose';
import { ILekcijaModel } from '../models/interfaces/ILekcijaModel';
import { LekcijaModel } from '../models/LekcijaModel';
import { ObjectID } from 'bson';

export class LekcijaRepository extends RepositoryBase<ILekcijaModel>{
    
    constructor(){
        super(LekcijaModel);
    }
   

    async vratiSve():Promise<ILekcijaModel[]>{
        let nesto = await this.find();
        return <ILekcijaModel[]> nesto;
    }

    async vratiJednu(lekcijaID:ObjectID):Promise<ILekcijaModel>{
        let lekcija = await this.findOne(lekcijaID);
        return <ILekcijaModel> lekcija;
    }

    async ubaci(novi: ILekcijaModel):Promise<ILekcijaModel>{
       let noviObjekat = await this.insert(novi);;
        return noviObjekat;
    }

    async obrisi(objectID: ObjectID):Promise<ILekcijaModel>{
        let obrisanObjekat = await this.delete(objectID);
        return obrisanObjekat;
    }
    
    async izmeniLekciju(objectID:ObjectID,izmena:ILekcijaModel):Promise<ILekcijaModel>{
        let izmenjenObjekat= this.update(objectID,izmena);
        return izmenjenObjekat;
    }
    

    /*
    private _model : Model<ILekcijaModel>;
    constructor(){
        super();
        this._model= LekcijaModel;
    }
    async vratiSve():Promise<ILekcijaModel[]>{
        let nesto = await this.find(this._model);
        return <ILekcijaModel[]> nesto;
    }

    async vratiJednu(object:Object):Promise<ILekcijaModel>{
        let nesto = await this.findOne(this._model,object);
        return <ILekcijaModel> nesto;
    }

    async ubaci(novi: ILekcijaModel):Promise<void>{
       await this.insert(this._model,novi);
    }
    */
     
}