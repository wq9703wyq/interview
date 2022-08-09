/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 19:45:10
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-20 19:50:20
 */
function throttle(fn, wait) {
  var timer;
  return function (...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(function () {
        fn.call(context, ...args);
        timer = null
      }, wait)
    }
    return timer
  }
}