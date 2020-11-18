"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedirCita_model_1 = require("../models/pedirCita.model");
const pedirCitaRoutes = express_1.Router();
//Crear una Cita
pedirCitaRoutes.post('/create', (req, res) => {
    const pedirCitas = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        nombre_paciente: req.body.nombre_paciente,
        fecha: req.body.fecha,
        hora: req.body.hora,
        resuelto: req.body.resuelto,
        motivo: req.body.motivo,
        identificador: req.body.identificador
    };
    pedirCita_model_1.PedirCita.create(pedirCitas).then(pedirCitaDB => {
        res.json({
            ok: true,
            pedirCita: pedirCitaDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Listar todo
pedirCitaRoutes.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedirCitas = yield pedirCita_model_1.PedirCita.find();
    res.json({
        ok: true,
        pedirCitas
    });
}));
//Listar citas por doctor
pedirCitaRoutes.post('/doctor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield pedirCita_model_1.PedirCita.find({ usuario_doctor: req.body.usuario_doctor });
    res.json({
        ok: true,
        doctor
    });
}));
//Modificar resuelto a true
pedirCitaRoutes.post('/resuelto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedirCitas = yield pedirCita_model_1.PedirCita.findOne({ identificador: req.body.identificador });
    const citaActualizada = {
        resuelto: true
    };
    pedirCita_model_1.PedirCita.findByIdAndUpdate(pedirCitas === null || pedirCitas === void 0 ? void 0 : pedirCitas._id, citaActualizada, { new: true }, (err, citaDB) => {
        if (err)
            throw err;
        if (!citaDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe la cita con ese id'
            });
        }
        res.json({
            ok: true,
            citaActualizada
        });
    });
}));
exports.default = pedirCitaRoutes;
