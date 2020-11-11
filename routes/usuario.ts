import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';


const userRoutes = Router();

//Login
userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    Usuario.findOne({email: body.email}, (err, userDB) => {

        if(err) throw err;

        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos.'
            });
        }

        if(userDB.compararPassword(body.password)){

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                rol: userDB.rol,
                nombre: userDB.nombre,
                email: userDB.email,
                doctor: userDB.doctor

            });
            
            res.json({
                //usar uno de los dos
                ok: true,
                //Pasar el token de autenticacion
                token: tokenUser,
                //Pasar los datos directamente sin la contraseña
                rol: userDB.rol,
                nombre: userDB.nombre,
                email: userDB.email,
                doctor_asociado: userDB.doctor
            });

        }else{
            return res.json({
                ok: false,
                mensaje: 'Correo/contraseña no son correctos.'
            });
        }

    });

});


//Crear un Usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        rol: req.body.rol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        doctor: req.body.doctor
    };

    Usuario.create(user).then(userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            rol: userDB.rol,
            nombre: userDB.nombre,
            email: userDB.email,
            doctor: userDB.doctor

        });
        
        res.json({
            ok: true,
            token: tokenUser
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });

});

//Buscar usuario por email
userRoutes.post('/email', async(req: Request, res: Response) => {

    const usuario = await Usuario.findOne({email: req.body.email});

    res.json({
        ok: true,
        usuario
    });

});

//Buscar usuario por doctor
userRoutes.post('/doctor', async(req: Request, res: Response) => {

    const usuario = await Usuario.find({doctor: req.body.doctor});

    res.json({
        ok: true,
        usuario
    });

});

//Listar usuarios
userRoutes.get('/list', async(req: Request, res: Response) => {

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    });

});

//Eliminar usuario
userRoutes.post('/delete', async(req: Request, res: Response) => {
    
   Usuario.deleteOne({email: req.body.email}, () => {
                        res.json({
                            ok:true
                        });
                    });



});

//Metodo que necesite autenticar el token (por ejemplo actualizar)
/* userRoutes.post('/update', verificaToken,  (req: Request, res: Response) => {

    //aaaaaaah?

}); */


export default userRoutes;