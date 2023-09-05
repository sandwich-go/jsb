const textWidth = require("./textWidth");
const isEmpty = require("./isEmpty");
const {textBaseWidth} = require("../cc");

const baseWithWhenZero = textBaseWidth
function longestTextWidth(nameList) {
    if(isEmpty(nameList) || nameList.length === 0){
        return baseWithWhenZero
    }
    let longest = textWidth(nameList.sort(
        function (a, b) {
            return b.length - a.length;
        }
    )[0]);
    if (!longest){
        longest = 0
    }
    return  longest + baseWithWhenZero
}

module.exports = longestTextWidth