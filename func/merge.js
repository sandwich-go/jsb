const isArray = require('./isArray')
const isPlainObject = require('./isPlainObject')
const each = require('./each')

function handleMerge (target, source) {
    if ((isPlainObject(target) && isPlainObject(source)) || (isArray(target) && isArray(source))) {
        each(source, function (obj, key) {
            target[key] = handleMerge(target[key], obj)
        })
        return target
    }
    return source
}

/**
 * 将一个或多个源对象合并到目标对象中，和 assign 的区别是会将对象或数组类型递归合并
 *
 * @param {Object} target 目标对象
 * @param {...Object}
 * @return {Object}
 *
 *
 * const obj1 = [{a: 11}, {b: 22}]
 * const obj2 = XEUtils.merge(obj1, [{c: 33}, {d: 44}])
 * // [{a: 11, c: 33}, {b: 22, d: 44}]
 *
 * const obj3 = {a: 0, b: {b1: 11}, c: {c1: {d: 44}}}
 * const obj4 = XEUtils.merge(obj1, {a: 11, b: {b2: 22}, c: {f1: 55}})
 * // {a: 11, b: {b1: 11, b2: 22}, c: {c1: {d: 44}, f1: 55}}
 *
 */
const merge = function (target) {
    if (!target) {
        target = {}
    }
    const args = arguments;
    const len = args.length;
    let source, index = 1;
    for (; index < len; index++) {
        source = args[index]
        if (source) {
            handleMerge(target, source)
        }
    }
    return target
};

module.exports = merge