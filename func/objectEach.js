const hasOwnProp = require('./hasOwnProp');

function objectEach (obj, iterate, context) {
    if (obj) {
        for (const key in obj) {
            if (hasOwnProp(obj, key)) {
                iterate.call(context, obj[key], key, obj)
            }
        }
    }
}

module.exports = objectEach