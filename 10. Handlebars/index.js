import express from 'express';
import { handlebars } from 'express-handlebars';
import { Sequelize } from 'sequelize';

const app = express();

//config
   //Template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Conexão com o banco de dados
const sequelize = new Sequelize('teste', 'root', '11022003', {
    host: 'localhost',
    dialect: 'mysql'
})

app.listen(6500, () => {
    console.log("Servidor rodando na URL \x1b[32mhttp://localhost:6500\x1b[0m");
})