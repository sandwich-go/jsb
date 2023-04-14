// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
const isArray = require("./isArray");

function isVisitable(obj) {
    if(obj === null || obj === undefined) {
        return false
    }
    return  obj instanceof Map || isArray(obj) || typeof obj === "object"
}

module.exports = isVisitable