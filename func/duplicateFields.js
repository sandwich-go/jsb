const pathGet = require("./pathGet");
const find = require("./find");

/**
 * 迭代器
 *
 * @param {array} arr 数组
 * @param {fieldPath} 要检查的字段path，返回重复的key列表
 * @param {Object} thisArg 上下文
 * @return {array} 重复的字段值，如为空则返回空数组
 */
function duplicateFields (arr, fieldPath, thisArg= undefined) {
    const keys = new Set();
    const duplicateFieldVal = []
    for (let i = 0; i < arr.length; i++) {
        const fieldVal = pathGet(arr[i],fieldPath);
        if (keys.has(fieldVal) && !find(duplicateFieldVal,v=>v === fieldVal)) {
            duplicateFieldVal.push(fieldVal)
        }
    }
    return duplicateFieldVal;
}

module.exports = duplicateFields