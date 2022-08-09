/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-28 21:56:52
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-28 22:54:43
 */
class SuperType {
  SuperOuter = "SuperOuter";
  constructor(name) {
    this.name = name;
  }
  static callSuperOuter() {
    console.log(this.SuperOuter);
  }
  publicCallSuperOuter() {
    SuperType.callSuperOuter.call(this);
  }
}
SuperType.prototype.prototypeVar = "2";

class SubType extends SuperType {
  constructor(friends) {
    super();
    this.friends = [...friends]
  }
  callFriends() {
    console.log(this.friends)
  }
}

var superInstance = new SuperType("super");
var subInstance = new SubType("sub")

superInstance.publicCallSuperOuter();
console.log(subInstance instanceof SubType);
console.log(subInstance instanceof SuperType);
console.log(superInstance instanceof SubType);
console.log(superInstance instanceof SuperType);
console.log(SubType instanceof SuperType);
console.log(SubType.prototype);
console.log(SuperType.prototype);
console.log(SubType.__proto__ === SuperType)
console.log(SubType.prototype.__proto__ === SuperType.prototype); 
console.log(SuperType.__proto__ === Function.prototype)
console.log(SuperType.prototype.__proto__ === Object.prototype); 