const staticStrUndefined = require('./staticStrUndefined');

const helperCreateInTypeOf = require('./helperCreateInTypeOf');

/**
 * 判断是否Undefined
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
const isUndefined = helperCreateInTypeOf(staticStrUndefined);

module.exports = isUndefined