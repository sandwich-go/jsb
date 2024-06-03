const arrayEach = require('./arrayEach');
const toArray = require('./toArray');
const map = require('./map');
const isArray = require('./isArray')
const isFunction = require('./isFunction');
const isPlainObject = require('./isPlainObject')
const isUndefined = require('./isUndefined')
const isNull = require('./isNull')
const eqNull = require('./eqNull')
const property = require('./property')
const hasOwnProp = require('./hasOwnProp')

const staticHGKeyRE = /(.+)?\[(\d+)\]$/

function helperGetHGSKeys (property) {
    // 以最快的方式判断数组，可忽略准确性
    return property ? (property.splice && property.join ? property : ('' + property).replace(/(\[\d+\])\.?/g,'$1.').replace(/\.$/, '').split('.')) : []
}


/**
 * 获取对象的属性的值，如果值为 undefined，则返回默认值
 * @param {Object/Array} obj 对象
 * @param {String/Function} property 键、路径
 * @param {Object} defaultValue 默认值
 * @return {Object}
 */
function get (obj, property, defaultValue) {
    if (eqNull(obj)) {
        return defaultValue
    }
    var result = getValueByPath(obj, property)
    return isUndefined(result) ? defaultValue : result
}

function getDeepProps (obj, key) {
    var matchs = key ? key.match(staticHGKeyRE) : ''
    return matchs ? (matchs[1] ? (obj[matchs[1]] ? obj[matchs[1]][matchs[2]] : undefined) : obj[matchs[2]]) : obj[key]
}

function getValueByPath (obj, property) {
    if (obj) {
        var rest, props, len
        var index = 0
        if (obj[property] || hasOwnProp(obj, property)) {
            return obj[property]
        } else {
            props = helperGetHGSKeys(property)
            len = props.length
            if (len) {
                for (rest = obj; index < len; index++) {
                    rest = getDeepProps(rest, props[index])
                    if (eqNull(rest)) {
                        if (index === len - 1) {
                            return rest
                        }
                        return
                    }
                }
            }
            return rest
        }
    }
}


const ORDER_PROP_ASC = 'asc'
const ORDER_PROP_DESC = 'desc'

// function handleSort (v1, v2) {
//   return v1 > v2 ? 1 : -1
// }

// '' < 数字 < 字符 < null < undefined
function handleSort (v1, v2) {
    if (isUndefined(v1)) {
        return 1
    }
    if (isNull(v1)) {
        return isUndefined(v2) ? -1 : 1
    }
    return v1 && v1.localeCompare ? v1.localeCompare(v2) : (v1 > v2 ? 1 : -1)
}

function buildMultiOrders (name, confs, compares) {
    return function (item1, item2) {
        const v1 = item1[name];
        const v2 = item2[name]
        if (v1 === v2) {
            return compares ? compares(item1, item2) : 0
        }
        const orderFunc  = confs['orderFunc'] || handleSort
        return confs.order === ORDER_PROP_DESC ? orderFunc(v2, v1) : orderFunc(v1, v2)
    }
}

function getSortConfs (arr, list, fieldConfs, context) {
    const sortConfs = [];
    fieldConfs = isArray(fieldConfs) ? fieldConfs : [fieldConfs]
    arrayEach(fieldConfs, function (handle, index) {
        if (handle) {
            let field = handle;
            let order;
            if (isArray(handle)) {
                field = handle[0]
                order = handle[1]
            } else if (isPlainObject(handle)) {
                field = handle.field
                order = handle.order
            }
            sortConfs.push({
                field: field,
                order: order || ORDER_PROP_ASC
            })
            arrayEach(list, isFunction(field) ? function (item, key) {
                item[index] = field.call(context, item.data, key, arr)
            } : function (item) {
                item[index] = field ? get(item.data, field) : item.data
            })
        }
    })
    return sortConfs
}

/**
 * 将数组进行排序
 *
 * @param {Array} arr 数组
 * @param {Function/String/Array} fieldConfs 方法或属性
 * @param {Object} context 上下文
 * @return {Array}
 */
function orderBy (arr, fieldConfs, context=undefined) {
    if (arr) {
        if (eqNull(fieldConfs)) {
            return toArray(arr).sort(handleSort)
        }
        let compares;
        let list = map(arr, function (item) {
            return {data: item}
        });
        const sortConfs = getSortConfs(arr, list, fieldConfs, context);
        let len = sortConfs.length - 1;
        while (len >= 0) {
            compares = buildMultiOrders(len, sortConfs[len], compares)
            len--
        }
        if (compares) {
            list = list.sort(compares)
        }
        return map(list, property('data'))
    }
    return []
}

module.exports = orderBy