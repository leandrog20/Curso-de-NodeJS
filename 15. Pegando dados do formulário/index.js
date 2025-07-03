import express from 'express';
import { Sequelize } from 'sequelize';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Post from './models/Post.js';
const app = express();

// config
   // Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const sequelize = new Sequelize('teste', 'root', '11022003', {
    host: 'localhost',
    dialect: 'mysql'
})

// Rotas
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/cad', (req, res) => {
    res.render('formulario');
})

app.post('/add', (req, res) => {
   Post.create({
       titulo: req.body.titulo,
       conteudo: req.body.conteudo
   }).then( () =>{
        res.redirect('/')
   }).catch( (err) =>{
        res.send(`Houve um erro: ${err}`)
   })
})

app.listen(6500, () =>{
    console.log('Servidor rodando na porta 6500');
})