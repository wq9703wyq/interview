/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-22 18:08:41
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-22 18:30:33
 */
const testPromise = new Promise((resolve) => {
  let i = 0;
  resolve(++i);
})

testPromise.then((i) => {
  console.log(i);
  return ++i;
}).then((i) => {
  console.log(i)
  return new Error("resolve error");
}).then((i) => {
  console.log("this time will error");
  console.log(i);
}).catch(() => {
  console.log("catch error")
})

const thenAble = {
  then: (resolve) => {
    console.log("thenAble");
    resolve("thenAble resolve")
  }
}

const thenPromise = new Promise((resolve) => {
  let i = 10  ;
  resolve(++i);
})

thenPromise.then((i) => {
  console.log(i);
  return Promise.resolve(thenAble);
}).then((msg) => {
  console.log(msg)
})