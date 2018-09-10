import { Document, Model } from 'mongoose';
import { ISportModel } from '../../models/interfaces/aktivnosti/ISportModel';
import { SportModel } from '../../models/SportModel';
import { AktivnostiRepository } from './base/AktivnostiRepository';

export class SportRepository extends AktivnostiRepository<ISportModel>{
    
    constructor(){
        super(SportModel);
    }
}