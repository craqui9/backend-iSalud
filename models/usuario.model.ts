import {Schema, model, Document} from 'mongoose'

const usuarioSchema = new Schema({

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

interface Iusuario extends Document{

    rol: string;
    nombre: string;
    email: string;
    password: string;

}


export const Usuario = model<Iusuario>('Usuario', usuarioSchema);