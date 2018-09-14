import { DrustvoRepository } from "../repository/aktivnosti/DrustvoRepository";
import { SportRepository } from "../repository/aktivnosti/SportRepository";
import { FakultetRepository } from "../repository/aktivnosti/FakultetRepository";
import { IAktivnostiModel } from "../models/interfaces/aktivnosti/base/IAktivnostiModel";


export class Calendar{
    
    static async vratiSveAkt(criteria: object): Promise<object> {
        const drustvoRepo = new DrustvoRepository();
        const sportRepo = new SportRepository();
        const fakultetRepo = new FakultetRepository();


        const drustvo = await drustvoRepo.vratiSve(criteria);
        const sport = await sportRepo.vratiSve(criteria);
        const fakultet = await fakultetRepo.vratiSve(criteria);

        let rezultat = {};
        if (drustvo != undefined && drustvo.length > 0) rezultat["drustvene aktivnosti"] = Calendar.sortiraj(drustvo);
        if (sport != undefined && sport.length > 0) rezultat["sportske aktivnosti"] = Calendar.sortiraj(sport);
        if (fakultet != undefined && fakultet.length > 0) rezultat["fakultetske obaveze"] = Calendar.sortiraj(fakultet);
        return rezultat;
    }
    // Sortira u rastuci niz
    private static sortiraj(aktivnosti:IAktivnostiModel[]):IAktivnostiModel[]{
        for(let i =0;i<aktivnosti.length-1;i++){
            for(let j =i+1;j<aktivnosti.length;j++){
                if((aktivnosti[i].datumIVreme.getTime()-aktivnosti[j].datumIVreme.getTime())>0){
                    // Starija je aktivnost desno, znaci potrebna je zamena mesta
                    let pomocna = aktivnosti[i];
                    aktivnosti[i]=aktivnosti[j];
                    aktivnosti[j]=pomocna;
                }
            }
        }
        return aktivnosti;
    }

    static kriterijumPretrage(zahtev: any): object {
        let criteria = zahtev;
        //criteria.username = zahtev.username;

        // Obrada datuma
        if (criteria.datumIVreme != undefined) {
            criteria.datumIVreme = new Date(zahtev.datumIVreme);
            if (zahtev.lte) {
                criteria.datumIVreme = { $lte: criteria.datumIVreme };
                delete criteria.lte;
            }
            else criteria.datumIVreme = { $gte: criteria.datumIVreme };
        }
        // Obrada opsega vremena
        if (criteria.datumDonja != undefined && criteria.datumGornja != undefined) {
            const datumDonja = new Date(zahtev.datumDonja);
            const datumGornja = new Date(zahtev.datumGornja);
            criteria.datumIVreme = { $gte: datumDonja, $lte: datumGornja };
            delete criteria.datumDonja;
            delete criteria.datumGornja;
        }
        //console.log(criteria);
        return criteria;
    }
}