const helperCreateInTypeOf = require('./helperCreateInTypeOf');

/**
 * 判断是否方法
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
const isFunction = helperCreateInTypeOf('function');

module.exports = isFunction