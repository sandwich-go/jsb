const each = require('./each');

/**
 * 根据回调过滤数据
 *
 * jsb.filter([{value: 11}, {value: 22}], item => item.value > 11) // [{value: 22}]
 *
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, obj) 回调
 * @param {Object} context 上下文
 * @return {Object}
 */
function filter (obj, iterate, context=undefined) {
    const result = [];
    if (obj && iterate) {
        if (obj.filter) {
            return obj.filter(iterate, context)
        }
        each(obj, function (val, key) {
            if (iterate.call(context, val, key, obj)) {
                result.push(val)
            }
        })
    }
    return result
}

module.exports = filter