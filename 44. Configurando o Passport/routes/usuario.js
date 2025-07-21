import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

router.get('/registro', (req, res) => {
    res.render('usuarios/registro')
})

router.post('/registro', (req, res) => {

    const errors = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ texto: 'Nome inválido' });
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.nome == null){
        errors.push({ texto: 'Email inválido' });
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        errors.push({ texto: 'Senha inválida' });
    } 

    if(req.body.senha.length < 4) {
        errors.push({ texto: 'Senha muito curta, mínima de 4 caracteres' });
    }

    if(req.body.senha != req.body.senha2){
        errors.push({ texto: 'As senhas são diferentes, tente novamente!' });
    }

    if(errors.length > 0){
        res.render('usuarios/registro', { errors: errors });
    }else{
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if(usuario){
                req.flash('error_msg', 'Já existe uma conta com este email, tente outro!');
                res.redirect('/usuarios/registro');
            }else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(novoUsuario.senha, salt);
                novoUsuario.senha = hash;

                novoUsuario.save().then(() => {
                    req.flash('success_msg', 'Usuário registrado com sucesso!');
                    res.redirect('/');
                }).catch((err) => {
                    req.flash('error_msg', 'Houve um erro ao registrar o usuário, tente novamente!');
                    res.redirect('usuarios/registro');
                })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao registrar o usuário, tente novamente!');
            res.redirect('/registro');
        })
    }

})

router.get('/login', (req, res) => {
    res.render('usuarios/login')
})

export default router;