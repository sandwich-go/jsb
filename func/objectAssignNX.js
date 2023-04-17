const objectEach = require("./objectEach");
const hasOwnProp = require("./hasOwnProp");
const objectAssignNX = function (target, options) {
    objectEach(options, function (val, key) {
        if (hasOwnProp(target, key)) {
            return
        }
        target[key] = val
    })
}

module.exports = objectAssignNX