const isNull = require('./isNull');
const isUndefined = require('./isUndefined');

/**
 * 判断是否 undefined 和 null
 * @param {Object} obj 对象
 * @return {Boolean}
 */
function eqNull (obj) {
    return isNull(obj) || isUndefined(obj)
}

module.exports = eqNull