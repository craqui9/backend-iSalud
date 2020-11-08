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
        fecha_final: req.body.fecha_final,
        identificador: req.body.identificador
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
//Listar tratamientos
tratamientosRoutes.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const citas = yield tratamientos_model_1.Tratamientos.find();
    res.json({
        ok: true,
        citas
    });
}));
exports.default = tratamientosRoutes;
