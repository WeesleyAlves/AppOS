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

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use(cors());

app.use("/admin", require("./src/routes/admin"));
app.use("/login", require("./src/routes/login"));

app.use(express.static("../client"));




app.listen(3001);