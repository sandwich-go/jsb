const orderBy = require('./orderBy');
const clone = require('./clone');
const eqNull = require('./eqNull');
const each = require('./each');
const remove = require('./remove');
const assign = require('./assign');
const cc = require("./cc");

function strictTree (array, optChildren) {
    each(array, function (item) {
        if (item[optChildren] && !item[optChildren].length) {
            remove(item, optChildren)
        }
    })
}

/**
 * 将一个带层级的数据列表转成树结构
 *
 * @param {Array} array 数组
 * @param {Object} options {strict: false, parentKey: 'parentId', key: 'id', children: 'children', mapChildren: 'children', data: 'data'}
 * @return {Array}
 */
function toArrayTree (array, options) {
    const opts = assign({}, cc.treeOptions, options);
    const optStrict = opts.strict;
    const optKey = opts.key;
    const optParentKey = opts.parentKey;
    const optChildren = opts.children;
    const optMapChildren = opts.mapChildren;
    const optSortKey = opts.sortKey;
    const optReverse = opts.reverse;
    const optData = opts.data;
    const result = [];
    const treeMap = {};
    const idsMap = {};
    let id, treeData, parentId;

    if (optSortKey) {
        array = orderBy(clone(array), optSortKey)
        if (optReverse) {
            array = array.reverse()
        }
    }

    each(array, function (item) {
        id = item[optKey]
        idsMap[id] = true
    })

    each(array, function (item) {
        id = item[optKey]

        if (optData) {
            treeData = {}
            treeData[optData] = item
        } else {
            treeData = item
        }

        parentId = item[optParentKey]
        treeMap[id] = treeMap[id] || []
        treeMap[parentId] = treeMap[parentId] || []
        treeMap[parentId].push(treeData)
        treeData[optKey] = id
        treeData[optParentKey] = parentId
        treeData[optChildren] = treeMap[id]
        if (optMapChildren) {
            treeData[optMapChildren] = treeMap[id]
        }

        if (!optStrict || (optStrict && eqNull(parentId))) {
            if (!idsMap[parentId]) {
                result.push(treeData)
            }
        }
    })

    if (optStrict) {
        strictTree(array, optChildren)
    }

    return result
}

module.exports = toArrayTree