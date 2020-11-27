/* server.js - Express server*/
'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

app.use(express.static(__dirname + '/pub'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/pub/examples.html");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));