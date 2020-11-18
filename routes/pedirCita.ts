import { Router, Request, Response } from "express";
import { PedirCita } from '../models/pedirCita.model';


const pedirCitaRoutes = Router();

//Crear una Cita
pedirCitaRoutes.post('/create', (req: Request, res: Response) => {

    const cita = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        nombre_paciente: req.body.nombre_paciente,
        fecha: req.body.fecha,
        hora: req.body.hora,
        resuelto: req.body.resuelto,
        motivo: req.body.motivo
    };

    PedirCita.create(cita).then(citaDB => {

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

//Listar todo
pedirCitaRoutes.get('/list', async(req: Request, res: Response) => {

    const citas = await PedirCita.find();

    res.json({
        ok: true,
        citas
    });

});

//Listar citas por doctor
pedirCitaRoutes.post('/doctor', async(req: Request, res: Response) => {

    const doctor = await PedirCita.find({usuario_doctor: req.body.usuario_doctor});

    res.json({
        ok: true,
        doctor
    })

});

//Modificar resuelto a true
pedirCitaRoutes.post('/resuelto', async(req: any, res: Response) => {

    const cita = await PedirCita.findOne({identificador: req.body.identificador});

    const citaActualizada = {
        resuelto: true
    }

    PedirCita.findByIdAndUpdate( cita?._id, citaActualizada, {new: true}, (err, citaDB) => {

        if(err) throw err;

        if(!citaDB){
            return res.json({
                ok: false,
                mensaje: 'No existe la cita con ese id'
            });
        }

        res.json({
            ok: true,
            citaActualizada
        });

    });

});



export default pedirCitaRoutes;