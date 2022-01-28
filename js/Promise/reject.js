/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-22 18:28:16
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-22 18:34:00
 */
const rejctPromise = new Promise((resolve) => {
  let i = 0;
  resolve(++i);
})

rejctPromise.then((i) => {
  console.log("first");
  throw "first error"
}).catch((i) => {
  console.error(i)
})

rejctPromise.then((i) => {
  console.log("second");
  return Promise.reject("second error");
}).catch((i) => {
  console.error(i)
})