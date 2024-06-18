const isBoolean = require("./isBoolean");

function arrayEach(list, iterate,stopWhenNotTrue=false,context=undefined) {
    if (list) {
        for (let index = 0, len = list.length; index < len; index++) {
            const result = iterate.call(context, list[index], index, list);
            if (stopWhenNotTrue && result !== true) {
                return result;
            }
        }
    }
}

module.exports = arrayEach