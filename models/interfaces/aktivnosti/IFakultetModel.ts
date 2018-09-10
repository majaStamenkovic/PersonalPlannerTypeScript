import { IAktivnostiModel } from '../aktivnosti/base/IAktivnostiModel';

export interface IFakultetModel extends IAktivnostiModel{
    nazivPredmeta: string;
    brojLekcije?:number;
    sala?: string;
    napomene?: string;
}