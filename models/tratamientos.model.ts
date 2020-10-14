import {Schema, model, Document} from 'mongoose'

const tratamientosSchema = new Schema ({

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
        type: Date,
        required: [true, 'Fecha inicio necesaria']
    },
    fecha_final: {
        type: Date,
        required: [true, 'Fecha final necesaria']
    }

});

interface Itratamientos extends Document{

    usuario_paciente: String,
    usuario_doctor: String,
    nombre_tratamiento: String,
    descripcion: String,
    fecha_inicio: Date,
    fecha_final: Date

};


export const Tratamientos = model<Itratamientos>('Tratamientos', tratamientosSchema);