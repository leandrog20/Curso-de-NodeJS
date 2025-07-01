import express from 'express';
import { engine } from 'express-handlebars';
import { Sequelize } from 'sequelize';

const app = express();

//config
   //Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Conexão com o banco de dados
const sequelize = new Sequelize('teste', 'root', '11022003', {
    host: 'localhost',
    dialect: 'mysql'
})

// Rotas
app.get('/cad', (req, res) =>{
    res.render('formulario');    
})

app.listen(6500, () => {
    console.log("Servidor rodando na URL \x1b[32mhttp://localhost:6500\x1b[0m");
})