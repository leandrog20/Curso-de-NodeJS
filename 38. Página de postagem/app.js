// Carregando módulos necessários
    import express from 'express';
    import { engine } from 'express-handlebars';
    import bodyParser from 'body-parser';
    import mongoose from 'mongoose';
    import admin from './routes/admin.js';
    import path from 'path';
    import { fileURLToPath } from 'url';
    import session from 'express-session';
    import flash from 'connect-flash';
    import Postagem from './models/Postagem.js';

    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

// Configurações
    // Sessão
    app.use(session({
        secret: 'cursodenode',
        resave: true,
        saveUninitialized: true
    }));

    app.use(flash());

    // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next();
    })

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
    Postagem.find().populate('categoria').sort({ data: 'desc'}).then((postagens) => {
        res.render('index', {
            postagens: postagens
        });
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao carregar as postagens');
        res.redirect('/404');
    }) 
});

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug}).then((postagem) => {
        if(postagem) {
            res.render('postagem/index', {
                postagem: postagem
            })
        } else {
            req.flash('error_msg', 'Esta postagem não existe');
            res.redirect('/');
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno');
        res.redirect('/');
    })
})

app.get('/404', (req, res) => {
    res.send('Erro 404!');
});

app.use('/admin', admin);

// Outros

const PORT = 6500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
