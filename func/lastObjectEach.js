const lastArrayEach = require('./lastArrayEach');
const keys = require('./keys');

function lastObjectEach (obj, iterate, context) {
    lastArrayEach(keys(obj), function (key) {
        iterate.call(context, obj[key], key, obj)
    })
}

module.exports = lastObjectEach