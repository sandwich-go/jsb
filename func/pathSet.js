const isArray = require("./isArray");
const isObjectOrMap = require("./isObjectOrMap");

const PathSetTypeInValid = new Error('append to exist map or object, type invalid')

function pathSet(obj,key,val,append) {
    let loc = obj
    let parent = obj
    let lastStep = key
    for(const step of key.split(".")) {
        parent = loc
        lastStep = step
        if(isObjectOrMap(parent)) {
            // eslint-disable-next-line no-prototype-builtins
            if(!parent.hasOwnProperty(step)) {
                parent[step] = {}
            }
            loc = parent[step]
        }else{
            // eslint-disable-next-line no-prototype-builtins
            if(isArray(parent) && !parent.hasOwnProperty(step)) {
                parent[step] = []
            }
            loc = parent[step]
        }
    }
    // parent是上层元素的引用
    if(append) {
        if(isObjectOrMap(parent[lastStep]) && Object.keys(parent[lastStep]).length === 0){
            // 新建元素设定为空
            parent[lastStep] = []
        }
        if(isArray(parent[lastStep])) {
            parent[lastStep].push(val)
            return
        }
        throw PathSetTypeInValid;
    }
    parent[lastStep] = val
}

module.exports = pathSet
