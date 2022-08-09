/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-14 13:15:25
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-15 01:16:09
 */
for (var i = 0; i < 5; i++) {
  function inner(j) {
    setTimeout(() => {
      console.log(new Date(), j);
      }, i * 1000 + 1000);
  }
  inner(i);
 }
 console.log(new Date(), i);
 addEventListener.p