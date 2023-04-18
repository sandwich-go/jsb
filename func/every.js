const helperCreateIterateHandle = require('./helperCreateIterateHandle');

/**
 * 对象中的值中的每一项运行给定函数,如果该函数对每一项都返回true,则返回true,否则返回false
 * 不同于each，every遇到返回false的情况就会终止遍历操作
 *
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, obj) 回调
 * @param {Object} context 上下文
 * @return {Boolean}
 */
const every = helperCreateIterateHandle('every', 1, 1, false, true);

module.exports = every