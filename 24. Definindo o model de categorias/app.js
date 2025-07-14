// Carregando módulos necessários
    import express from 'express';
    import { engine } from 'express-handlebars';
    import bodyParser from 'body-parser';
    import mongoose from 'mongoose';
    import admin from './routes/admin.js';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

// Configurações
    // Body Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', engine({ defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }}));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.connect('mongodb://localhost/blogapp').then(() => {
        console.log('Conectado ao MongoDB');
    
       }).catch((err) => {
        console.log('Erro ao conectar ao MongoDB: ' + err);
       })


    // Public
    app.use(express.static(path.join(__dirname, 'public')));
// Rotas
app.get('/', (req, res) => {
    res.send('Página Inicial');
});
app.use('/admin', admin);

// Outros

const PORT = 6500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
