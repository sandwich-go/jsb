'use strict'

const toastLib = require('./toast')
const pathGet = require("./pathGet");

const defaultCC = {
    // view中插入如下div便于获取view宽高
    // <div id="measure-view-hw" style="position: fixed; height: 100vh;width: 100vw"></div>
    measureViewDiv: 'measure-view-hw',
    toast: (type, title, {body, id, timeout, config}) => {
        (toastLib[type])({text: title, time: timeout / 1000})
    },
    confirm: (context, config) => {
        const resp = window.confirm(pathGet(config, 'message', "确认操作?"))
        if(resp){
            const doneFunc = pathGet(config, 'doneFunc')
            doneFunc && doneFunc()
        }
    },
    dateTimeFormat:'{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}'
}

defaultCC.toastInfo = function (title, {body, id, timeout, config} = {}) {
    defaultCC.toast("info", title, {body, id, timeout, config})
}
defaultCC.toastSuccess = function (title, {body, id, timeout, config} = {}) {
    defaultCC.toast("success", title, {body, id, timeout, config})
}
defaultCC.toastWarning = function (title, {body, id, timeout, config} = {}) {
    defaultCC.toast("warning", title, {body, id, timeout, config})
}
defaultCC.toastError = function (title, {body, id, timeout, config} = {}) {
    defaultCC.toast("error", title, {body, id, timeout, config})
}

let cc = defaultCC
if(typeof window !== 'undefined') {
    if(!window.jsb_cc){
        window.jsb_cc = defaultCC
    }
    cc = window.jsb_cc
}

module.exports = cc