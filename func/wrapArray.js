const isArray = require("./isArray");

/**
 * 如果不是数组则将其包装为一个数组
 *
 * @param {Array|String|Boolean|Object|Number} data 待转换的元素
 * @return {Array}
 */
function wrapArray (data) {
    if(isArray(data)){
        return data
    }
    return [data]
}

module.exports = wrapArray