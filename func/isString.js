const helperCreateInTypeOf = require('./helperCreateInTypeOf');

/**
 * 判断是否String对象
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
const isString = helperCreateInTypeOf('string');

module.exports = isString