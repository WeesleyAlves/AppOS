const express = require('express');

const routes = express.Router();

const userControll = require("../controllers/userControll");

routes.get("/user/:id", userControll.show);
routes.get("/allusers", userControll.index);
routes.post("/user", userControll.create);
routes.put("/user/:id", userControll.update);
routes.delete("/user/:id", userControll.destroy);

module.exports = routes;