const textWidth = require("./textWidth");

const baseWithWhenZero = 30
function longestTextWidth(nameList) {
    if(nameList.length === 0){
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