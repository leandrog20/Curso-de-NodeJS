import { Sequelize } from "sequelize";

const sequelize = new Sequelize("teste", "root", "11022003", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then( () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
}).catch( (err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
})