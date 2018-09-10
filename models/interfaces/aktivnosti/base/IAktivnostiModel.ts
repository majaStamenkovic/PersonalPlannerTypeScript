import {Document} from 'mongoose';

export interface IAktivnostiModel extends Document{
    nazivAktivnosti:string;
    datumIVreme: Date;
    trajanje?:number;
    username:string;
}