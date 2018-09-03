import {Document} from 'mongoose';

export interface ILekcijaModel extends Document{
    nazivPredmeta: string;
    nazivAktivnosti:string;
    brojLekcije:number;
    datumIVreme: Date;
    trajanje:Number;
    sala: string;
    napomene: string;
}