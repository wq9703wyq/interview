/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 19:14:32
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-17 12:42:04
 */
Function.prototype.bindCopy = function (context, ...args) {
  const fn = this;
  args = args || [];
  const newFn = function (...newArgs) {
    // 判断是否使用newFn进行new操作
    const isNew = this instanceof newFn;
    context = isNew ? this : context;
    return fn.apply(context, [...args, ...newArgs]);
  }
  if (fn.prototype) {
    newFn.prototype = Object.create(fn.prototype);
    newFn.prototype.constructor = newFn;
  }
  return newFn;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.count = function () {
  console.log(`${this.x},${this.y}`)
}

var emptyObj = {};
var XPoint = Point.bindCopy(emptyObj, 1);
XPoint(3);
emptyObj.count = Point.prototype.count;
emptyObj.count();
var YPoint = new XPoint(2);
YPoint.count();

console.log(`YPoint instanceof XPoint: ${YPoint instanceof XPoint}`)
console.log(`YPoint instanceof Point: ${YPoint instanceof Point}`)
console.log(`XPoint instanceof Point: ${XPoint instanceof Point}`)