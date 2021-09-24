/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-21 23:02:55
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-22 00:37:54
 */
// var a = 10
// function fn() {
//   var b = 20
//   function bar() {
//     console.log(a + b) //30
//   }
//   return bar
// }
// var x = fn();
// var b = 200;
// x() //bar()

var a = "window a";


function outerFn() {
  return a;
}

function fn(a) {
  console.log(`b undefined mean has been defined: ${b}`)
  var a = "fn a";
  if (false) {
    // var 定义会将b提升到函数顶端
    var b = "var block b";
    let c = "let block c";
  }

  // 新建innerFn并赋值outerFn，无法改变输出值
  let innerFn = outerFn;
  console.log(`fn: ${innerFn()}`)

  try {
    console.log(c);
  } catch (error) {
    console.error(error)
  }
}

fn();


function constructor() {
  var a = 20;
  this.constructorFn = function () {
    console.log(`constructorFn: ${a}`);
  }
  this.constructorInner = outerFn;
  this.constructorFnCopy = function () {
    console.log(`constructorFnCopy: ${this.constructorInner()}`);
  }
}

constructor.prototype.constructorFnPro = function () {
  console.log(`constructorFnPro before let:${a}`);
  if (true) {
    let a = "a in prototype";
    console.log(`constructorFnPro after let: ${a}`);
  }
  console.log(`constructorFnPro: ${outerFn()}`);
};

var instance = new constructor();

instance.constructorFn();
instance.constructorFnCopy();
instance.constructorFnPro();
