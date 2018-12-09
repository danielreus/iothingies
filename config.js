const extend = require('extend');
let overrides;
try {
	overrides = require('./config-overrides');
} catch(e) {
	overrides = {};
}

module.exports = extend({
	brokerUrl: 'amqp://iothingies:ztBgSMtu5@broker.mythingy.net',
}, overrides);