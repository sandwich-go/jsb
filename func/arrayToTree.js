const orderBy = require('./orderBy');
const clone = require('./clone');
const eqNull = require('./eqNull');
const each = require('./each');
const remove = require('./remove');
const assign = require('./assign');
const cc = require("./cc");
const eachTree = require("./eachTree");
const pathGet = require("../pathGet");
const pathSet = require("../pathSet");


/**
 * 将一个带层级的数据列表转成树结构
 *
 * @param {Array} array 数组
 * @param {Object} options {removeNoChildren:false,parentKey: 'parentId', key: 'id', children: 'children',path: 'path', mapChildren: 'children', data: 'data'}
 * @return {Array}
 */
function arrayToTree (array, options) {
    const opts = assign({}, cc.treeOptions, options);
    const optKey = opts.key;
    const optParentKey = opts.parentKey;
    const optChildren = opts.children;
    const optRemoveChildrenWhenEmpty = opts.removeChildrenWhenEmpty;
    const optMapChildren = opts.mapChildren;
    const optSortKey = opts.sortKey;
    const optItem2TreeNode = opts['itemToTreeNode'];
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
            treeData[optData] = optItem2TreeNode?optItem2TreeNode(item):item
        } else {
            treeData = optItem2TreeNode?optItem2TreeNode(item):item
        }

        parentId = pathGet(item,optParentKey)
        treeMap[id] = treeMap[id] || []
        treeMap[parentId] = treeMap[parentId] || []
        treeMap[parentId].push(treeData)
        treeData[optKey] = id
        treeData = pathSet(treeData,optParentKey,parentId)
        treeData[optChildren] = treeMap[id]
        if (optMapChildren) {
            treeData[optMapChildren] = treeMap[id]
        }
        if (!idsMap[parentId]) {
            result.push(treeData)
        }
    })
    if(optRemoveChildrenWhenEmpty){
        eachTree(result,item=>{
            if(item[optChildren] && !item[optChildren].length){
                delete item[optChildren]
            }
        })
    }
    return result
}

module.exports = arrayToTree
