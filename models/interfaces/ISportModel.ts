import {Document} from 'mongoose';

export interface ISportModel extends Document{
    nazivAktivnosti:string;
    datumIVreme: Date;
    trajanje:number;
    lokacija: string;
    napomene: string;
}