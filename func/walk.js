const isArray = require('./isArray');
const arrayEach = require('./arrayEach');
const objectEach = require('./objectEach');

/**
 * 迭代器，与each不同的是，如果迭代器返回的数值不是true，则中断迭代并返回该数值
 *
 * @param {Object} obj 对象/数组
 * @param iterate
 * @param {Object} thisArg 上下文
 * @return {Object}
 */
function walk (obj, iterate, thisArg= undefined) {
    if (obj) {
        return (isArray(obj) ? arrayEach : objectEach)(obj, iterate,true, thisArg)
    }
    return obj
}

module.exports = each