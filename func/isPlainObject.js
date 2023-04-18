/**
 * 判断是否对象
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 *
 *  isPlainObject(null) // false
 *  isPlainObject([]) // false
 *  isPlainObject(123) // false
 *  isPlainObject({}) // true
 */
function isPlainObject (obj) {
    return obj ? obj.constructor === Object : false
}

module.exports = isPlainObject