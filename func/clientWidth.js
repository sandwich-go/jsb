const cc = require("./cc");

function clientWidth(sub = 0) {
    const measureViewDiv = document.querySelector(`#${cc.measureViewDiv}`)
    if(!measureViewDiv) {
        console.error(`can not querySelector with id: ${cc.measureViewDiv}`)
        return
    }
    return measureViewDiv.clientWidth - (sub || 0)
}

module.exports = clientWidth