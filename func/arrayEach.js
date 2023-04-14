function arrayEach (list, iterate, thisArg) {
    if (list) {
        if (list.forEach) {
            list.forEach(iterate, thisArg)
        } else {
            for (let index = 0, len = list.length; index < len; index++) {

                iterate.call(thisArg, list[index], index, list)
            }
        }
    }
}

module.exports = arrayEach