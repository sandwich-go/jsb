var helperCreateToNumber = require('./helperCreateToNumber')

/**
 * 转数值
 * @param { String/Number } str 数值
 *
 * @return {Number}
 */
const toNumber = helperCreateToNumber(parseFloat);

module.exports = toNumber