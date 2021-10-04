/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-10-04 21:19:52
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-10-04 22:01:07
 */
import modulesOuter from "./modulesOuter.js"

console.log(this); // undefined
window.code = "window";


modulesOuter.consoleCode();
modulesOuter.consoleCode.call(window);