import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { autorizacija } from '../helpers/auth';

export class UserRouter{
    private _userController: UserController;
    constructor(){
        this._userController=new UserController();
    }

    get routes(){
        const controller = this._userController;
        const router = Router();
        router.post('/login',controller.logovanjeKorisnika);
        router.post('/signup',controller.kreiranjeKorisnika);
        router.get('/account',autorizacija,controller.korisnickiNalog);

        return router;
    }
}