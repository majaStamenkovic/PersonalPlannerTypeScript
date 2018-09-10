import {Document} from 'mongoose';
import {ObjectID} from 'bson';
import { RepositoryBase } from '../RepositoryBase';
// Ne moze da se implementira zbog protected
export interface IRead<T extends Document>{
    find(criteria: Object): Promise<T[]>;
    findOne(objectID:ObjectID): Promise<T>;
    findByCriteria(criteria:object): Promise<T>;
}