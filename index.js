const Redis = require('ioredis');
const host = "127.0.0.1";
const port = 6379;
const client = new Redis(port, host, {
	reconnectOnError: err => true,
	// retryStrategy is a function that will be called when the connection is lost
	// The argument times means this is the nth reconnection being made
	// the return value represents how long (in ms) to wait to reconnect
	retryStrategy: times => {
		console.log(`redis reconnection attempt ${ times }`);
		return 2000;
	}
});
const status = () => {
	console.log(`connection status: ${ client.status }`);
};

client
	.on('connect', () => {
		console.log('redis connected');
		status();
	})
	.on('ready', () => {
		console.log('redis is ready')
		status();
	})
	.on('error', err => {
		console.log(`redis error message: ${ err.message }`)
		status();
	})
	.on('close', () => {
		console.log('redis connection closed')
		status();
	})
	.on('reconnecting', ms => {
		console.log(`redis reconnecting in ${ ms }ms`)
		status();
	})
	.on('end', () => {
		console.log('redis reconnection attempts over')
		status();
	});
