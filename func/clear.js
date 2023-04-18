const helperDeleteProperty = require('./helperDeleteProperty')
const isPlainObject = require('./isPlainObject')
const isObject = require('./isObject')
const isArray = require('./isArray')
const isNull = require('./isNull')
const assign = require('./assign')
const objectEach = require('./objectEach')

/**
 * 清空对象
 *
 * @param {Object} obj 对象
 * @param {*} defs 默认值,如果不传（清空所有属性）、如果传对象（清空并继承)、如果传值(给所有赋值)
 * @param {Object/Array} assigns 默认值
 * @return {Object}
 *
 * let a = [11, 22, 33, 33]
 * clear(a) // []
 * clear(a, undefined) // [undefined, undefined, undefined, undefined]
 * clear(a, null) // [null, null, null, null]
 *
 *  let b = {b1: 11, b2: 22}
 * clear(b) // {}
 * clear(b, undefined) // {b1: undefined, b2: undefined}
 * clear(b, null) // {b1: null, b2: null}
 */


function clear (obj, defs, assigns) {
    if (obj) {
        let len;
        const isDefs = arguments.length > 1 && (isNull(defs) || !isObject(defs));
        const extds = isDefs ? assigns : defs;
        if (isPlainObject(obj)) {
            objectEach(obj, isDefs ? function (val, key) {
                obj[key] = defs
            } : function (val, key) {
                helperDeleteProperty(obj, key)
            })
            if (extds) {
                assign(obj, extds)
            }
        } else if (isArray(obj)) {
            if (isDefs) {
                len = obj.length
                while (len > 0) {
                    len--
                    obj[len] = defs
                }
            } else {
                obj.length = 0
            }
            if (extds) {
                obj.push.apply(obj, extds)
            }
        }
    }
    return obj
}

module.exports = clear