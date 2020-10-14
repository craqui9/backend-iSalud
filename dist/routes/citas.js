"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citas_model_1 = require("../models/citas.model");
const citasRoutes = express_1.Router();
//Crear una Cita
citasRoutes.post('/create', (req, res) => {
    const cita = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        fecha: req.body.fecha,
        resuelto: req.body.resuelto
    };
    citas_model_1.Citas.create(cita).then(citaDB => {
        res.json({
            ok: true,
            cita: citaDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = citasRoutes;
