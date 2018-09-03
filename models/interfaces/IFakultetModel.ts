import {Document} from 'mongoose';

export interface IFakultetModel extends Document{
    nazivPredmeta: string;
    nazivAktivnosti:string;
    brojLekcije:number;
    datumIVreme: Date;
    trajanje:number;
    sala: string;
    napomene: string;
}