/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 20:01:29
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-20 20:14:03
 */
function nameLess(x, y) {
  this.x = x;
  this.y = y;
}

nameLess.prototype.test = function() {
  (function(){console.log(`nameLess x: ${this.x}, y: ${this.y}`)})();
  (function(){console.log(`call nameLess x: ${this.x}, y: ${this.y}`)}).call(this);
}
const arrowTest = () => {
  console.log(`window x: ${this.x}, y: ${this.y}`);
  (function(){console.log(`arrow nameLess x: ${this.x}, y: ${this.y}`)})();
  (function(){console.log(`arrow call nameLess x: ${this.x}, y: ${this.y}`)}).call(this);
}

nameLess(1, 2)
const temple = new nameLess(1, 3);
temple.test();
temple.arrowTest = arrowTest;
temple.arrowTest();
console.log(`window x: ${x}, y: ${y}`);