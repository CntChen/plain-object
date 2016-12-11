/**
 * created by CntChen
 * 2016-12-11
 */

function PlainObject(fromObject) {
  if (fromObject === undefined || fromObject === null) {
    throw Error('Input param error');
  }

  if (!Util.isObject(fromObject) && !Util.isArray(fromObject)) {
    throw Error('Input param type error');
  }

  this.From = fromObject;
  this.Plain = null;
  this.Copy = null;
  this.Model = null;
  this._init();
}

PlainObject.prototype = {
  constructor: PlainObject,

  _init: function(){
    this._toPlain();
    this._copyObj();
    this._addWatch();
  },

  /**
   * 把传入数据拍平
   */
  _toPlain: function(){
    var tempObj = {};
    toPlain_interation(this.From, 'cnt');
    this.Plain = tempObj;

    function toPlain_interation(from, level){
      var level = level || '';
      if (Util.isObject(from)) {
        for (var key in from) {
          toPlain_interation(from[key], (level + '>' + key));
        }
      } else if (Util.isArray(from)) {
        for (var key = 0; key < from.length; key++) {
          toPlain_interation(from[key], (level + '>' + key));
        }
      } else {
        tempObj[level] = from;
      }
    }

    return true;
  },

  _copyObj: function(){
    var tempObj = toWatchedObject_interation(this.From);
    this.Copy = tempObj;

    function toWatchedObject_interation(from){
      var temData;
      if (Util.isObject(from)) {
        temData = {};
        for (var key in from) {
          temData[key] = toWatchedObject_interation(from[key]);
        }
      } else if (Util.isArray(from)) {
        temData = [];
        for (var key = 0; key < from.length; key++) {
          temData.push(toWatchedObject_interation(from[key]));
        }
      } else {
        temData = from;
      }

      return temData;
    }

    return true;
  },

  _addWatch: function(){
    var temData;
    if (Util.isObject(this.From)) {
      temData = ObjectPropertySimulation(this.From);
    } else if (Util.isArray(this.From)) {
      temData = ArrayPropertySimulation(this.From);
    }

    this.Model = temData;

    return true;
  },
};

/**
 * Object.defineProperty 模拟对象的属性
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * data descriptor 保留原始数据
 * accessor descriptor 模拟对象的属性
 */
function ObjectPropertySimulation(from){
  var temData = {};

  Object.defineProperty(temData, '__from', {
    value: from,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  for (var key in from) {
    if (Util.isObject(from[key])) {
      (function(lockedKey) {
        Object.defineProperty(temData, lockedKey, {
          value: ObjectPropertySimulation(from[key]),
          writable: false,
          configurable: false,
          enumerable: true,
        });
      })(key);
    } else if (Util.isObject(from[key])) {
      // TODO
    } else {
      // 需要使用立即执行函数???
      (function(lockedKey) {
        Object.defineProperty(temData, lockedKey, {
          get: function() {
            return this.__from[lockedKey];
          },
          set: function(value) {
            this.__from[lockedKey] = value;
          },
          configurable: false,
          enumerable: true,
        });
      })(key);
    }
  }

  return temData;
}

/**
 * Object.defineProperty 模拟数组的属性
 */
function ArrayPropertySimulation(from){
  var temData = [];

  Object.defineProperty(temData, '__from', {
    value: from,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  if (Util.isObject(from)) {
    temData = {};
    for (var key in from) {
      temData[key] = ArrayPropertySimulation(from[key]);
    }
  } else if (Util.isArray(from)) {
    temData = [];
    for (var key = 0; key < from.length; key++) {
      temData.push(toWatchedObject_interation(from[key]));
    }
  } else {
    temData = from;
  }

  return temData;
}

var Util = {
  isObject: function(target){
    return target.constructor.toString().indexOf('Object') !== -1;
  },

  isArray: function(target){
    return target.constructor.toString().indexOf('Array') !== -1;
  },
};


module.exports = PlainObject;

