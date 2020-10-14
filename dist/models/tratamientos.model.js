"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tratamientos = void 0;
const mongoose_1 = require("mongoose");
const tratamientosSchema = new mongoose_1.Schema({
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
;
exports.Tratamientos = mongoose_1.model('Tratamientos', tratamientosSchema);
