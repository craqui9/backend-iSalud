"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
//------------------------Body parser------------------------
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//-------------------------------------------------------------------------------------------
//------------------------Rutas de mi app------------------------
//Usuario
server.app.use('/user', usuario_1.default);
//Citas
//server.app.use('/citas', citasRoutes);
//Tratamientos
//server.app.use('/tratamientos', tratamientosRoutes);
//Noticias
//server.app.use('/noticias', noticiasRoutes);
//-------------------------------------------------------------------------------------------
//------------------------Conectar BBDD------------------------
mongoose_1.default.connect('mongodb://localhost:27017/iSalud', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos online');
});
//-------------------------------------------------------------------------------------------                
//------------------------Levantar express------------------------
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
//-------------------------------------------------------------------------------------------
