const each = require('./each');

function helperCreateGetObjects (name, getIndex) {
    const proMethod = Object[name];
    return function (obj) {
        const result = [];
        if (obj) {
            if (proMethod) {
                return proMethod(obj)
            }
            each(obj, getIndex > 1 ? function (key) {
                result.push(['' + key, obj[key]])
            } : function () {
                result.push(arguments[getIndex])
            },null)
        }
        return result
    }
}

module.exports = helperCreateGetObjects