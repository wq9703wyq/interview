/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-27 01:52:54
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-28 23:41:19
 */
// 属性只写在构造函数中避免引用类型属性被共用
function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}

// 意义不明的写法，new实例使Sub.prototype被混入Father构造函数执行的内容，实例访问sayName需要遍历多余的内容
Sub.prototype = new Father();

// Sub.prototype = Object.create(Father.prototype);
Sub.prototype.constructor = Sub;

Son.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10