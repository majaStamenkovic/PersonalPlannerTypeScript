import {Document} from 'mongoose';

export interface ILekcijaModel extends Document{
    nazivPredmeta: string;
    tipLekcije:string;
    brojLekcije:number;
}