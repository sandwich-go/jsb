const cc = require("./cc");
const each = require('./each');
const assign = require('./assign');

function unTreeList (result, array, opts) {
    const optChildren = opts.children;
    const optData = opts.data;
    const optClear = opts.clear;
    each(array, function (item) {
        const children = item[optChildren];
        if (optData) {
            item = item[optData]
        }
        result.push(item)
        if (children && children.length) {
            unTreeList(result, children, opts)
        }
        if (optClear) {
            delete item[optChildren]
        }
    })
    return result
}

/**
 * 将一个树结构转成数组列表
 *
 * @param {Array} array 数组
 * @param {Object} options { children: 'children', data: 'data', clear: false}
 * @return {Array}
 */
function treeToArray (array, options) {
    return unTreeList([], array, assign({}, cc.treeOptions, options))
}

module.exports = treeToArray