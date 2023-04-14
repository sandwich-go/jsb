const random = require("./random");

/**
 * 获取一个指定范围内随机数
 *
 * @param {Number} mod 取余数
 * @param {Number} maxVal 最大值
 * @param {Number} minVal 最小值
 * @return {Boolean}
 */
function randomModIsZero(mod, maxVal = 100, minVal = 0) {
    return random(minVal, maxVal) % mod === 0
}

module.exports = randomModIsZero