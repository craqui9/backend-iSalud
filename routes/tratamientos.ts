import { Router, Request, Response } from "express";
import { Tratamientos } from '../models/tratamientos.model';

const tratamientosRoutes = Router();

//Crear un tratamiento
tratamientosRoutes.post('/create', (req: Request, res: Response) => {

    const tratamiento = {
        usuario_paciente: req.body.usuario_paciente,
        usuario_doctor: req.body.usuario_doctor,
        nombre_tratamiento: req.body.nombre_tratamiento,
        descripcion: req.body.descripcion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_final: req.body.fecha_final,
        identificador: req.body.identificador
    };

    Tratamientos.create(tratamiento).then(tratamientoDB => {

        res.json({
            ok: true,
            tratamiento: tratamientoDB
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });

});

//Listar tratamientos
tratamientosRoutes.get('/list', async(req: Request, res: Response) => {

    const tratamientos = await Tratamientos.find();

    res.json({
        ok: true,
        tratamientos
    });

});



export default tratamientosRoutes;