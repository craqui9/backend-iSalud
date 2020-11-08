"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Citas = void 0;
const mongoose_1 = require("mongoose");
const citasSchema = new mongoose_1.Schema({
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
    motivo: {
        type: String,
        required: [true, 'Motivo necesario']
    },
    identificador: {
        type: Number,
        required: [true, 'Id necesario']
    }
});
exports.Citas = mongoose_1.model('Citas', citasSchema);
