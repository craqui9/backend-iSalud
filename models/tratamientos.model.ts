import {Schema, model, Document} from 'mongoose'

const tratamientosSchema = new Schema ({

    usuario_paciente: {
        //La "clave primaria" de los usuarios es el dni
        type: String,
        required: [true, 'Paciente necesario']
    },
    usuario_doctor: {
        //La "clave primaria" de los usuarios es el dni
        type: String,
        required: [true, 'Doctor necesario']
    },
    nombre_tratamiento: {
        //nombre de la medicacion (paracetamol)
        type: String,
        required: [true, 'Nombre del tratamiento necesario']
    },
    descripcion: {
        //descripcion del tratamiento (aplicar en la zona dañada cada 8h)
        type: String,
        required: [true, 'Descripcion necesaria']
    },
    fecha_inicio: {
        type: String,
        required: [true, 'Fecha inicio necesaria']
    },
    fecha_final: {
        type: String,
        required: [true, 'Fecha final necesaria']
    },
    identificador: {
        type: Number,
        required: [true, 'Id necesario']
    },
    resuelto: {
        type: Boolean,
        default: false
    }

});

interface Itratamientos extends Document{

    usuario_paciente: String;
    usuario_doctor: String;
    nombre_tratamiento: String;
    descripcion: String;
    fecha_inicio: String;
    fecha_final: String;
    identificador: Number;
    resuelto: Boolean;

};


export const Tratamientos = model<Itratamientos>('Tratamientos', tratamientosSchema);