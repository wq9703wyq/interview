/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-22 19:15:18
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-22 21:07:05
 */

// 先尝试串行运行timeArr，输出[1,2,3,4]
const timeArr = [
  () => new Promise((resolve) => setTimeout(resolve, 1000)).then(() => { return 1 }),
  () => new Promise((resolve) => setTimeout(resolve, 2000)).then(() => { return 2 }),
  () => new Promise((resolve) => setTimeout(resolve, 3000)).then(() => { return 3 }),
  () => new Promise((resolve) => setTimeout(resolve, 4000)).then(() => { return 4 })
]


async function fn(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const temp = await arr[i]();
    res.push(temp);
  }
  console.log(res);
}

// 闭包版
function closeVer(arr) {
  const res = [];
  let taskIndex = 0;
  return function _closeVer() {
    if (res.length === arr.length) {
      console.log(res);
    }
    if (taskIndex < arr.length) {
      arr[taskIndex++]().then((value) => {
        res.push(value);
        _closeVer();
      })
    }
  }
}

// fn(timeArr);
closeVer(timeArr)();

// 变种，要求并行限制promise数量为max，输出[[x, new Date()], ...]
function schedulerCreater(arr, max) {
  const res = [];
  let runnerCount = 0;
  let taskIndex = 0;
  return function _scheduler() {
    if (res.length === arr.length) {
      console.log(res);
    }
    if (runnerCount < max && taskIndex < arr.length) {
      runnerCount++;
      arr[taskIndex++]().then((value) => {
        res.push([value, new Date()]);
        runnerCount--;
        _scheduler(taskIndex);
      })
      _scheduler(taskIndex);
    }
  }
}

// const _scheduler = schedulerCreater(timeArr, 2);
// console.log(new Date())
// _scheduler();