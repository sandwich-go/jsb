const textWidth = require("./textWidth");
const isEmpty = require("./isEmpty");
const cc = require("./cc");

function longestTextWidth(nameList) {
    if(isEmpty(nameList) || nameList.length === 0){
        return cc.textBaseWidth
    }
    let longest = textWidth(nameList.sort(
        function (a, b) {
            return b.length - a.length;
        }
    )[0]);
    if (!longest){
        longest = 0
    }
    return  longest + cc.textBaseWidth
}

module.exports = longestTextWidth