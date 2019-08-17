const express = require('express');

const routes = express.Router();

const userControll = require("../controllers/userControll");
const orderControll = require("../controllers/orderControll");

routes.get("/user/:id", userControll.show);
routes.get("/allusers", userControll.index);
routes.post("/user", userControll.create);
routes.put("/user/:id", userControll.update);
routes.delete("/user/:id", userControll.destroy);

routes.get("/order/:id", orderControll.show);
routes.get("/order", orderControll.index);
routes.post("/order", orderControll.create);
routes.put("/order/:id", orderControll.update);
routes.delete("/order/:id", orderControll.destroy);

module.exports = routes;