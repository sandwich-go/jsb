const isArray = require('./isArray');
const arrayEach = require('./arrayEach');
const objectEach = require('./objectEach');

/**
 * 迭代器
 *
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, obj) 回调
 * @param {Object} thisArg 上下文
 * @return {Object}
 */
function each (obj, iterate, thisArg= undefined) {
    if (obj) {
        return (isArray(obj) ? arrayEach : objectEach)(obj, iterate, thisArg)
    }
    return obj
}

module.exports = each