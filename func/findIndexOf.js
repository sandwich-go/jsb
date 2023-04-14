var helperCreateIterateIndexOf = require('./helperCreateIterateIndexOf')

/**
 * 返回对象第一个索引值
 *
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, obj) 回调
 * @param {Object} context 上下文
 * @return {Object}
 */
const findIndexOf = helperCreateIterateIndexOf(function (obj, iterate, context) {
    let index = 0, len = obj.length;
    for (; index < len; index++) {
        if (iterate.call(context, obj[index], index, obj)) {
            return index
        }
    }
    return -1
});

module.exports = findIndexOf