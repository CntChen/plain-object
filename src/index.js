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
    this.Plain = this._toPlain();
    this.Copy = this._copyObj();
    this.Model = this._addWatch();
  },

  /**
   * 把传入数据拍平
   */
  _toPlain: function(){
    var tempObj = {};
    toPlain_interation(this.From, 'cnt');
    return tempObj;

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
  },

  /**
   * 复制对象
   */
  _copyObj: function(){
    var tempObj = toWatchedObject_interation(this.From);
    return tempObj;

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
  },

  _addWatch: function(){
    var tempObj = {};

    var copy = this._copyObj();
    if (Util.isObject(copy)) {
      tempObj = ObjectPropertySimulation(copy);
    } else if (Util.isArray(copy)) {
      tempObj = ArrayPropertySimulation(copy);
    }

    return tempObj;
  },
};

/**
 * Object.defineProperty 模拟对象的属性
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * data descriptor 保留原始数据
 * accessor descriptor 模拟对象的属性
 */
function ObjectPropertySimulation(from) {
  var temData = {};

  Object.defineProperty(temData, '__from', {
    value: from,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  for (var key in from) {
    if (Util.isObject(from[key])) {
      from[key] = ObjectPropertySimulation(from[key]);
    } else if (Util.isObject(from[key])) {
      from[key] = ArrayPropertySimulation(from[key]);
    } else {
    }
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

  return temData;
}

/**
 * Object.defineProperty 模拟数组的属性
 */
function ArrayPropertySimulation(from){
  var temData = {};
  Object.defineProperty(temData, '__from', {
    value: from,
    writable: true,
    configurable: false,
    enumerable: true,
  });

  buildWatch();

  // 监控数组操作方法
  ['copyWithin', 'fill', 'push', 'pop', 'reverse', 'shift', 'sort', 'splice', 'unshift'].forEach(function(method){
    (function(lockedMethod) {
      Object.defineProperty(temData, lockedMethod, {
        value: function(){
          [][lockedMethod].apply(this.__from, arguments);
          buildWatch();
        },
        writable: false,
        configurable: false,
        enumerable: false,
      });
    })(method);
  });

  function buildWatch(){
    for(var key in temData){
      delete temData[key];
    }

    for (var key = 0; key < from.length; key++) {
      if (Util.isObject(from[key])) {
        (function(lockedKey) {
          Object.defineProperty(temData, lockedKey, {
            value: ObjectPropertySimulation(from[key]),
            writable: true,
            configurable: true,
            enumerable: true,
          });
        })(key);
      } else if (Util.isArray(from[key])) {
        (function(lockedKey) {
          Object.defineProperty(temData, lockedKey, {
            value: ArrayPropertySimulation(from[key]),
            writable: true,
            configurable: true,
            enumerable: true,
          });
        })(key);
      } else {
        (function(lockedKey) {
          Object.defineProperty(temData, lockedKey, {
            get: function() {
              return this.__from[lockedKey];
            },
            set: function(value) {
              this.__from[lockedKey] = value;
            },
            configurable: true,
            enumerable: true,
          });
        })(key);
      }
    }
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

