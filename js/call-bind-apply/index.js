/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 17:21:47
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-20 19:16:17
 */
Function.prototype.callCopy = function (context, ...args) {
  context = context || window;
  args = args || [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}

Function.prototype.applyCopy = function (context, args) {
  context = context || window;
  args = args || [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}


function test(key) {
  console.log(this[key])
}
var a = { str: 1 };
test.callCopy(a, "str");
