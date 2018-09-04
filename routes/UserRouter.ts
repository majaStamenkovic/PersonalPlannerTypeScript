import {Router} from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
export class UserRouter{
    private _userController: UserController;

    constructor(){
        this._userController=new UserController();
    }

    get routes(){
        let controller = this._userController;
        router.post('/login',controller.logovanjeKorisnika);
        router.post('/signup',controller.kreiranjeKorisnika);

        return router;
    }
}