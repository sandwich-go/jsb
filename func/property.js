var isNull = require('./isNull')

/**
 * 返回一个获取对象属性的函数
 *
 * @param {String} name 属性名
 * @param {Object} defaultVal 默认值
 */
function property (name, defaultVal=undefined) {
    return function (obj) {
        return isNull(obj) ? defaultVal : obj[name]
    }
}

module.exports = property