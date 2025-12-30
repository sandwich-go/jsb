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
    // 处理 undefined：undefined 排在最后
    if (isUndefined(v1)) {
        return isUndefined(v2) ? 0 : 1
    }
    if (isUndefined(v2)) {
        return -1
    }
    // 处理 null：null 排在 undefined 前面
    if (isNull(v1)) {
        return isNull(v2) ? 0 : 1
    }
    if (isNull(v2)) {
        return -1
    }
    // 处理 Symbol 类型，Symbol 无法直接比较
    if (typeof v1 === 'symbol' || typeof v2 === 'symbol') {
        const s1 = String(v1);
        const s2 = String(v2);
        return s1.localeCompare ? s1.localeCompare(s2) : (s1 > s2 ? 1 : -1);
    }
    // 处理字符串：使用 localeCompare（包括空字符串）
    if (typeof v1 === 'string' && typeof v2 === 'string') {
        return v1.localeCompare(v2);
    }
    // 其他类型：直接比较
    return v1 > v2 ? 1 : -1
}

function buildMultiOrders (name, confs, compares) {
    return function (item1, item2) {
        const v1 = item1[name];
        const v2 = item2[name]
        if (v1 === v2) {
            return compares ? compares(item1, item2) : 0
        }
        const orderFunc  = confs['orderFunc'] || handleSort
        return orderName(confs.order) === ORDER_PROP_DESC ? orderFunc(v2, v1) : orderFunc(v1, v2)
    }
}

function orderName(order,defaultOrder=ORDER_PROP_ASC){
    if(order === "ascending"){
        return "asc"
    }
    if(order === "descending"){
        return "desc"
    }
    if(!order){
        return defaultOrder
    }
    return order
}

function getSortConfs (arr, list, fieldConfs, context) {
    const sortConfs = [];
    fieldConfs = isArray(fieldConfs) ? fieldConfs : [fieldConfs]
    arrayEach(fieldConfs, function (handle, index) {
        if (handle != null) {
            let field = handle;
            let order;
            let hasOrderParam = false; // 标记是否有 order 参数
            if (isArray(handle)) {
                field = handle[0]
                order = handle[1]
                hasOrderParam = true; // 数组格式有 order 参数
            } else if (isPlainObject(handle)) {
                field = handle.field
                order = handle.order
                hasOrderParam = true; // 对象格式有 order 参数
            }
            // 只有当有 order 参数且为 undefined 或空字符串时，才忽略这个排序字段
            if (hasOrderParam && (isUndefined(order) || order === '')) {
                return
            }
            // 如果 field 为 null 或 undefined，也应该忽略这个排序字段
            if (isUndefined(field) || field === null) {
                return
            }
            const sortIndex = sortConfs.length
            sortConfs.push({
                field: field,
                order: orderName(order,ORDER_PROP_ASC)
            })
            arrayEach(list, isFunction(field) ? function (item, key) {
                item[sortIndex] = field.call(context, item.data, key, arr)
            } : function (item) {
                // field 已经在上面的检查中排除了 null/undefined，所以这里可以直接使用
                item[sortIndex] = get(item.data, field)
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
        // 如果所有排序参数都是 undefined，按照没有传输排序参数处理
        if (sortConfs.length === 0) {
            return toArray(arr).sort(handleSort)
        }
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