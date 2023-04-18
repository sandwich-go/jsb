'use strict'

const toastLib = require('./toast')
const pathGet = require("./pathGet");
let cc = {
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
    }
}

cc.toastInfo = function (title, {body, id, timeout, config} = {}) {
    cc.toast("info", title, {body, id, timeout, config})
}
cc.toastSuccess = function (title, {body, id, timeout, config} = {}) {
    cc.toast("success", title, {body, id, timeout, config})
}
cc.toastWarning = function (title, {body, id, timeout, config} = {}) {
    cc.toast("warning", title, {body, id, timeout, config})
}
cc.toastError = function (title, {body, id, timeout, config} = {}) {
    cc.toast("error", title, {body, id, timeout, config})
}
module.exports = cc