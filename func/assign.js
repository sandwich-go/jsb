const arrayEach = require('./arrayEach')
const keys = require('./keys')
const isArray = require('./isArray')
const clone = require('./clone')

const objectAssignFns = Object.assign;

function handleAssign (destination, args, isClone) {
    const len = args.length
    let source, index = 1;
    for (; index < len; index++) {
        source = args[index]
        arrayEach(keys(args[index]), isClone ? function (key) {
            destination[key] = clone(source[key], isClone)
        } : function (key) {
            destination[key] = source[key]
        })
    }
    return destination
}

/**
 * 将一个或多个源对象复制到目标对象中
 *
 * @param {Object} target 目标对象
 * @param {...Object}
 * @return {Object}
 * 
 *
 * const obj1 = {a: 0, b: {b1: 11}}
 * const obj2 = assign(obj1, {a: 11}, {c: 33})
 * // {a: 11, b: {b1: 11}, c: 33}
 *
 * const obj3 = {a: 0, b: {b1: 11}}
 * const obj4 = assign(obj1, {a: 11, b: {b2: 22}})
 * // {a: 11, b: {b2: 22}}
 *
 */
const assign = function (target) {
    if (target) {
        const args = arguments;
        if (target === true) {
            if (args.length > 1) {
                target = isArray(target[1]) ? [] : {}
                return handleAssign(target, args, true)
            }
        } else {
            return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args)
        }
    }
    return target
}

module.exports = assign