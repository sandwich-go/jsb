const htmlWidth = require("./htmlWidth");
const isEmpty = require("./isEmpty");
const cc = require("./cc");

function longestHTMLWidth(nameList) {
    const baseWithWhenZero = cc.textBaseWidth || 30
    if(isEmpty(nameList) || nameList.length === 0){
        return baseWithWhenZero
    }
    let longest = htmlWidth(nameList.sort(
        function (a, b) {
            return b.length - a.length;
        }
    )[0]);
    if (!longest){
        longest = 0
    }
    return  longest + baseWithWhenZero
}

module.exports = longestHTMLWidth