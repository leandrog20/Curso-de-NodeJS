import express from 'express';
import { Sequelize } from 'sequelize';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Post from './models/Post.js';
const app = express();

// config
   // Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}}))
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Rotas
app.get('/', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', { posts: posts });
    }).catch((err) => {
        res.send(`Houve um erro ao listar os posts: ${err}`);
    });
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

app.get('/deletar/:id', (req, res) =>{
    Post.destroy({ where: {'id': req.params.id}}).then(() => {
        res.redirect('/');
    }).catch((err) => {
        res.send(`Houve um erro ao deletar o post: ${err}`);
    })
})

app.listen(6500, () =>{
    console.log('Servidor rodando na porta 6500');
})