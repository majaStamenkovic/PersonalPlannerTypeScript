import { IAktivnostiModel } from '../aktivnosti/base/IAktivnostiModel';

export interface ISportModel extends IAktivnostiModel{
    lokacija: string;
    napomene?: string;
}