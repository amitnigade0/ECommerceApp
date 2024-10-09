

const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost', // Redis server host
  port: 6379,        // Redis server port
  // You can also add password and other options if needed
});

module.exports = redis;
