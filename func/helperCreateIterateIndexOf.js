const isFunction = require('./isFunction');
const isString = require('./isString')
const isArray = require('./isArray')
const hasOwnProp = require('./hasOwnProp')

function helperCreateIterateIndexOf (callback) {
    return function (obj, iterate, context) {
        if (obj && isFunction(iterate)) {
            if (isArray(obj) || isString(obj)) {
                return callback(obj, iterate, context)
            }
            for (const key in obj) {
                if (hasOwnProp(obj, key)) {
                    if (iterate.call(context, obj[key], key, obj)) {
                        return key
                    }
                }
            }
        }
        return -1
    }
}

module.exports = helperCreateIterateIndexOf