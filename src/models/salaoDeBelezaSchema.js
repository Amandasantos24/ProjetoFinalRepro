const mongoose = require("mongoose");

const salaoDeBelezaSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId, 
    nome: {
         type: String,
         required: true
         },
    CNPJ: {
        type: String,
        required: true
    },
    endereço: {
        type: String,  
        required: true
    },
    estado: {
        type: String,
        uppercase: true,
        required: true
    },
    cidade: {
        type: String,
        uppercase: true,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
    },
    CEP: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tem_parceria_com_hospital: {
        type: Boolean,
        required: true
    },
    tem_parceria_com_ong: {
        type: Boolean,
        required: true
    },
    nome_hospital: {
        type: String,
        required: true
    },
    nome_ong: {
        type: String,
        required: true
    },
    termos_de_uso: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })





module.exports = mongoose.model("salaoDeBeleza", salaoDeBelezaSchema)
