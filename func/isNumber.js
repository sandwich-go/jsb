const helperCreateInTypeOf = require('./helperCreateInTypeOf');

/**
 * 判断是否Number对象
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
const isNumber = helperCreateInTypeOf('number');

module.exports = isNumber