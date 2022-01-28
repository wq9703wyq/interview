/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 22:04:56
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-10-30 01:06:55
 */
var obj = {
  x: 4,
  count: () => {
    console.log(`obj: ${this.x}`)
  }
}
function Constructor(x) {
  this.x = x;
  (() => {console.log(`Constructor: ${this.x}`)})(); // 1
  var innerXConsole = () => {
    console.log(this.x);
  }
  var outerXConsole = obj.count;
  innerXConsole(); // 1
  outerXConsole(); // 2
}

Constructor.prototype.count = function () {
  console.log(this.x); // 1
  function innerFn() {
    console.log(`innerFn: ${this.x}`)
  }
  innerFn(); // 2
  const innerArrowFn = () => {
    console.log(`innerArrowFn: ${this.x}`);
  }
  innerArrowFn(); // 1
  Constructor_Obj.count.call(this, "call in Constructor"); // 1
  var temple = Constructor_Obj.count;
  temple("reDefine in Constructor"); // 2
  return innerArrowFn;
}

var Constructor_Obj = {
  x: 3,
  count: function (...args) {
    const innerArrowFn_Obj = () => {
      console.log(`innerArrowFn_Obj: ${this.x}，${args.join(",")}`);
    }
    innerArrowFn_Obj();
  }
}

var x = 2;
var xTemple = new Constructor(1);
var popCount = xTemple.count();
popCount(); // 1
Constructor_Obj.count(); // 3
obj.count(); // 2

function argsArrow() {
  const innerArgsArrow = (...args) => {
    console.log([...args, ...arguments]);
  }
  return innerArgsArrow;
}

argsArrow(3,4,5)(1,2);


