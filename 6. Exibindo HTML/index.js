import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
})

app.get("/sobre", (req, res) => {
    res.sendFile(__dirname + "/html/sobre.html");
})

app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/html/blog.html");
})

app.get("/ola/:cargo/:nome", (req, res) =>{
    res.send(`Olá ${req.params.nome}, seu cargo é ${req.params.cargo}!`);
})

app.listen(6500, () => {
    console.log("Servidor rodando na URL \x1b[32mhttp://localhost:6500\x1b[0m");
})