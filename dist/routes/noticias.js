"use strict";
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
exports.default = noticiasRoutes;
