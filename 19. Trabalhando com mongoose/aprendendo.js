import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/aprender-nodejs").then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
});

// Model - Usuários
// Definindo o model

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    sobrenome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    idade: {
        type: Number,
        required: true
    }
})

// Collection


const usuario = mongoose.model("usuarios", UsuarioSchema);


new usuario({
    nome: "Paulo",
    sobrenome: "berhan",
    email: "teste@g.com",
    idade: 30
}).save().then(() => {
    console.log("Usuário salvo com sucesso");
}).catch((err) => {
    console.error("Erro ao salvar usuário:", err);
});