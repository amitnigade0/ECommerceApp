
const redis = require('./redisClient');

const getFromCache = async (key) => {
  const data = await redis.get(key);
  return JSON.parse(data); // Redis stores everything as strings, so parse JSON
};

const setToCache = async (key, value, ttl = 3600) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttl); // Set TTL in seconds
};

const clearCache = async (key) => {
  await redis.del(key);
};

module.exports = {
  getFromCache,
  setToCache,
  clearCache,
};
