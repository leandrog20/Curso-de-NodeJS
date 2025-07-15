import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Categoria from '../models/Categoria.js';

router.get('/', (req, res) => {
    res.render('admin/index');
})

router.get('/posts', (req, res) => {
    res.send('Pagina de Posts');
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias');
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias');
})

router.post('/categorias/nova', (req, res) => {
    const errors = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        errors.push({texto: 'Nome inválido!'});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        errors.push({texto: 'Slug inválido!'});
    }

    if(req.body.nome.length < 2){
        errors.push({texto: 'Nome muito pequeno!'});
    }

    if(errors.length > 0){
        res.render('admin/addcategorias', {errors: errors});
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!');
            res.redirect('/admin/categorias');
        }).catch(() => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!');
            res.redirect('/admin');
        });
    }

    
})

export default router;