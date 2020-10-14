"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tratamientos_model_1 = require("../models/tratamientos.model");
const tratamientosRoutes = express_1.Router();
//Crear un tratamiento
tratamientosRoutes.post('/create', (req, res) => {
    const tratamiento = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        nombre_tratamiento: req.body.nombre_tratamiento,
        descripcion: req.body.descripcion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_final: req.body.fecha_final
    };
    tratamientos_model_1.Tratamientos.create(tratamiento).then(tratamientoDB => {
        res.json({
            ok: true,
            tratamiento: tratamientoDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = tratamientosRoutes;
