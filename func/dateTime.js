const cc = require("./cc");

const RGX = /([^{]*?)\w(?=\})/g;

const MAP = {
    YYYY: 'getFullYear',
    YY: 'getYear',
    MM: function (d) {
        return d.getMonth() + 1;
    },
    DD: 'getDate',
    HH: 'getHours',
    mm: 'getMinutes',
    ss: 'getSeconds',
    fff: 'getMilliseconds'
};

function tinyDate(str, custom) {
    let parts = [], offset = 0;

    str.replace(RGX, function (key, _, idx) {
        // save preceding string
        parts.push(str.substring(offset, idx - 1));
        offset = idx + key.length + 1;
        // save function
        parts.push(custom && custom[key] || function (d) {
            return ('00' + (typeof MAP[key] === 'string' ? d[MAP[key]]() : MAP[key](d))).slice(-key.length);
        });
    });

    if (offset !== str.length) {
        parts.push(str.substring(offset));
    }

    return function (arg) {
        let out = '', i = 0, d = arg || new Date();
        for (; i<parts.length; i++) {
            out += (typeof parts[i]==='string') ? parts[i] : parts[i](d);
        }
        return out;
    };
}


// 返回当前时间并按指定的方案格式化
const dateTime = function (date=undefined,format=undefined,custom=undefined) {
    return tinyDate(format||cc.dateTimeFormat,custom)(date || new Date())
}

module.exports = dateTime