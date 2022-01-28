/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-20 19:51:53
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-12-26 19:05:32
 */
function debounce(fn, wait) {
  var timer;
  return function(...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...args);
      timer = null;
    }, wait);
  }
}