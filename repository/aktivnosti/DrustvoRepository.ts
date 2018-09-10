import {Document, Model} from 'mongoose';
import { IDrustvoModel } from '../../models/interfaces/aktivnosti/IDrustvoModel';
import { DrustvoModel } from '../../models/DrustvoModel';
import { AktivnostiRepository } from './base/AktivnostiRepository';

export class DrustvoRepository extends AktivnostiRepository<IDrustvoModel>{
    
    constructor(){
        super(DrustvoModel);
    }
}