/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-26 23:48:21
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-27 00:35:13
 */
function question1() {
  var A = function () { };
  A.prototype.n = 1;
  var b = new A();
  A.prototype = {
    n: 2,
    m: 3
  }
  var c = new A();

  var B = function () { };
  B.prototype = Object.create(A.prototype);
  B.prototype.constructor = B;

  A.prototype = {
    n: 4,
    m: 5
  }

  var d = new B();

  console.log(b.n);  // 1
  console.log(b.m); // undefind

  console.log(c.n); // 2
  console.log(c.m); // 3

  console.log(d.n); // 2
  console.log(d.m); // 3
}

// question1();

function question2() {
  var F = function () { };
  Object.prototype.a = function () {
    console.log("a");
  }

  Function.prototype.b = function () {
    console.log("b");
  }

  var f = new F();

  f.a();  // a
  f.b(); // undefind

  F.a(); // a
  F.b(); // b
}

// question2();


function question3() {
  function Person(name) {
    this.name = name
  }
  let p = new Person('Tom');

  // p.__proto__ = Object.prototype
  //  Person.__proto__ = Function.prototype
}

question3();

var Par = function() {};
var Son = function() {};

Son.prototype = new Par();