import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoria = new Schema({
    nome: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categorias', categoria);