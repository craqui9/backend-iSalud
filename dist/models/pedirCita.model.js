"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedirCita = void 0;
const mongoose_1 = require("mongoose");
const pedirCitaSchema = new mongoose_1.Schema({
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
    }
});
exports.PedirCita = mongoose_1.model('PedirCita', pedirCitaSchema);
