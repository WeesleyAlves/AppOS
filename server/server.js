const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();

app.use(express.json());

mongoose.connect(
    'mongodb://localhost:27017/AppOS',
    { useNewUrlParser: true }
);

requireDir("./src/models");

const user = mongoose.model("User");
const serviceOrder = mongoose.model("ServiceOrder");

app.use("/admin", require("./src/routes/admin"));

app.use(cors());

app.listen(3001);