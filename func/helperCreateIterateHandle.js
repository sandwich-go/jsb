const hasOwnProp = require('./hasOwnProp');
const isArray = require('./isArray');

function helperCreateIterateHandle (prop, useArray, restIndex, matchValue, defaultValue) {
    return function (obj, iterate, context=undefined) {
        if (obj && iterate) {
            if (prop && obj[prop]) {
                return obj[prop](iterate, context)
            } else {
                if (useArray && isArray(obj)) {
                    let index = 0, len = obj.length;
                    for (; index < len; index++) {
                        if (!!iterate.call(context, obj[index], index, obj) === matchValue) {
                            return [true, false, index, obj[index]][restIndex]
                        }
                    }
                } else {
                    for (const key in obj) {
                        if (hasOwnProp(obj, key)) {
                            if (!!iterate.call(context, obj[key], key, obj) === matchValue) {
                                return [true, false, key, obj[key]][restIndex]
                            }
                        }
                    }
                }
            }
        }
        return defaultValue
    }
}

module.exports = helperCreateIterateHandle