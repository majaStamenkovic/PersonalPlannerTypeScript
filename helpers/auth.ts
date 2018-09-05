import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken';

export function verifikacija(req:Request,res:Response,next){
    try {
        const token =req.headers.authorization.split(' ')[1];
        const decoded= jwt.verify(token,'secret'); 
        //Uspesna autentikacija
        //Mozes da dodas novo polje u req
        //console.log(decoded);
        req.body.username=decoded;
        req.body.username=req.body.username.username;
        //console.log(req.body.username);
        next();
    } catch (error) {
        res.status(401).send({
            "message": "Niste prijavljeni"
        })
    }
}