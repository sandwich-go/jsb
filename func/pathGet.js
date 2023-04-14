const isVisitable = require("./isVisitable")
const isFunction = require("./isFunction");

// pathGet 根据给定字段路径获取值，只有当值为null或者undefined才使用默认值
// key
//    a.b.c   : 路径字符串用.分割路径
//    [a,b,c] : 路径数组

// 空字符串，0，false，都认为有值
function pathGet(obj,key,defaultVal) {
    if(!obj) {
        return defaultVal
    }
    if(isFunction(key)) {
        return key(obj,defaultVal)
    }
    if (Array.isArray(key)) {
        const lastKey = key.pop();
        for(const keyPart of key) {
            obj = pathGet(obj,keyPart)
        }
        key = lastKey
    }
    // https://stackabuse.com/how-to-check-if-key-exists-in-javascript-object-array/
    // eslint-disable-next-line no-prototype-builtins
    if(isVisitable(obj) && obj.hasOwnProperty(key)) {
        return obj[key]
    }
    let pos = String(key).lastIndexOf(".")
    if(pos !==-1) {
        obj = pathGet(obj,key.substr(0,pos),defaultVal)
        key = key.substr(pos+1)
    }
    // eslint-disable-next-line no-prototype-builtins
    if(isVisitable(obj) && obj.hasOwnProperty(key)){
        return obj[key]
    }
    return defaultVal
}

module.exports = pathGet
