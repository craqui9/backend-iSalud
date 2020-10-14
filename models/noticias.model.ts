import {Schema, model, Document} from 'mongoose';

const noticiasSchema = new Schema({

    titulo: {
        type: String,
        required: [true, 'Titulo necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion necesaria']
    }

});

interface Inoticias extends Document{

    titulo: String;
    descripcion: String;

}

export const Noticias = model<Inoticias>('Noticias', noticiasSchema);