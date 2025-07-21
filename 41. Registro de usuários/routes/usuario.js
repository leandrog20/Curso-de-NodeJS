import mongoose from "mongoose";
import express from "express";
const router = express.Router();

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
        
    }

})

export default router;