import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//Rutas de la app
import userRoutes from './routes/usuario';
import citasRoutes from './routes/citas';


const server = new Server();

//------------------------Body parser------------------------
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//-------------------------------------------------------------------------------------------

//------------------------Rutas de mi app------------------------
//Usuario
server.app.use('/user', userRoutes);

//Citas
server.app.use('/citas', citasRoutes);

//Tratamientos
//server.app.use('/tratamientos', tratamientosRoutes);

//Noticias
//server.app.use('/noticias', noticiasRoutes);

//-------------------------------------------------------------------------------------------
//------------------------Conectar BBDD------------------------
mongoose.connect('mongodb://localhost:27017/iSalud', 
                {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
                    if(err) throw err;

                    console.log('Base de datos online');
                    
                });

//-------------------------------------------------------------------------------------------                
//------------------------Levantar express------------------------
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);    
});

//-------------------------------------------------------------------------------------------