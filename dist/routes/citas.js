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
const citas_model_1 = require("../models/citas.model");
const citasRoutes = express_1.Router();
//Crear una Cita
citasRoutes.post('/create', (req, res) => {
    const cita = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        fecha: req.body.fecha,
        resuelto: req.body.resuelto,
        motivo: req.body.motivo,
        identificador: req.body.identificador
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
//Listar todas las citas
citasRoutes.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const citas = yield citas_model_1.Citas.find();
    res.json({
        ok: true,
        citas
    });
}));
exports.default = citasRoutes;
