"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Correo/contraseña no son correctos.'
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
//Buscar usuario por email
userRoutes.post('/email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_model_1.Usuario.findOne({ email: req.body.email });
    res.json({
        ok: true,
        usuario
    });
}));
//Buscar usuario por doctor
userRoutes.post('/doctor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_model_1.Usuario.find({ doctor: req.body.doctor });
    res.json({
        ok: true,
        usuario
    });
}));
//Listar usuarios
userRoutes.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_model_1.Usuario.find();
    res.json({
        ok: true,
        usuarios
    });
}));
//Eliminar usuario
userRoutes.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    usuario_model_1.Usuario.deleteOne({ email: req.body.email }, () => {
        res.json({
            ok: true
        });
    });
}));
//Metodo que necesite autenticar el token (por ejemplo actualizar)
/* userRoutes.post('/update', verificaToken,  (req: Request, res: Response) => {

    //aaaaaaah?

}); */
exports.default = userRoutes;
