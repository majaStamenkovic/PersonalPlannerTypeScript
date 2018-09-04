import {RepositoryBase} from './RepositoryBase';
import {Document, Model} from 'mongoose';
import { ObjectID } from 'bson';
import { IUserModel } from '../models/interfaces/IUserModel';
import { UserModel } from '../models/UserModel';

export class UserRepository extends RepositoryBase<IUserModel>{
    
    constructor(){
        super(UserModel);
    }

    async vratiJednu(userID:ObjectID):Promise<IUserModel>{
        let user = await this.findOne(userID);
        return <IUserModel> user;
    }

    async nadjiPoUsername(username:string):Promise<IUserModel>{
        let user = await this.findByCriteria({"username":username});
        return <IUserModel> user;
    }

    async ubaci(novi: IUserModel):Promise<IUserModel>{
       let noviUser = await this.insert(novi);;
        return noviUser;
    }

    async obrisi(objectID: ObjectID):Promise<IUserModel>{
        let obrisanUser = await this.delete(objectID);
        return obrisanUser;
    }
    
}