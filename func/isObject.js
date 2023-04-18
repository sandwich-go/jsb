const helperCreateInTypeOf = require('./helperCreateInTypeOf');

/**
 * 判断是否Object对象
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 *
 *
 *  isObject(null) // true
 *  isObject([]) // true
 *  isObject({}) // true
 *  isObject(123) // false
 *
 */
const isObject = helperCreateInTypeOf('object');

module.exports = isObject
