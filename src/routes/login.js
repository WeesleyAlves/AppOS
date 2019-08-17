const express = require('express');

const routes = express.Router();

const userControll = require("../controllers/userControll");

routes.get("/:id", userControll.show);

module.exports = routes;