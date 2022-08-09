/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-22 16:16:25
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-22 16:23:34
 */
function deepClone(obj) {
  const objCopy = Array.isArray(obj) ? [] : {};

  const keys = Object.keys(obj);
  keys.forEach(item => {
    if (typeof item === "object") {
      objCopy[item] = deepClone(obj[item]);
    } else {
      objCopy[item] = obj[item]
    }
  })
  return objCopy;
}

const originObj = {
  text: "fn",
  date: new Date(),
  fn: function() {console.log(1)}
}

const cloneObj = deepClone(originObj);

console.log(originObj === cloneObj);
console.log(originObj, cloneObj);