import { Request, Response } from 'express';
import { IUserModel } from '../models/interfaces/user/IUserModel';
import bcrypt from 'bcrypt';
import { User } from '../business/User';
import { UserRepository } from '../repository/user/UserRepository';
import { isNullOrUndefined } from 'util';
import * as jwt from 'jsonwebtoken';
import { REGEX_MAIL, SECRET_KEY, TRAJANJE_TOKENA } from '../helpers/constants';

export class UserController {

    public async kreiranjeKorisnika(req: Request, res: Response) {
        const repo = new UserRepository();
        try {

            // Provera da li su sva polja uneta
            if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
                res.status(400).send({ "Greska": "Polja username, password i email su obavezna" });
                return;
            }
            // Proverava da li je email adresa validna
            const regexp = new RegExp(REGEX_MAIL);
            if (!regexp.test(req.body.email)) {
                res.status(400).send({ "Greska": "Email nije validan" });
                return;
            }
            // Proverava da li postoji korisnik sa istim imenom
            const postojiUserSaIstimImenom = await repo.vratiKorisnika({ "username": req.body.username });
            if (postojiUserSaIstimImenom) {
                res.status(400).send({ "Greska": "Vec postoji korisnik sa trazenim imenom" });
                return;
            }

            // Proverava da li postoji korisnik sa istim mejlom
            let postojiUserSaIstimMejlom = await repo.vratiKorisnika({ "email": req.body.email });
            if (postojiUserSaIstimMejlom) {
                res.status(400).send({ "Greska": "Vec postoji korisnik sa unetim mejlom" });
                return;
            }

            // Moze se uneti korisnik
            const user = new User(<IUserModel>req.body);
            const newPassword = bcrypt.hashSync(req.body.password, 10);
            user.password = newPassword;

            repo.ubaciKorisnika(user.informacijeOKorisniku)
                .then((data) => res.status(201).send(data));

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }

    public async logovanjeKorisnika(req: Request, res: Response) {
        const repo = new UserRepository();
        try {
            // Provera da li su sva polja uneta
            if (req.body.username == undefined || req.body.password == undefined) {
                res.status(400).send({ "poruka": "Morate uneti username i password" });
                return;
            }
            // Provera da li postoji korisnik sa unetim username 
            const postojiUser = await repo.vratiKorisnika({ "username": req.body.username });
            if (!postojiUser) {
                res.status(401).send({ "greska": "Ne postoji korisnik sa datim username" });
                return;
            }
            // Provera sifre
            const passwordMatch = await bcrypt.compare(req.body.password, postojiUser.password);
            if (!passwordMatch) {
                res.status(401).send({ "greska": "Pogresna sifra" });
                return;
            }
            // Generisanje tokena
            const token = jwt.sign({
                username: postojiUser.username,
                userId: postojiUser._id
            }, SECRET_KEY, { expiresIn: TRAJANJE_TOKENA });
            res.status(200).send({ "poruka": "Autentikacija uspesna", "token": token });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }

    public async korisnickiNalog(req: Request, res: Response) {
        const repo = new UserRepository();
        try {
            const postojiUser = await repo.vratiKorisnika({ "username": req.body.username });
            res.status(200).send({"username":postojiUser.username, "email":postojiUser.email});
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }
}