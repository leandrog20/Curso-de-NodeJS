import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
})

export default mongoose.model("usuarios", usuarioSchema);