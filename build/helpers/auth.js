"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("./constants");
function autorizacija(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, constants_1.SECRET_KEY);
        //Uspesna autentikacija
        //Mozes da dodas novo polje u req
        //console.log(decoded);
        req.body.username = decoded;
        req.body.username = req.body.username.username;
        //console.log(req.body.username);
        next();
    }
    catch (error) {
        res.status(401).send({
            "message": "Niste prijavljeni"
        });
    }
}
exports.autorizacija = autorizacija;
