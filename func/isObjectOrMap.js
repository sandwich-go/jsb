const isVisitable = require("./isVisitable");
const isArray = require("./isArray");

function isObjectOrMap (obj) {
    return isVisitable(obj) && !isArray(obj)
}

module.exports = isObjectOrMap