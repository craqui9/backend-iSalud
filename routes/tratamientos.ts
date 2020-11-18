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
        identificador: req.body.identificador,
        resuelto: req.body.resuelto
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

//Listar tratamientos por paciente
tratamientosRoutes.post('/paciente', async(req: Request, res: Response) => {

    const tratamientos = await Tratamientos.find({usuario_paciente: req.body.usuario_paciente});

    res.json({
        ok: true,
        tratamientos
    });

});

//Modificar resuelto a true
tratamientosRoutes.post('/resuelto', async(req: any, res: Response) => {

    const tratamiento = await Tratamientos.findOne({identificador: req.body.identificador});

    const tratamientoActualizado = {
        resuelto: true
    }

    Tratamientos.findByIdAndUpdate(tratamiento?._id, tratamientoActualizado, {new: true}, (err, tratamientoDB) => {

        if(err) throw err;

        if(!tratamientoDB){
            return res.json({
                ok: false,
                mensaje: 'No existe el tratamiento con ese id'
            })
        }

        res.json({
            ok: true,
            tratamientoActualizado
        });

    });

});



export default tratamientosRoutes;