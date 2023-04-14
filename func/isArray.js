function isArray (obj) {
    if(obj === null || obj === undefined) {
        return false
    }
    return (!!obj) && (obj.constructor === Array);
}
module.exports = isArray