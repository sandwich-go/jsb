/**
 * 函数去抖；当被调用 n 毫秒后才会执行，如果在这时间内又被调用则将重新计算执行时间
 *
 * @param {Function} callback 回调
 * @param {Number} wait 多少秒毫
 * @param {Object|Boolean} options 参数{leading: 是否在之前执行, trailing: 是否在之后执行}
 * @return {Function}
 */
function debounce (callback, wait, options=undefined) {
    let args, context;
    const opts = options || {};
    let runFlag = false;
    const isDestroy = false;
    let timeout = 0;
    const isLeading = typeof options === 'boolean';
    const optLeading = 'leading' in opts ? opts.leading : isLeading;
    const optTrailing = 'trailing' in opts ? opts.trailing : !isLeading;
    const runFn = function () {
        if (!isDestroy) {
            runFlag = true
            timeout = 0
            callback.apply(context, args)
        }
    };
    var endFn = function () {
        if (optLeading === true) {
            timeout = 0
        }
        if (!isDestroy && !runFlag && optTrailing === true) {
            runFn()
        }
    }
    const cancelFn = function () {
        const rest = timeout !== 0;
        clearTimeout(timeout)
        args = null
        context = null
        timeout = 0
        return rest
    };
    const debounced = function () {
        runFlag = false
        args = arguments
        context = this
        if (timeout === 0) {
            if (optLeading === true) {
                runFn()
            }
        } else {
            clearTimeout(timeout)
        }
        timeout = setTimeout(endFn, wait)
    };
    debounced.cancel = cancelFn
    return debounced
}

module.exports = debounce