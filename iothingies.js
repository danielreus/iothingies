"use strict";
const amqplib = require('amqplib');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const log = {
	w: console.warn,
	e: console.error,
	d: console.log,
};

log.d('brokerUrl: ' + config.brokerUrl);

const app = express();
app.use(bodyParser.raw({type: '*/*'}));

const amqp = amqplib.connect(config.brokerUrl);
let amqpChannel;
const port = 3000;

// Publisher
amqp.then((conn) => {
	return conn.createChannel();
}).then((channel) => {
	amqpChannel = channel;
}).catch(console.warn);


app.post('/iothingies/command', (req, res) => {
	amqpChannel.publish('amq.topic', 'ztBgSMtu5.curtain', req.body, log.d);
	log.d(req.body.toString());
	res.send();
	return;
});

app.listen(port, () => console.log(`iothingies listening on port ${port}!`));