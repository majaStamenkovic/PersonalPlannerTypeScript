import { Document, Model } from 'mongoose'
import { ObjectID } from 'bson'

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
        let criteria ={_id: objectID};
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


    protected insert2(objectToInsert: T) {
        let promise = new Promise<T>(async (resolve, reject) => {
            let object = await this._model.create(objectToInsert);
            if(object){
                console.log('Uspesno dodat');
                resolve(object);
            }
            else {
                console.log('Doslo je do greske prilikom ubacivanja objekta');
                reject();
            }
        });
        return promise;
    }

    protected insert(objectToInsert: T) {
        let promise = new Promise<T>(async (resolve, reject) => {
            try{
                let object = await this._model.create(objectToInsert);
                console.log('Uspesno dodat');
                resolve(object);
            }
            catch(e) {
                console.log('Doslo je do greske prilikom ubacivanja objekta');
                reject(e);
            }
        });
        return promise;
    }

    protected delete(objectID:ObjectID){
        let promise = new Promise<T>(async (resolve, reject) => {
            try{
                let object = await this._model.findOneAndRemove({_id:objectID}).exec();
                console.log('Uspesno obrisan');
                resolve(object);
            }
            catch(e) {
                console.log('Doslo je do greske prilikom brisanja objekta _id:',objectID);
                reject();
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

/*
//Bez vracanja promise
protected async update2(objectID:ObjectID,novi:T){
        let object = await this._model.findOne({_id:objectID}).exec();
        if(object){
            await this._model.updateOne({_id:objectID},novi);
            console.log('Uspesna izmena');
        }
        else {
            console.log('Objekat ne postoji');
        }
    }

    protected delete(objectID:ObjectID){
        this._model.findOneAndRemove({_id : objectID},(err) => {
            if (err) {
                console.log('Greska prilikom izbacivanja iz baze objekta _id:', objectID);
            } else console.log('Uspesno izbacivanje');
        });
    }

    protected insert(objectToInsert: T) {
        this._model.create(objectToInsert, (err) => {
            if (err) {
                console.log('Greska prilikom ubacivanja u bazu ', objectToInsert);
            } else console.log('Uspesno ubacivanje');
        });
    }
*/
    /*
        
    protected find2<T extends Document>(databaseModel: Model<T>,criteria: Object ={}):Promise<T[]>{
        let dbModel =  databaseModel;
        let promise = new Promise<T[]>((resolve,reject)=>{
            dbModel.find(criteria,(error,data)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        });
        return promise;
    }

        protected findOne2<T extends Document>(databaseModel: Model<T>, criteria: Object = {}): Promise<T> {

        let dbModel =  <Model<T>> databaseModel;

        let promise = new Promise<T>(((resolve, reject) => {
            
            dbModel.findOne(criteria, (error, responses) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(responses);
                }
                
            });
        }));
        return promise;
    }
    protected insert2<T extends Document>(databaseModel:Model<T>,objectToInsert: T) {
    let dbModel =  <Model<T>> databaseModel;
    dbModel.create(objectToInsert,(err) => {
        if (err) {
            console.log('Greska prilikom ubacivanja u bazu ', objectToInsert);
        } else console.log('Uspesno ubacivanje');
    });

}
    */

}