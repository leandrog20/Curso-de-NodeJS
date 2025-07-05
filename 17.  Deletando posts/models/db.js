import { Sequelize } from "sequelize";

// Conexão com o banco de dados
const sequelize = new Sequelize('postapp', 'root', '11022003', {
    host: 'localhost',
    dialect: 'mysql'
})

export { Sequelize, sequelize };

