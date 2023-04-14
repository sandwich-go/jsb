/* eslint-disable valid-typeof */
function helperCreateInTypeOf (type) {
    return function (obj) {
        return typeof obj === type
    }
}

module.exports = helperCreateInTypeOf