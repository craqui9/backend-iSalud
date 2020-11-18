"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//Rutas de la app
const usuario_1 = __importDefault(require("./routes/usuario"));
const citas_1 = __importDefault(require("./routes/citas"));
const tratamientos_1 = __importDefault(require("./routes/tratamientos"));
const noticias_1 = __importDefault(require("./routes/noticias"));
const pedirCita_1 = __importDefault(require("./routes/pedirCita"));
const server = new server_1.default();
//------------------------Body parser------------------------
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//-------------------------------------------------------------------------------------------
//------------------------Configurar CORS------------------------
server.app.use(cors_1.default({ origin: true, credentials: true }));
//-------------------------------------------------------------------------------------------
//------------------------Rutas de mi app------------------------
//Usuario
server.app.use('/user', usuario_1.default);
//Citas
server.app.use('/citas', citas_1.default);
//Tratamientos
server.app.use('/tratamientos', tratamientos_1.default);
//Noticias
server.app.use('/noticias', noticias_1.default);
//Pedir Cita
server.app.use('/pedirCita', pedirCita_1.default);
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
