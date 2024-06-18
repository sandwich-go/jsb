const hasOwnProp = require('./hasOwnProp');

function objectEach (obj, iterate,stopWhenNotTrue=false,context=undefined) {
    if (obj) {
        for (const key in obj) {
            if (hasOwnProp(obj, key)) {
                const ret = iterate.call(context, obj[key], key, obj)
                if (stopWhenNotTrue && ret !== true) {
                    return ret;
                }
            }
        }
    }
}

module.exports = objectEach