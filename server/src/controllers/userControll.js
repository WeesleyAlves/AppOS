const mongoose = require('mongoose');

const users = mongoose.model('User');

module.exports = {
    async index (req, res) {
        const user = await users.find();

        return res.json(user);
    },    
    async create (req, res) {
        const user = await users.create(req.body);

        return res.json(user);
    },
    async update (req, res) {
        const user = await users.findByIdAndUpdate(req.params.id, req.body, { new: true});

        return res.json(user);
    },
    async destroy(req, res) {
        await users.findOneAndDelete(req.params.id);

        return res.send("Usuario Deletado");
    },
    async show (req, res) {
        const user = await users.find({ user : req.params.id });

        return res.json(user[0]);
    },
};

