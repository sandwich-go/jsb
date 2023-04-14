const isNumber = require("./isNumber");
const isString = require("./isString");
const eqNull = require("./eqNull");
const isBoolean = require("./isBoolean");
const isArray = require("./isArray");
const isObjectOrMap = require("./isObjectOrMap");

/**
 * 判断是否为空，以下输入都认为为空: 空对象，空数组，数字0，空字符串，null,undefined,false
 *
 * @param {Object | Array | String | Number | Boolean} obj 对象
 * @return {Boolean}
 */
function isEmpty(obj) {
    if (isNumber(obj)) {
        return parseInt(obj) === 0
    }
    if (isString(obj)) {
        return obj === ''
    }
    if (isBoolean(obj)) {
        return obj === false
    }
    if (eqNull(obj)) {
        return true
    }
    if(isArray(obj) || isObjectOrMap(obj)){
        for (const key in obj) {
            return false
        }
        return true
    }
    //未知类型，认为非空
    return false
}

module.exports = isEmpty
