const Clipboard  = require('clipboard')
const cc = require("./cc");
const eqNull = require("./eqNull");
const isString = require("./isString");

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

function clipCopy(text, event, name = "") {
    let textToCopy = text || ''
    if(!isString(textToCopy)){
        textToCopy = JSON.stringify(textToCopy)
    }
    if(eqNull(textToCopy) || text===''){
        return
    }
    const clipboard = new Clipboard(event.target, {
        text: () => textToCopy
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