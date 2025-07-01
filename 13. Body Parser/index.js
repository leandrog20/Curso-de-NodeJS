import express from 'express';
import { Sequelize } from 'sequelize';
import { engine } from 'express-handlebars';
    import bodyParser from 'body-parser';
const app = express();

// config
   // Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão com o banco de dados
const sequelize = new Sequelize('teste', 'root', '11022003', {
    host: 'localhost',
    dialect: 'mysql'
})

// Rotas
app.get('/cad', (req, res) => {
    res.render('formulario');
})

app.post('/add', (req, res) => {
    req.body.titulo
    res.send(`Titulo: ${req.body.titulo} - Descrição: ${req.body.conteudo}`);
})

app.listen(6500, () =>{
    console.log('Servidor rodando na porta 6500');
})