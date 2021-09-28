/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-27 00:58:50
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-28 23:33:41
 */

function throttle(fn, wait) {
  var timer;
  const context = this;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(context, ...args);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  }
}


function Father(...args) {
  this.throttleCall = throttle(function () {
    console.log("throttleCall")
  }, 50)
}

Father.prototype.colors = ["red", "blue", "green"]; // 引用属性会被后代实例共享
Father.prototype.name = undefined;
Father.prototype.callColors = function () {
  console.log(this.colors);
}
Father.prototype.throttlePro = throttle(function () { console.log("throttlePro") }, 50);

function Son() { Father.call(this) }
Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;

var instance1 = new Son();
instance1.colors.push("black");
instance1.name = "jack";

var instance2 = new Son();

console.log(instance1.name);
console.log(instance2.name);
instance1.callColors();
instance2.callColors();
instance1.throttlePro(); // 原型链上throttlePro的仅输出一次
instance2.throttlePro();

instance1.throttleCall(); // 构造函数内的throttleCall各实例输出一次
instance2.throttleCall();

function extend(subClass, superClass) {
  // subClass.prototype = new superClass();
  subClass.prototype = superClass.prototype;

  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
function a(){}
function b(){}
extend(b,a);
var c = new a();
console.log(c instanceof a);//true
console.log(c instanceof b);//true