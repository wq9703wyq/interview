/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 23:42:21
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-21 20:43:04
 */

function createCurry(func, ...args) {
  var funcLength = func.length;
  var args = args || [];
  return function (..._args) {
    var _args = _args || [];
    _args.push(...args);
    if (_args.length < funcLength) {
      // 未触发执行，再次柯里化收集参数
      return createCurry(func, ..._args);
    }
    return func.call(this, ..._args);
  }
}

function test(a, b, c) {
  return a + b + c;
}

const _test = createCurry(test);
console.log(_test(1)(2)(3));

// 实现一个add方法，使计算结果能满足如下的预期：
// add(1)(2)(3) = 6
// add(1, 2, 3)(4) = 10
// add(1)(2)(3)(4)(5) = 15


function add(...args) {
  const _add = function (..._args) {
    if (_args.length) {
      return add(..._args, ...args);
    }
    return args.reduce((item, count) => item + count, 0);
  }
  return _add;
}
console.log(add(1)(2)(3)());
console.log(add(1, 2, 3)(4)());
console.log(add(1)(2)(3)(4)(5)());

function addToString(...args) {
  const _addToString = function (..._args) {
    return addToString(...args, ..._args);
  }
  _addToString.toString = () => {
    return args.reduce((item, count) => item + count, 0);
  }
  return _addToString;
}

console.log(addToString(1)(2)(3) + 0);
console.log(addToString(1, 2, 3)(4) + 0);
console.log(addToString(1)(2)(3)(4)(5) + 0);