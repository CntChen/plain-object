var PlainObject = require('../src/index.js');

// var testObject = [{
//   "name": "头部项目",
//   "desc": "",
//   "type": "list",
//   "list": [{
//     "name": "医美测试商品一",
//     "desc": "参考价 &yen; 1000.10",
//     "return": "{\"productId\":\"2016111700000138\",\"skuId\":\"2016111700000595\",\"productName\":\"医美测试商品一\",\"unitPrice\":\"1000.10\",\"categoryId\":\"22001\"}",
//     "selected": false,
//     "type": "itemContent"
//   }, {
//     "name": "医美测试商品二",
//     "desc": "参考价 &yen; 1000.10",
//     "return": "{\"productId\":\"2016111700000139\",\"skuId\":\"2016111700000596\",\"productName\":\"医美测试商品二\",\"unitPrice\":\"1000.10\",\"categoryId\":\"22001\"}",
//     "selected": false,
//     "type": "itemContent"
//   }, {
//     "name": "医美测试商品三",
//     "desc": "参考价 &yen; 99.12",
//     "return": "{\"productId\":\"2016111700000140\",\"skuId\":\"2016111700000599\",\"productName\":\"医美测试商品三\",\"unitPrice\":\"99.12\",\"categoryId\":\"22001\"}",
//     "selected": false,
//     "type": "itemContent"
//   }]
// }, {
//   "name": "身体项目",
//   "desc": "",
//   "type": "list",
//   "list": [{
//     "name": "医美身体项目一",
//     "desc": "参考价 &yen; 1000.10",
//     "return": "{\"productId\":\"2016111700000141\",\"skuId\":\"2016112200000002\",\"productName\":\"医美身体项目一\",\"unitPrice\":\"1000.10\",\"categoryId\":\"22002\"}",
//     "selected": false,
//     "type": "itemContent"
//   }, {
//     "name": "医美身体项目二",
//     "desc": "参考价 &yen; 99.12",
//     "return": "{\"productId\":\"2016111700000142\",\"skuId\":\"2016112200000003\",\"productName\":\"医美身体项目二\",\"unitPrice\":\"99.12\",\"categoryId\":\"22002\"}",
//     "selected": false,
//     "type": "itemContent"
//   }, {
//     "name": "医美身体项目三",
//     "desc": "参考价 &yen; 1000.10",
//     "return": "{\"productId\":\"2016111700000143\",\"skuId\":\"2016112200000006\",\"productName\":\"医美身体项目三\",\"unitPrice\":\"1000.10\",\"categoryId\":\"22002\"}",
//     "selected": false,
//     "type": "itemContent"
//   }, {
//     "name": "医美测试商品1243",
//     "desc": "参考价 &yen; 1500.00",
//     "return": "{\"productId\":\"2016113000000005\",\"skuId\":\"2016113000000016\",\"productName\":\"医美测试商品1243\",\"unitPrice\":\"1500.00\",\"categoryId\":\"22002\"}",
//     "selected": false,
//     "type": "itemContent"
//   }]
// }];

// var myPlainObject = new PlainObject(testObject);
// console.log('From:\n', myPlainObject.From);
// console.log('Plain:\n', myPlainObject.Plain);
// console.log('Copy:\n', myPlainObject.Copy);
// console.log('Model:\n', myPlainObject.Model);


// pure Object test
console.log('===pure Object test===');
var test_pure_object = {
    "name": "医美测试商品一",
    "desc": "参考价 &yen; 1000.10",
    "return": "{\"productId\":\"2016111700000138\",\"skuId\":\"2016111700000595\",\"productName\":\"医美测试商品一\",\"unitPrice\":\"1000.10\",\"categoryId\":\"22001\"}",
    "selected": false,
    "type": "itemContent",
    "testObject": {
      a: 1,
      b: 2,
    },
  };

var my_pure_object = new PlainObject(test_pure_object);
console.log('From:\n', my_pure_object.From);
console.log('Plain:\n', my_pure_object.Plain);
console.log('Copy:\n', my_pure_object.Copy);
console.log('Model:\n', my_pure_object.Model);

console.log(my_pure_object.Model.name);
console.log(my_pure_object.Model.name = 'changed');
console.log(my_pure_object.Model.name);
for(var key in my_pure_object.Model){
  console.log(key);
}

console.log(my_pure_object.Model.testObject);
console.log(my_pure_object.Model.testObject.a);
console.log(my_pure_object.Model.testObject.a = 'changed');
console.log(my_pure_object.Model.testObject.a);

console.log(my_pure_object.Model.testObject = {c:1, d:2});
console.log(my_pure_object.Model.testObject);

// pure Array test
console.log('===pure Array test===');
var test_pure_array = ['1' '2']

var my_pure_array = new PlainObject(test_pure_array);
console.log('From:\n', my_pure_array.From);
console.log('Plain:\n', my_pure_array.Plain);
console.log('Copy:\n', my_pure_array.Copy);
console.log('Model:\n', my_pure_array.Model);