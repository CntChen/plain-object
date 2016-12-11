# plain-object
> 把数据（对象或数组）拍平，并提供数据变化监控


## Object Simulation
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
* 对象的 enumerable 属性都不能删除
* 对象作为其他对象的属性，不能删除；对象在数组中，可以删除整个对象
* 对象的属性为基本类型,使用 access descriptor,可以修改属性，不能删除
* 对象的属性为对象时，使用 data descriptor,可以修改属性,不能删除,可以修改该属性的属性
* 对象的属性为数组时，使用 data descriptor,可以修改属性,不能删除,可以修改该属性的属性

## Array Simulation
* 数组使用对象(constructor为Object)来模拟
* 将所有改动数组数据的方法都重写一遍
  Mutator methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
* 数组属性都可以删除
* 数组作为对象的属性不能删除，作为父数组中一项可以删除
* 数组的属性为基本类型，index assignment 使用 access descriptor 来模拟
* 数组的属性为对象，使用 data descriptor 来模拟，可以修改/删除属性
* 数组的属性为数组，使用 data descriptor 来模拟，可以修改/删除属性