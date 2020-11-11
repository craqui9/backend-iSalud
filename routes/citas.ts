import { Router, Request, Response } from "express";
import { Citas } from '../models/citas.model';

const citasRoutes = Router();

//Crear una Cita
citasRoutes.post('/create', (req: Request, res: Response) => {

    const cita = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
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



export default citasRoutes;