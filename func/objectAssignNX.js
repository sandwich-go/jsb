const objectEach = require("./objectEach");
const hasOwnProp = require("./hasOwnProp");
const objectAssignNX = function (target, options) {
    target = target || {}
    objectEach(options, function (val, key) {
        if (hasOwnProp(target, key)) {
            return
        }
        target[key] = val
    })
    return target
}

module.exports = objectAssignNX