const cc = require("./cc");

function clientHeight(sub = 0) {
    const measureViewDiv = document.querySelector(`#${cc.measureViewDiv}`)
    if(!measureViewDiv) {
        console.error(`can not querySelector with id: ${cc.measureViewDiv}`)
        return
    }
    return measureViewDiv.clientHeight - (sub || 0)
}

module.exports = clientHeight