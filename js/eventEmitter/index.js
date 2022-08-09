/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-02-17 12:02:56
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-02-17 12:12:34
 */
const EventEmit = function() {
  this.events = {};
  this.on = function(name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb)
    } else {
      this.events[name] = [cb]
    }
  }

  this.trigger = function(name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach(event => {
        event(...arg)
      })
    }
  }
}

let events = new EventEmit();
events.on("success", () => {
  console.log("更新消息中心")
})

events.on("success", () => {
  console.log("更新订单信息")
})


events.trigger("success");
