
import * as http from "node:http";
http.createServer( (req, res) =>{
    res.end("ola!")
}).listen(5000)

console.log("Servidor rodando na porta 5000")