/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-22 18:36:39
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-22 19:14:59
 */
class Scheduler {
  constructor(len) {
    this.sub = [];
    this.runnerLimit = len;
    this.runnerCount = 0;
  }
  add(promiseCreator) {
    this.sub.push(promiseCreator);
  }
  addRuuner() {
    if (this.runnerCount < this.runnerLimit && this.sub.length) {
      this.runnerCount++;
      this.sub.shift()().then(() => {
        this.runnerCount--;
        this.addRuuner();
      })
    } else {
      return;
    }
    this.addRuuner();
  }
}

const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order, new Date())))
}

addTask(1000, '1');
addTask(2000, '2');
addTask(3000, '3');
addTask(4000, '4');

scheduler.addRuuner();

