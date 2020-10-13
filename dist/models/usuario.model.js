"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    rol: {
        //El nivel del usuario, (admin para administrador), (doctor para doctor), (paciente para paciente)
        type: String,
        required: [true, 'El rol es necesario']
    },
    nombre: {
        //El nombre completo del usuario
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        //Es lo que voy a usar como clave primaria
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
