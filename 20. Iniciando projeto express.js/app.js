// Carregando módulos necessários
    import express from 'express';
    import engine from 'express-handlebars';
    import bodyParser from 'body-parser';
    //import mongoose from 'mongoose';
    const app = express();
// Configurações
    // Body Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', engine({ defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }}));

    // Mongoose
       // Em breve
// Rotas

// Outros

const PORT = 6500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
