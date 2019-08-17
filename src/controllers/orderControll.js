const mongoose = require('mongoose');

const orders = mongoose.model("ServiceOrder");

module.exports = {
    async index (req, res) {
        const order = await orders.find();

        return res.json(order);
    },
    async show (req, res) {
        const order = await orders.findById(req.params.id);

        return res.json(order);
    },
    async create (req, res) {
        const order = await orders.create(req.body);

        return res.json(order);
    },
    async update (req, res) {
        const order = await orders.findByIdAndUpdate(req.params.id, req.body, { new : true});

        return res.json(order);
    },
    async destroy (req, res) {
        await orders.findByIdAndDelete(req.params.id);

        return res.send("Ordem de Serviço Deletada!");
    },
};