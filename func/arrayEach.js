const isBoolean = require("./isBoolean");
const {re} = require("@babel/core/lib/vendor/import-meta-resolve");

function arrayEach(list, iterate,stopWhenNotTrue=false,context=undefined) {
    if (list) {
        if (list.forEach) {
            let shouldContinue = true
            let result= undefined
            list.forEach((item,index)=>{
                if(shouldContinue){
                    result = iterate.call(context, list[index], index, list);
                    if (stopWhenNotTrue && result !== true) {
                        shouldContinue = false
                    }
                }
            }, context)
        }else{
            for (let index = 0, len = list.length; index < len; index++) {
                const result = iterate.call(context, list[index], index, list);
                if (stopWhenNotTrue && result !== true) {
                    return result;
                }
            }
        }
    }
}

module.exports = arrayEach