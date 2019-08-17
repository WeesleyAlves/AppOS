const mongoose = require("mongoose");

const User = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
});

mongoose.model("User", User);

