import {Document} from 'mongoose';

export interface IDrustvoModel extends Document{
    nazivAktivnosti:string;
    datumIVreme: Date;
    trajanje:number;
    lokacija: string;
    drustvo: string;
    username:string;
}