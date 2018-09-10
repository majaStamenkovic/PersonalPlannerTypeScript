import { RepositoryBase } from './RepositoryBase';
import { Document, Model } from 'mongoose';
import { ObjectID } from 'bson';
import { IUserModel } from '../models/interfaces/user/IUserModel';
import { UserModel } from '../models/UserModel';

export class UserRepository extends RepositoryBase<IUserModel>{
    
    constructor(){
        super(UserModel);
    }

    async vratiKorisnika(criteria:object):Promise<IUserModel>{
        let user = await this.findOneByCriteria(criteria);
        return <IUserModel> user;
    }

    async ubaciKorisnika(novi: IUserModel):Promise<IUserModel>{
       let noviUser = await this.insert(novi);;
        return noviUser;
    }

    async obrisiKorisnika(objectID: ObjectID):Promise<IUserModel>{
        let obrisanUser = await this.delete(objectID);
        return obrisanUser;
    }
    
}