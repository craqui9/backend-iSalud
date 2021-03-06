"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    dni: {
        //Es lo que voy a usar como clave primaria
        type: String,
        unique: true,
        required: [true, 'El dni es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    doctor: {
        //El doctor asociado del usuario
        type: String,
        required: [true, 'El doctor asociado es necesario']
    },
    fecha_nacimiento: {
        type: String,
        required: [true, 'El fecha_nacimiento necesario']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo necesario']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono necesario']
    }
});
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
;
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
