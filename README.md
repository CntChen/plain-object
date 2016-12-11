##



## Object Simulation
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
* 对象的属性为基本类型,使用access descriptor,可以修改，不能删除
* 对象的属性为对象时，使用data descriptor,不能修改删除对象,可以修改该属性的属性

## Array Simulation
* 数组新建
* 将所有改动数组数据的方法都重写一遍
  Mutator methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
* 数组对象本身不能删除，数组属性可以删除