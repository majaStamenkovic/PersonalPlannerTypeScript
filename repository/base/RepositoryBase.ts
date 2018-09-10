import { Document, Model } from 'mongoose';
import { ObjectID } from 'bson';

export class RepositoryBase<T extends Document>{
    private _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    protected find(criteria: Object = {}): Promise<T[]> {
        let promise = new Promise<T[]>((resolve, reject) => {
            this._model.find(criteria, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        });
        return promise;
    }

    protected findOne(objectID:ObjectID): Promise<T> {
        let criteria ={_id:objectID};
        let promise = new Promise<T>((resolve, reject) => {
            this._model.findOne(criteria, ((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            }));
        });
        return promise;
    }

    protected findOneByCriteria(criteria:object): Promise<T> {
        let promise = new Promise<T>((resolve, reject) => {
            this._model.findOne(criteria, ((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            }));
        });
        return promise;
    }

    protected insert(objectToInsert: T) {
        let promise = new Promise<T>(async (resolve, reject) => {
            try{
                let object = await this._model.create(objectToInsert);
                // Uspesno je kreirano
                resolve(object);
            }
            catch(e) {
                // Doslo je do greske prilikom ubacivanja
                reject(e);
            }
        });
        return promise;
    }

    protected delete(objectID:ObjectID){
        let promise = new Promise<T>(async (resolve, reject) => {
            try{
                let object = await this._model.findOneAndRemove({_id:objectID}).exec();
                if(object) console.log('Uspesno obrisan');
                else console.log('Nije pronadjen')
                resolve(object);
            }
            catch(e) {
                console.log('Doslo je do greske prilikom brisanja objekta _id:',objectID);
                reject(e);
            }
            
        });
        return promise;
    }

    protected update(objectID:ObjectID,novi:object):Promise<T>{
        let promise = new Promise<T>(async (resolve, reject) => {
            let object = await this._model.findOneAndUpdate({_id:objectID},novi).exec();
            if(object){
                console.log('Uspesna izmena');
                resolve(object);
            }
            else {
                console.log('Objekat ne postoji');
                reject();
            }
        });
        return promise;
    }

}