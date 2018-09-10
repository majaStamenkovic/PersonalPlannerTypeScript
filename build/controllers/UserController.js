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
const UserRepository_1 = require("../repository/user/UserRepository");
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("../helpers/constants");
class UserController {
    kreiranjeKorisnika(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new UserRepository_1.UserRepository();
            try {
                // Provera da li su sva polja uneta
                if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
                    res.status(400).send({ "Greska": "Polja username, password i email su obavezna" });
                    return;
                }
                // Proverava da li je email adresa validna
                const regexp = new RegExp(constants_1.REGEX_MAIL);
                if (!regexp.test(req.body.email)) {
                    res.status(400).send({ "Greska": "Email nije validan" });
                    return;
                }
                // Proverava da li postoji korisnik sa istim imenom
                const postojiUserSaIstimImenom = yield repo.vratiKorisnika({ "username": req.body.username });
                if (postojiUserSaIstimImenom) {
                    res.status(400).send({ "Greska": "Vec postoji korisnik sa trazenim imenom" });
                    return;
                }
                // Proverava da li postoji korisnik sa istim mejlom
                let postojiUserSaIstimMejlom = yield repo.vratiKorisnika({ "email": req.body.email });
                if (postojiUserSaIstimMejlom) {
                    res.status(400).send({ "Greska": "Vec postoji korisnik sa unetim mejlom" });
                    return;
                }
                // Moze se uneti korisnik
                const user = new User_1.User(req.body);
                const newPassword = bcrypt_1.default.hashSync(req.body.password, 10);
                user.password = newPassword;
                repo.ubaciKorisnika(user.informacijeOKorisniku)
                    .then((data) => res.status(201).send(data));
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ "error": error.message });
            }
        });
    }
    logovanjeKorisnika(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new UserRepository_1.UserRepository();
            try {
                // Provera da li su sva polja uneta
                if (req.body.username == undefined || req.body.password == undefined) {
                    res.status(400).send({ "poruka": "Morate uneti username i password" });
                    return;
                }
                // Provera da li postoji korisnik sa unetim username 
                const postojiUser = yield repo.vratiKorisnika({ "username": req.body.username });
                if (!postojiUser) {
                    res.status(401).send({ "greska": "Ne postoji korisnik sa datim username" });
                    return;
                }
                // Provera sifre
                const passwordMatch = yield bcrypt_1.default.compare(req.body.password, postojiUser.password);
                if (!passwordMatch) {
                    res.status(401).send({ "greska": "Pogresna sifra" });
                    return;
                }
                // Generisanje tokena
                const token = jwt.sign({
                    username: postojiUser.username,
                    userId: postojiUser._id
                }, constants_1.SECRET_KEY, { expiresIn: "1h" });
                res.status(200).send({ "poruka": "Autentikacija uspesna", "token": token });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ "error": error.message });
            }
        });
    }
    korisnickiNalog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = new UserRepository_1.UserRepository();
            try {
                const postojiUser = yield repo.vratiKorisnika({ "username": req.body.username });
                res.status(200).send({ "username": postojiUser.username, "email": postojiUser.email });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ "error": error.message });
            }
        });
    }
}
exports.UserController = UserController;
