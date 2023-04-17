'use strict'

// 核心
let jsb = require('./ctor')
jsb.each = require('./each')
jsb.pathGet = require('./pathGet')
jsb.pathSet = require('./pathSet')
jsb.isArray = require('./isArray')

jsb.isVisitable = require('./isVisitable')
jsb.isObjectOrMap = require('./isObjectOrMap')

jsb.isString = require('./isString')
jsb.isFunction = require('./isFunction')
jsb.isNumber = require('./isNumber')
jsb.isBoolean = require('./isBoolean')
jsb.isEmpty = require('./isEmpty')


jsb.xid = require('./xid')
jsb.findIndexOf = require('./findIndexOf')
jsb.orderBy = require('./orderBy')
jsb.isPlainObject = require('./isPlainObject')
jsb.eqNull = require('./eqNull')
jsb.isNull = require('./isNull')
jsb.property = require('./property')
jsb.toArray = require('./toArray')
jsb.wrapArray = require('./wrapArray')
jsb.isUndefined = require('./isUndefined')
jsb.random = require('./random')
jsb.randomModIsZero = require('./randomModIsZero')
jsb.clone = require('./clone')

jsb.textWidth = require('./textWidth')
jsb.longestTextWidth = require('./longestTextWidth')


jsb.datetimePickerOptionsPast = require('./datetimePickerOptionsPast')
jsb.datetimePickerOptionsNext = require('./datetimePickerOptionsNext')

jsb.assign = require('./assign')
jsb.merge = require('./merge')

jsb.clientWidth = require('./clientWidth')
jsb.clientHeight = require('./clientHeight')

jsb.clipCopy = require('./clipCopy')
jsb.objectAssignNX = require('./objectAssignNX')

module.exports = jsb
