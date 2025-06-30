import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('teste', 'root', '11022003', {
    host: 'localhost',
    dialect: 'mysql'
})

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Postagem.sync({ force: true }).then(() => {
//     console.log("Tabela de postagens criada com sucesso!");
// }).catch((err) => {
//     console.error("Erro ao criar tabela de postagens:", err);
// });

Postagem.create({
    titulo: "Primeira postagem",
    conteudo: "Conteúdo da primeira postagem"
})

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },

    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

// Usuario.sync({ force: true }).then(() => {
//     console.log("Tabela de usuários criada com sucesso!");
// }).catch((err) => {
//     console.error("Erro ao criar tabela de usuários:", err);
// });

Usuario.create({
    nome: "João",
    sobrenome: "Silva",
    idade: 30,
    email: "teste@cc.com"    
})




