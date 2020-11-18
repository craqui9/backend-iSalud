import {Schema, model, Document} from 'mongoose';

const pedirCitaSchema = new Schema({

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
    nombre_paciente: {
        type: String,
        required: [true, 'Nombre necesario']
    },
    fecha: {
        type: String,
        required: [true, 'Fecha necesaria']
    },
    hora: {
        type: String,
        required: [true, 'Hora necesaria']
    },
    resuelto: {
        //Aquí se define si se ha resuelto la consulta o no
        type: Boolean,
        default: false
    },
    motivo: {
        type: String,
        required: [true, 'Motivo necesario']
    },
    identificador: {
        type: Number,
        required: [true, 'Id necesario']
    }

});

interface IPedirCita extends Document{
    
    usuario_paciente: string;
    usuario_doctor: string;
    nombre_paciente: string;
    fecha: string;
    hora: string;
    resuelto: boolean;
    motivo: string;
    identificador: number;

}

export const PedirCita = model<IPedirCita>('PedirCita', pedirCitaSchema)