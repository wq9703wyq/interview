/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-27 23:19:56
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-27 23:41:21
 */

// 基于对象A，创造出另外一个继承A所有属性和方法的新对象，并以某种方式添加新的属性
// 与原型继承一样，引用类型的数据都会在实例间共享
// 与借用构造继承一样，在构造函数中定义的方法都没有办法复用
function createAnother(original) {
  let clone = Object.create(original);
  clone.sayHi = function() {
    console.log("hi");
  }
  return clone;
}

let person = {
  name: "Nick",
  friends: ["Shelby", "Court", "Van"]
}

let anotherPerson = createAnother(person);
let otherPerson = createAnother(person);

anotherPerson.sayHi();

anotherPerson.friends.push("Jack");
console.log(otherPerson.friends);