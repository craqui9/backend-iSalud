import { Router, Request, Response } from "express";
import { Citas } from '../models/citas.model';

const citasRoutes = Router();

//Crear una Cita
citasRoutes.post('/create', (req: Request, res: Response) => {

    const cita = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        nombre_paciente: req.body.nombre_paciente,
        fecha: req.body.fecha,
        hora: req.body.hora,
        resuelto: req.body.resuelto,
        motivo: req.body.motivo,
        identificador: req.body.identificador
    };

    Citas.create(cita).then(citaDB => {

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
citasRoutes.get('/list', async(req: Request, res: Response) => {

    const citas = await Citas.find();

    res.json({
        ok: true,
        citas
    });

});

//Listar citas por doctor
citasRoutes.post('/doctor', async(req: Request, res: Response) => {

    const doctor = await Citas.find({usuario_doctor: req.body.usuario_doctor});

    res.json({
        ok: true,
        doctor
    })

});

//Listar citas por paciente
citasRoutes.post('/paciente', async(req: Request, res: Response) => {

    const paciente = await Citas.find({usuario_paciente: req.body.usuario_paciente});

    res.json({
        ok: true,
        paciente
    })

});

//Modificar resuelto a true
citasRoutes.post('/resuelto', async(req: any, res: Response) => {

    const cita = await Citas.findOne({identificador: req.body.identificador});

    const citaActualizada = {
        resuelto: true
    }

    Citas.findByIdAndUpdate( cita?._id, citaActualizada, {new: true}, (err, citaDB) => {

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

//Modificar resuelto a false
citasRoutes.post('/resueltoFalse', async(req: any, res: Response) => {

    const cita = await Citas.findOne({identificador: req.body.identificador});

    const citaActualizada = {
        resuelto: false
    }

    Citas.findByIdAndUpdate( cita?._id, citaActualizada, {new: true}, (err, citaDB) => {

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

    })

});



export default citasRoutes;