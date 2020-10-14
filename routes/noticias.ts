import { Router, Request, Response } from "express";
import { Noticias } from '../models/noticias.model';

const noticiasRoutes = Router();

//Crear una Noticia
noticiasRoutes.post('/create', (req: Request, res: Response) => {

    const noticia = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    };

    Noticias.create(noticia).then(noticiaDB => {

        res.json({
            ok: true,
            noticia: noticiaDB
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });

});

//Listar noticias
noticiasRoutes.get('/list', async(req: Request, res: Response) => {

    const noticias = await Noticias.find();

    res.json({
        ok: true,
        noticias
    });

});



export default noticiasRoutes;