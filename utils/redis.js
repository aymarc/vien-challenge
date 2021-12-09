import redis from "redis";


//Configure redis client
const Redis= redis.createClient({
    host: process.env.REDIS_HOST || "6379",
    port: process.env.REDIS_PORT || "127.0.0.1"
})

Redis.on('connect',  () => {
    console.log('===========Connected to redis successfully============\n');
}).on('error',  (err) => {
    console.log('Could not establish a connection with redis. ' + err);
});

export function setRedis(key, data) {
    return new Promise((ful, rej) => {
      if (typeof data === 'object') data = JSON.stringify(data);
      if (typeof key === 'object') key = key.toString();
      Redis.set(key, data, err => {
        if (err) rej(err);
        ful(true);
      });
    });
  }
  
  export function setRedisEx(key, duration, data) {
    return new Promise((ful, rej) => {
      if (typeof data === 'object') data = JSON.stringify(data);
      if (typeof key === 'object') key = key.toString();
      Redis.setex(key, duration, data, err => {
        if (err) rej(err);
        ful(true);
      });
    });
  }
  
  export function getRedis(key, parse = false) {
    return new Promise((ful, rej) => {
      if (typeof key === 'object') key = key.toString();
      Redis.get(key, (err, data) => {
        if (err) rej(err);
  
        return parse ? ful(JSON.parse(data)) : ful(data);
      });
    });
  }
  
  export function delRedis(key) {
    if (!key) return false;
    return new Promise((ful, rej) => {
      if (typeof key === 'object') key = key.toString();
      Redis.del(key, err => {
        if (err) rej(err);
  
        return ful(true);
      });
    });
  }
  
  export default Redis;