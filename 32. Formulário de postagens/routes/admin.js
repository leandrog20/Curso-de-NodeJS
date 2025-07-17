import express from 'express';
const router = express.Router();
import Categoria from '../models/Categoria.js';

router.get('/', (req, res) => {
    res.render('admin/index');
})

router.get('/posts', (req, res) => {
    res.send('Pagina de Posts');
})

router.get('/categorias', (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias});
    }).catch(() => {
        res.flash('error_msg', 'Houve um erro ao listar as categorias!');
        res.redirect('/admin');
    })
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
});

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria});
    }).catch((err) => {
        req.flash('error_msg', 'Esta categoria não existe!');
        res.redirect('/admin/categorias');
    })
    
})

router.post('/categorias/edit', (req, res) => {
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
        res.render('admin/editcategorias', {errors: errors, categoria: req.body});
    }else{
        Categoria.findOne({_id: req.body._id}).then((categoria) => {
            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso!');
                res.redirect('/admin/categorias');
            }).catch(() => {
                req.flash('error_msg', 'Houve um erro ao salvar a edição da categoria, tente novamente!');
                res.redirect('/admin/categorias');
            })
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao editar a categoria, tente novamente!');
            res.redirect('/admin/categorias');
        });
    }
})

router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!');
        res.redirect('/admin/categorias');
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao deletar a categoria, tente novamente!');
        res.redirect('/admin/categorias');
    })
});

router.get('/postagens', (req, res) => {
    res.render('admin/postagens');
});

router.get('/postagens/add', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('admin/addpostagens', {categorias: categorias});
    })
   
})

export default router;