const helperDeleteProperty = require('./helperDeleteProperty')
const isFunction = require('./isFunction')
const isArray = require('./isArray')
const each = require('./each')
const arrayEach = require('./arrayEach')
const lastEach = require('./lastEach')
const clear = require('./clear')
const eqNull = require('./eqNull')

function pluckProperty (name) {
    return function (obj, key) {
        return key === name
    }
}

/**
 * 移除对象属性
 *
 * @param {Object/Array} obj 对象/数组
 * @param {Function/String} iterate 方法或属性
 * @param {Object} context 上下文
 * @return {Object/Array}
 *
 *
 * let list1 = [11, 22, 33, 44]
 * XEUtils.remove(list1, 2) // list1 = [11, 22, 44]
 * let list2 = [11, 22, 33, 44]
 * remove(list2, item => item === 22) // list2 = [11, 33, 44]
 *
 */

function remove (obj, iterate, context=undefined) {
    if (obj) {
        if (!eqNull(iterate)) {
            const removeKeys = [];
            let rest = [];
            if (!isFunction(iterate)) {
                iterate = pluckProperty(iterate)
            }
            each(obj, function (item, index, rest) {
                if (iterate.call(context, item, index, rest)) {
                    removeKeys.push(index)
                }
            })
            if (isArray(obj)) {
                lastEach(removeKeys, function (item, key) {
                    rest.push(obj[item])
                    obj.splice(item, 1)
                })
            } else {
                rest = {}
                arrayEach(removeKeys, function (key) {
                    rest[key] = obj[key]
                    helperDeleteProperty(obj, key)
                })
            }
            return rest
        }
        return clear(obj)
    }
    return obj
}

module.exports = remove