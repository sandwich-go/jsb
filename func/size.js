const isArray = require('./isArray');
const isString = require('./isString');
const each = require('./each');

/**
 * 返回对象的长度
 *
 * @param {Object} obj 对象
 * @return {Number}
 */
function getSize (obj) {
    let len = 0;
    if (isString(obj) || isArray(obj)) {
        return obj.length
    }
    each(obj, function () {
        len++
    })
    return len
}

module.exports = getSize