import { IAktivnostiModel } from '../aktivnosti/base/IAktivnostiModel';

export interface IDrustvoModel extends IAktivnostiModel{
    lokacija: string;
    drustvo: string;
}