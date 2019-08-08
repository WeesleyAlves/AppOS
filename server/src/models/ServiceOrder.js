const mongoose = require('mongoose');

const ServiceOrder = new mongoose.Schema({
    nomeCliente: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: false
    },
    comodato: {
        type: String,
        required: false
    },
    ipAntena: {
        type: String,
        required: false
    },
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: false
    },
    plano: {
        type: String,
        required: true
    },
    statusCliente: {
        type: String,
        required: true
    },
    responsavel: {
        type: String,
        required: false
    },
    criador: {
        type: String,
        required: true
    },
    statusOS: {
        type: String,
        required: true
    },
    solucao: {
        type: String,
        required: false
    },
    materialUtilizado: {
        type: String,
        required: false
    },    
    createdAt: {
        type: Date,
        default: Date.now
    },
    finalizada: {
        type: Date,
        required: false
    }
});

mongoose.model("ServiceOrder", ServiceOrder);