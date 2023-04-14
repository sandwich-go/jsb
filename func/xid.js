const base32 = require('./base32');
const crypto = window.crypto

const randBuf = new Uint8Array(4)

function randInt() {
    crypto.getRandomValues(randBuf)
    return bin2int(randBuf)
}

function machineId() {
    const lsKey = 'xid-machine-id'
    const storedId = localStorage.getItem(lsKey)
    if (storedId) {
        return parseInt(storedId)
    }
    const id = randInt()
    localStorage.setItem(lsKey, `${id}`)
    return id
}

const mid = machineId() & 0xffffff
const pid = randInt() & 0xffff

let seq = randInt()
let time = (Date.now() / 1000) | 0

const buf = new ArrayBuffer(12)
const view = new DataView(buf, 0, 12)
view.setUint32(0, time)
setArrayBufBytesAtOffset(buf, uint32FirstNBytes(mid, 3), 4)

view.setUint16(7, pid)

function xid() {
    const now = (Date.now() / 1000) | 0
    if (time !== now) {
        view.setUint32(0, now)
        time = now
    }
    const c = seq & 0xffffff
    seq += 1
    setArrayBufBytesAtOffset(buf, uint32FirstNBytes(c, 3), 9)

    return base32.encodeString(buf).substring(0, 20);
}

function uint32FirstNBytes(uint32, numbBytes) {
    const buf = new ArrayBuffer(4)
    const view = new DataView(buf)
    view.setUint32(0, uint32)
    return buf.slice(buf.byteLength - numbBytes)
}

function setArrayBufBytesAtOffset(
    dest,
    bytes,
    offset
) {
    new Uint8Array(dest).set(new Uint8Array(bytes), offset)
}

function bin2int(bin) {
    let i = 0
    const len = bin.length
    let num = 0
    while (i < len) {
        num <<= 8
        num += bin[i]
        i++
    }
    return num
}

module.exports = xid