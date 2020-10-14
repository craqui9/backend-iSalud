import { Router, Request, Response } from "express";
import { Citas } from '../models/citas.model';

const citasRoutes = Router();

//Crear una Cita
citasRoutes.post('/create', (req: Request, res: Response) => {

    const cita = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        fecha: req.body.fecha,
        resuelto: req.body.resuelto
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



export default citasRoutes;