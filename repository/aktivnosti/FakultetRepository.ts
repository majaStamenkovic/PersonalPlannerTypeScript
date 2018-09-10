import { Document, Model } from 'mongoose';
import { IFakultetModel } from '../../models/interfaces/aktivnosti/IFakultetModel';
import { FakultetModel } from '../../models/FakultetModel';
import { AktivnostiRepository } from './base/AktivnostiRepository';

export class FakultetRepository extends AktivnostiRepository<IFakultetModel>{
    
    constructor(){
        super(FakultetModel);
    }
}