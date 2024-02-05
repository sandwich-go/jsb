'use strict'

// 核心
let jsb = require('./ctor')
jsb.each = require('./each')
jsb.lastEach = require('./lastEach')
jsb.pathGet = require('./pathGet')
jsb.pathSet = require('./pathSet')
jsb.isArray = require('./isArray')

jsb.arrayToTree = require('./arrayToTree')

jsb.isVisitable = require('./isVisitable')
jsb.isObjectOrMap = require('./isObjectOrMap')
jsb.map = require('./map')

jsb.isString = require('./isString')
jsb.isFunction = require('./isFunction')
jsb.isNumber = require('./isNumber')
jsb.isBoolean = require('./isBoolean')
jsb.isEmpty = require('./isEmpty')

jsb.until = require('./until')


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
jsb.htmlWidth = require('./htmlWidth')

jsb.longestTextWidth = require('./longestTextWidth')
jsb.longestHTMLWidth = require('./longestHTMLWidth')


jsb.datetimePickerOptionsPast = require('./datetimePickerOptionsPast')
jsb.datetimePickerOptionsNext = require('./datetimePickerOptionsNext')

jsb.assign = require('./assign')
jsb.merge = require('./merge')

jsb.clientWidth = require('./clientWidth')
jsb.clientHeight = require('./clientHeight')

jsb.clipCopy = require('./clipCopy')
jsb.objectAssignNX = require('./objectAssignNX')

jsb.remove = require('./remove')
jsb.clear = require('./clear')
jsb.every = require('./every')

jsb.delay = require('./delay')
jsb.toNumber = require('./toNumber')
jsb.slice = require('./slice')
jsb.find = require('./find')

jsb.element = require('./element')

jsb.debounce = require('./debounce')

jsb.includes = require('./includes')

jsb.cc = require('./cc')
jsb.now = require('./now')
jsb.dateTime = require('./dateTime')

jsb.size = require('./size')

jsb.omit = require('./omit')
jsb.pick = require('./pick')
jsb.keys = require('./keys')

jsb.filter =  require('./filter')

jsb.duplicateFields = require('./duplicateFields')


module.exports = jsb
