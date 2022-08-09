/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-02-17 12:27:41
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-02-17 12:45:33
 */

const test = Array(100).fill([]).map(item => Array(10).fill(null).map(item => Math.floor(Math.random() * 100)))


function removeDuplicate(arr) {
  return arr.flat().reduce((prev, next) => prev.includes(next) ? prev : [...prev, next], [])
}

console.log(removeDuplicate(test));