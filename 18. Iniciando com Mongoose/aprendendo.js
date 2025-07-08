import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/aprender-nodejs").then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
});