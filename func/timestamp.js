const now = require('./now');
/**
 * 获取当前时间戳，单位 s
 * @returns Number
 */
const timestamp = function () {
    return Number(now()/1000)
};

module.exports = timestamp