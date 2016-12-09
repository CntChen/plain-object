PlainObject.prototype = {
  constructor: PlainObject,

  _init: function(){
    this._toPlain();
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
      if (from.constructor.toString().indexOf('Object') !== -1) {
        for (var key in from) {
          toPlain_interation(from[key], (level + '>' + key));
        }
      } else if (from.constructor.toString().indexOf('Array') !== -1) {
        for (var key = 0; key < from.length; key++) {
          toPlain_interation(from[key], (level + '>' + key));
        }
      } else {
        tempObj[level] = from;
      }
    }

    return true;
  },

  _addWatch: function(){
    var tempObj = toWatchedObject_interation(this.From);
    this.Model = tempObj;

    function toWatchedObject_interation(from){
      var temData;
      if (from.constructor.toString().indexOf('Object') !== -1) {
        temData = {};
        for (var key in from) {
          temData[key] = toWatchedObject_interation(from[key]);
        }
      } else if (from.constructor.toString().indexOf('Array') !== -1) {
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

};

