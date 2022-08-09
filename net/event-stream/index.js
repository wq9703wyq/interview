/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-11-08 17:14:58
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-11-09 00:54:19
 */
const outer = document.querySelector("#outer");
outer.addEventListener("mouseenter", (ev) => {
  console.log("outer");
  // ev.stopPropagation();
}, true);
const inner = document.querySelector("#inner");
inner.addEventListener('mousedown', () => {
  console.log("inner")
}, true)
const trigger = document.querySelector("#trigger");
trigger.addEventListener("click", (ev) => {
  console.log("trigger冒泡");
}, false)
trigger.addEventListener("click", (ev) => {
  console.log("trigger捕获");
}, true)
// trigger.addEventListener("mouseenter", (ev) => {
//   console.log("mouseenter捕获");
// }, true)