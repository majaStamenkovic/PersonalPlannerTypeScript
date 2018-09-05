import { Request, Response } from 'express';
import { IUserModel } from '../models/interfaces/IUserModel';
import bcrypt from 'bcrypt';
import { User } from '../business/User';
import { UserRepository } from '../repository/UserRepository';
import { isNullOrUndefined } from 'util';
import * as jwt from 'jsonwebtoken';


export class UserController {

    public kreiranjeKorisnika2(req: Request, res: Response) {
        const repo = new UserRepository();
        try {
            let user = new User(<IUserModel>req.body);
            bcrypt.hash(req.body.password, 10, (err, data) => {
                user.password = data;
                console.log(user.password);
                repo.ubaci(user.informacijeOKorisniku)
                    .then((data) => res.status(201).send(data))
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }


    }

    public kreiranjeKorisnika(req: Request, res: Response) {
        const repo = new UserRepository();
        try {
            let user = new User(<IUserModel>req.body);
            let newPassword = bcrypt.hashSync(req.body.password, 10);
            user.password = newPassword;
            //console.log(user.password);
            repo.ubaci(user.informacijeOKorisniku)
                .then((data) => res.status(201).send(data))
                //Uhvati dupli mejl
                .catch((err) => res.status(400).send({ "error": err.message, "dupli": "dupli" }))

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }
    public async logovanjeKorisnika(req: Request, res: Response) {
        const repo = new UserRepository();
        try {
            if (typeof req.body.username == 'undefined' || typeof req.body.password == 'undefined') {
                res.status(400).send({ "poruka": "Morate uneti username i password" });
            } else {
                let postojiUser = await repo.nadjiPoUsername(req.body.username);
                //console.log(postojiUser);
                if (postojiUser) {
                    //console.log(' IF');
                    let passwordMatch = await bcrypt.compare(req.body.password, postojiUser.password);
                    //console.log(passwordMatch);
                    if (passwordMatch) {
                        const token = jwt.sign({
                            username:postojiUser.username,
                            userId:postojiUser._id
                        },'secret',{ expiresIn:"1h"});
                        console.log(token);
                        res.status(200).send({ "poruka": "Autentikacija uspesna", "token":token })
                    } else {
                        res.status(401).send({ "greska": "Pogresna sifra" })
                    }
                } else {
                    res.status(401).send({ "greska": "Ne postoji korisnik sa datim username" });
                }
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }
}