/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-27 23:55:25
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-28 00:01:28
 */
function SuperTyoe(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperTyoe.prototype.sayName = function() {
  console.log(this.name);
}

function SubType(name, age) {
  SuperTyoe.call(this, name);
  this.age = age;
}

SubType.prototype = Object.create(SuperTyoe.prototype);
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function() {
  console.log(this.age);
}

