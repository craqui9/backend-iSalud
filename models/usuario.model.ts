import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcrypt';

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

usuarioSchema.method('compararPassword', function(password: string = ''): boolean{

if(bcrypt.compareSync(password, this.password)){
    return true;
}else{
    return false;
}

});


interface Iusuario extends Document{

    rol: string;
    nombre: string;
    email: string;
    password: string;

    compararPassword(password: string): boolean;

}


export const Usuario = model<Iusuario>('Usuario', usuarioSchema);