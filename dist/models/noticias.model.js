"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noticias = void 0;
const mongoose_1 = require("mongoose");
const noticiasSchema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, 'Titulo necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion necesaria']
    }
});
exports.Noticias = mongoose_1.model('Noticias', noticiasSchema);
