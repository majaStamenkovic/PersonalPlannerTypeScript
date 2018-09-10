import { Request, Response } from 'express'
export interface IAktivnostiController{
    kreirajObavezu(req: Request, res: Response):void; 

    vratiSveObaveze(req: Request, res: Response):void; 

    vratiObavezu(req: Request, res: Response):void;

    izmeniObavezu(req: Request, res: Response):void; 

    dopuniObavezu(req: Request, res: Response):void;

    obrisiObavezu(req: Request, res: Response):void; 
}