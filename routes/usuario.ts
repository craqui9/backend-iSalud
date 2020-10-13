import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';


const userRoutes = Router();


userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        rol: req.body.rol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    };

    Usuario.create(user).then(userDB => {

        res.json({
            ok: true,
            user: userDB
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });

});



export default userRoutes;