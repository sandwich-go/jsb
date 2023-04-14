const helperCreateInTypeOf = require('./helperCreateInTypeOf');

/**
 * 判断是否Boolean对象
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
const isBoolean = helperCreateInTypeOf('boolean');

module.exports = isBoolean