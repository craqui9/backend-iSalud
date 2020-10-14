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
const noticias_model_1 = require("../models/noticias.model");
const noticiasRoutes = express_1.Router();
//Crear una Noticia
noticiasRoutes.post('/create', (req, res) => {
    const noticia = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    };
    noticias_model_1.Noticias.create(noticia).then(noticiaDB => {
        res.json({
            ok: true,
            noticia: noticiaDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Listar noticias
noticiasRoutes.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticias = yield noticias_model_1.Noticias.find();
    res.json({
        ok: true,
        noticias
    });
}));
exports.default = noticiasRoutes;
