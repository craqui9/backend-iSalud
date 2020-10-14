"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const userRoutes = express_1.Router();
//Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos.'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
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
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos.'
            });
        }
    });
});
//Crear un Usuario
userRoutes.post('/create', (req, res) => {
    const user = {
        rol: req.body.rol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        doctor: req.body.doctor
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
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
//Metodo que necesite autenticar el token (por ejemplo actualizar)
/* userRoutes.post('/update', verificaToken,  (req: Request, res: Response) => {

    //aaaaaaah?

}); */
exports.default = userRoutes;
