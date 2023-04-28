'use strict'


const arrayEach = require('./arrayEach');
const each = require('./each');
const isFunction = require('./isFunction');
const ccConfig = require("./cc");
const pathGet = require("./pathGet");

let jsb = function () {}

function mixin () {
    arrayEach(arguments, function (methods) {
        each(methods, function (fn, name) {
            jsb[name] = isFunction(fn) ? function () {
                const result = fn.apply(jsb.$context, arguments);
                jsb.$context = null
                return result
            } : fn
        })
    })
}

jsb.VERSION = '@VERSION'
jsb.mixin = mixin
jsb.ccAssign =function (options) {
    return Object.assign(ccConfig, options)
}

jsb.ccPath = function (fieldPath=undefined,defaultVal=undefined){
    if(!fieldPath){
        return ccConfig
    }
    return pathGet(ccConfig,fieldPath,defaultVal)
}

module.exports = jsb