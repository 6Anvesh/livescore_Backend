const redisClient=require('../configure/redis');

module.exports = {
    connection: () => {
        return redisClient.connected;
    },
    operations: (key) => {

        const get = () => {
            return redisClient.getAsync(key);
        };
        const set = (field) => {
            return redisClient.setAsync(key, field);
        };
        const increase = () => {
            return redisClient.incrAsync(key);
        };
        const expire = (time) => {
            return redisClient.expireAsync(key, time);
        };
        return { increase, get, set,expire };
    }

};