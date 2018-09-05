"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../business/User");
const UserRepository_1 = require("../repository/UserRepository");
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    kreiranjeKorisnika2(req, res) {
        const repo = new UserRepository_1.UserRepository();
        try {
            let user = new User_1.User(req.body);
            bcrypt_1.default.hash(req.body.password, 10, (err, data) => {
                user.password = data;
                console.log(user.password);
                repo.ubaci(user.informacijeOKorisniku)
                    .then((data) => res.status(201).send(data));
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }
    kreiranjeKorisnika(req, res) {
        const repo = new UserRepository_1.UserRepository();
        try {
            let user = new User_1.User(req.body);
            let newPassword = bcrypt_1.default.hashSync(req.body.password, 10);
            user.password = newPassword;
            //console.log(user.password);
            repo.ubaci(user.informacijeOKorisniku)
                .then((data) => res.status(201).send(data))
                //Uhvati dupli mejl
                .catch((err) => res.status(400).send({ "error": err.message, "dupli": "dupli" }));
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "error": error.message });
        }
    }
    logovanjeKorisnika(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new UserRepository_1.UserRepository();
            try {
                if (typeof req.body.username == 'undefined' || typeof req.body.password == 'undefined') {
                    res.status(400).send({ "poruka": "Morate uneti username i password" });
                }
                else {
                    let postojiUser = yield repo.nadjiPoUsername(req.body.username);
                    //console.log(postojiUser);
                    if (postojiUser) {
                        //console.log(' IF');
                        let passwordMatch = yield bcrypt_1.default.compare(req.body.password, postojiUser.password);
                        //console.log(passwordMatch);
                        if (passwordMatch) {
                            const token = jwt.sign({
                                username: postojiUser.username,
                                userId: postojiUser._id
                            }, 'secret', { expiresIn: "1h" });
                            console.log(token);
                            res.status(200).send({ "poruka": "Autentikacija uspesna", "token": token });
                        }
                        else {
                            res.status(401).send({ "greska": "Pogresna sifra" });
                        }
                    }
                    else {
                        res.status(401).send({ "greska": "Ne postoji korisnik sa datim username" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ "error": error.message });
            }
        });
    }
}
exports.UserController = UserController;
