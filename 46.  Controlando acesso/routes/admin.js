import express from 'express';
const router = express.Router();
import Categoria from '../models/Categoria.js';
import Postagem from '../models/Postagem.js';
import { eAdmin } from '../helpers/eAdmin.js'

router.get('/', eAdmin, (req, res) => {
    res.render('admin/index');
})

router.get('/posts', eAdmin, (req, res) => {
    res.send('Pagina de Posts');
})

router.get('/categorias', eAdmin, (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias});
    }).catch(() => {
        res.flash('error_msg', 'Houve um erro ao listar as categorias!');
        res.redirect('/admin');
    })
})

router.get('/categorias/add', eAdmin, (req, res) => {
    res.render('admin/addcategorias');
})

router.post('/categorias/nova', eAdmin, (req, res) => {
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

router.get('/categorias/edit/:id', eAdmin, (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria});
    }).catch((err) => {
        req.flash('error_msg', 'Esta categoria não existe!');
        res.redirect('/admin/categorias');
    })
    
})

router.post('/categorias/edit', eAdmin, (req, res) => {
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

router.post('/categorias/deletar', eAdmin, (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!');
        res.redirect('/admin/categorias');
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao deletar a categoria, tente novamente!');
        res.redirect('/admin/categorias');
    })
});

router.get('/postagens', eAdmin, (req, res) => {
    Postagem.find().populate('categoria').sort({data: 'desc'}).then((postagens) => {
        res.render('admin/postagens', {postagens: postagens})
    })
});

router.get('/postagens/add', eAdmin, (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('admin/addpostagens', {categorias: categorias});
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulário!');
        res.redirect('/admin/postagens');
    })
   
})

router.post('/postagens/nova', eAdmin, (req, res) => {
    const errors = [];

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({texto: 'Título inválido!'});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        errors.push({texto: 'Slug inválido!'});
    }

    if(!req.body.categoria || req.body.categoria == '0'){
        errors.push({texto: 'Categoria inválida!'});
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        errors.push({texto: 'Conteúdo inválido!'});
    }

    if(req.body.slug.length < 2){
        errors.push({texto: 'Slug muito pequeno!'});   
    }

    if(req.body.titulo.length < 2){
        errors.push({texto: 'Título muito pequeno!'});
    }

    if(errors.length > 0){
        res.render('admin/addpostagens', {errors: errors});
    }else{
        const novaPostagem = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        conteudo: req.body.conteudo,
        categoria: req.body.categoria,
        slug: req.body.slug,
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso!');
            res.redirect('/admin/postagens');
        }).catch(() => {
            req.flash('error_msg', 'Houve um erro ao salvar a postagem, tente novamente!');
            res.redirect('/admin/postagens');
        })
    }
})

router.get('/postagens/edit/:id', eAdmin, (req, res) =>  {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {

        Categoria.find().then((categorias) => {
            res.render('admin/editpostagens', {
                postagem: postagem,
                categorias: categorias
            })
        })
    })
})

router.post('/postagens/edit', eAdmin, (req, res) => {
    const errors = [];

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({texto: 'Título inválido!'});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        errors.push({texto: 'Slug inválido!'});
    }

    if(!req.body.categoria || req.body.categoria == '0'){
        errors.push({texto: 'Categoria inválida!'});
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        errors.push({texto: 'Conteúdo inválido!'});
    }

    if(req.body.slug.length < 2){
        errors.push({texto: 'Slug muito pequeno!'});   
    }

    if(req.body.titulo.length < 2){
        errors.push({texto: 'Título muito pequeno!'});
    }

    if(errors.length > 0){
        res.render('admin/editpostagens', {errors: errors, postagem: req.body});
    }else{
        Postagem.findOne({_id: req.body.id}).then((postagem) => {
            postagem.titulo = req.body.titulo;
            postagem.descricao = req.body.descricao;
            postagem.conteudo = req.body.conteudo;
            postagem.categoria = req.body.categoria;
            postagem.slug = req.body.slug;

            postagem.save().then(() => {
                req.flash('success_msg', 'Postagem editada com sucesso!');
                res.redirect('/admin/postagens');
            }).catch(() => {
                req.flash('error_msg', 'Houve um erro ao salvar a edição da postagem, tente novamente!');
                res.redirect('/admin/postagens');
            })
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao editar a postagem, tente novamente!');
            res.redirect('/admin/postagens');
        });
    }
})

router.get('/postagens/deletar/:id', eAdmin, (req, res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso!');
        res.redirect('/admin/postagens');
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao deletar a postagem, tente novamente!');
        console.log(err);
        res.redirect('/admin/postagens');
    })
})

export default router;