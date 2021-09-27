/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-27 00:43:49
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-27 00:56:02
 */

// 通过子类call执行父类构造函数而继承属性，并且各个实例不共享属性

function Father(...args) {
  this.colors = ["red", "blue", "green"];
  this.callColors = function() {
    console.log(this.colors);
  }
}
function Son(...args) {
  Father.call(this, ...args);//继承了Father,且向父类型传递参数
}
var instance1 = new Son();
instance1.colors.push("black");

var instance2 = new Son();

instance1.callColors();
instance2.callColors();