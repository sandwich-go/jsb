'use strict'

const toastLib = require('./toast')
const pathGet = require("./pathGet");

const Emitter = require('./emitter.js');

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
        }else{
            const cancelFunc = pathGet(config, 'cancelFunc')
            cancelFunc && cancelFunc()
        }
    },
    dateTimeFormat:'{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}',

    aimViewPassword:function (){return true},
    aimFormCommentStyle:{
        'font-style':'italic',
        'color':'#707070',
        'font-size':'12px'
    },
    emitter:new Emitter(),
    textBaseWidth :30,
    treeOptions: {
        parentKey: 'parentId',
        key: 'id',
        children: 'children'
    },
    colorPredefined:[
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
    ]
}

defaultCC.confirmDelete = defaultCC.confirm

defaultCC.toastInfo = function (title, {body, id, timeout, config} = {}) {
    timeout = timeout || 3000
    defaultCC.toast("info", title, {body, id, timeout, config})
}
defaultCC.toastSuccess = function (title, {body, id, timeout, config} = {}) {
    timeout = timeout || 3000
    defaultCC.toast("success", title, {body, id, timeout, config})
}
defaultCC.toastWarning = function (title, {body, id, timeout, config} = {}) {
    timeout = timeout || 6000
    defaultCC.toast("warning", title, {body, id, timeout, config})
}
defaultCC.toastError = function (title, {body, id, timeout, config} = {}) {
    timeout = timeout || 9000
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