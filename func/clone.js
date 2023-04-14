const objectToString = Object.prototype.toString

const objectEach = require('./objectEach')
const arrayEach = require('./arrayEach')

function getCativeCtor (val, args) {
    const Ctor = val.__proto__.constructor;
    return args ? new Ctor(args) : new Ctor()
}

function handleValueClone (item, isDeep) {
    return isDeep ? copyValue(item, isDeep) : item
}

function copyValue (val, isDeep) {
    if (val) {
        switch(objectToString.call(val)) {
            case "[object Object]": {
                const restObj = Object.create(val.__proto__);
                objectEach(val, function (item, key) {
                    restObj[key] = handleValueClone(item, isDeep)
                })
                return restObj
            }
            case "[object Date]":
            case "[object RegExp]": {
                return getCativeCtor(val, val.valueOf())
            }
            case "[object Array]":
            case "[object Arguments]":  {
                const restArr = [];
                arrayEach(val, function (item) {
                    restArr.push(handleValueClone(item, isDeep))
                })
                return restArr
            }
            case "[object Set]": {
                var restSet = getCativeCtor(val)
                restSet.forEach(function (item) {
                    restSet.add(handleValueClone(item, isDeep))
                })
                return restSet
            }
            case "[object Map]": {
                const restMap = getCativeCtor(val);
                restMap.forEach(function (item) {
                    restMap.set(handleValueClone(item, isDeep))
                })
                return restMap
            }
        }
    }
    return val
}

/**
 * 浅拷贝/深拷贝
 *
 * @param {Object} obj 对象/数组
 * @param {Boolean} deep 是否深拷贝
 * @return {Object}
 */
function clone (obj, deep=true) {
    if (obj) {
        return copyValue(obj, deep)
    }
    return obj
}

module.exports = clone