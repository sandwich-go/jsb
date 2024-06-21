const Clipboard  = require('clipboard')
const cc = require("./cc");
const eqNull = require("./eqNull");
const isString = require("./isString");
const pathGet = require("./pathGet");

function clipboardSuccess(name) {
    let msg = "已拷贝到剪贴板"
    if (name !== "") {
        msg = `${name} ${msg}`
    }
    cc.toastSuccess(msg, {timeout: 1000})
}

function clipboardError(name) {
    let msg = "拷贝到剪贴板失败"
    if (name !== "") {
        msg = `${name} ${msg}`
    }
    cc.toastError(msg, {timeout: 1000})
}

function clipCopy(incoming, event, name = "") {
    let toCopy = incoming || ''
    if(!isString(toCopy)){
        toCopy = pathGet(toCopy,'_text_copy_')
        if(toCopy && !isString(toCopy)){
            toCopy = JSON.stringify(toCopy)
        }
        if(!toCopy){
            toCopy = JSON.stringify(incoming)
        }
    }
    if(eqNull(toCopy) || toCopy===''){
        return
    }
    const clipboard = new Clipboard(event.target, {
        text: () => toCopy
    })
    clipboard.on('success', () => {
        clipboardSuccess(name)
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        clipboardError(name)
        clipboard.destroy()
    })
    clipboard.onClick(event)
}

module.exports  = clipCopy