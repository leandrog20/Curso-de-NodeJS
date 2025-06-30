import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("Seja bem-vindo ao meu servidor Express!");
})

app.get("/sobre", (req, res) => {
    res.send("Esta é a página sobre do meu servidor Express!");
})

app.get("/contato", (req, res) => {
    res.send("Esta é a página de contato do meu servidor Express!");
})

app.get("/ola/:cargo/:nome", (req, res) =>{
    res.send(`Olá ${req.params.nome}, seu cargo é ${req.params.cargo}!`);
})

app.listen(6500, () => {
    console.log("Servidor rodando na URL \x1b[32mhttp://localhost:6500\x1b[0m");
})