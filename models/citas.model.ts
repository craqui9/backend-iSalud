import {Schema, model, Document} from 'mongoose';

const citasSchema = new Schema({

    usuario_paciente: {
        //La "clave primaria" de los usuarios es el email
        type: String,
        required: [true, 'Paciente necesario']
    },
    usuario_doctor: {
        //La "clave primaria" de los usuarios es el email
        type: String,
        required: [true, 'Doctor necesario']
    },
    fecha: {
        type: Date,
        required: [true, 'Fecha necesaria']
    },
    resuelto: {
        //Aquí se define si se ha resuelto la consulta o no
        type: Boolean,
        default: false
    },

});

interface Icitas extends Document{

    usuario_paciente: String;
    usuario_doctor: String;
    fecha: Date;
    resuelto: Boolean;

}

export const Citas = model<Icitas>('Citas', citasSchema);