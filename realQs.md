<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-30 18:28:20
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-31 16:15:31
-->
# CSS
  1. **position** 属性
  2. **BFC** 生成条件以及作用
  3. **CSS** 选择器权重计算
  4. 实现布局
     1. 双列布局，左列固定宽度，右列自动填充剩余宽度
     2. 容器定宽，当文字内容不够一行时，居中显示；当文字内容超过一行时，左对齐
     3. 简述每种方案的优缺点
  5. 重绘和重排
  6. 两种方式实现 **checkbox** ，比较优缺点
  7. **CSS** 的 **import** 和 **link** 的区别

# JS
  1. 判断 **this** 指向
  2. 写出以下输出  
```javascript
    var a = 5;
    const obj = {
        a: 10,
        f1: function() {
            console.log(this.a)
        },
        f2: () => {
            console.log(this.a)
        },
        f3: function() {
            (() => {console.log(this.a)})();
        }
    }
    obj.f1();
    obj.f2();
    obj.f3();
    const outF1 = obj.f1;
    const outF2 = obj.f2;
    outF1();
    outF2();
```
  3. js 基本数据类型
  4. 原型链？运用原型链继承的继承方式？为什么 **null** 是原型链终点？
  5. **instanceof** 原理
  6. 闭包？闭包的使用场景？
  7. 什么是高阶函数？柯里化？柯里化的好处？
  8. event loop
  9. **Promise** 有几种状态？**Promise** 切换状态的方式
  10. 写出以下输出：
``` javascript
setTimeout(() => console.log("a"), 0);
new Promise((resolve) => {
    console.log("b");
    setTimeout(() => console.log("c"), 0);
    resolve();
}).then(() => {
    console.log("d");
    return new Error("throw");
}).catch(() => {
    console.log("error")
})

async function promiseCandy() {
    console.log("e");
    await promiseCandy2();
    console.log("f");
} 
async function promiseCandy2() {
    setTimeout(() => {console.log("g")}, 0);
}
promiseCandy();
console.log("h");
```
  11. 手写 **debounce** 和 **throttle**，简述各自适用业务场景
  12. **for...in** 和 **for...of** 区别
  13. 使用 es6 中的 **迭代器** 处理 Object 使其可迭代
  14. **proxy** 和 **defindProperty** 区别
  15. 深拷贝

# 编程题
1. 数组去重
2. 数组转树
```javascript
const arr = [
    {name: "a", parent: null, value: ""},
    {name: "b", parent: "a", value: ""},
    {name: "c", parent: "a", value: ""},
    {name: "d", parent: "b", value: ""},
    {name: "e", parent: "b", value: ""},
    {name: "f", parent: "d", value: ""},
    {name: "g", parent: "d", value: ""},
]

function arrToTree() {
    // ...TODO
}
```
3. 以下代码若是要使其每隔 1 秒钟分别输出 5 0 1 2 3 4,并且 5 在最先输出,可以怎么修改
```javascript
for (var i = 0; i < 5; i++) {
    setTimeOut(() => {
        console.log(i)
    }, 1000);
}
console.log(new Date(), i);
```
4. 要求串行输出 **Promise** 数组，并每次最大并行执行两个 **Promise**
```javascript
const timeArr = [
  () => new Promise((resolve) => setTimeout(resolve, 1000)).then(() => { return 1 }),
  () => new Promise((resolve) => setTimeout(resolve, 2000)).then(() => { return 2 }),
  () => new Promise((resolve) => setTimeout(resolve, 3000)).then(() => { return 3 }),
  () => new Promise((resolve) => setTimeout(resolve, 4000)).then(() => { return 4 })
]

function scheduler() {
    // TODO....
}
```
5. 要求递归实现斐波那契数列，并实现缓存功能
6. 长度为n且无重复元素的整数数组中，存在一些数字，这些数字比它们的左边所有数字都要大，并且比它们右边的所有数字都要小
```javascript
const arr = [1, 3, 4, 2, 5, 7, 9, 11, 12, 15, 10, 17]
function boundaryNumber(arr) {
    // TODO...
}
boundaryNumber(arr); // echo [1, 7, 9, 17]
```
7. 斐波那契数列
8. 实现一个大数相加的 **add** 函数
9. 长度为 n 的整数有序数组中，所有元素的大小都是 0 < x < n，找出数组中存在一对重复的数字
10. 用两个栈实现队列
11. 写一个简单的发布订阅
12. 实现 **isMatch** 方法判断括号是否匹配
```
isMatch("(){}[]"); // true
isMatch("([{}])"); // true
isMatch("({[)]}"); // false
```
13. 设计一个数据结构用以存储不同交易梯度的使用费
```
/*用户在平台上进行交易，需要交平台使用费。
平台使用费的梯度收费方案如下：
每月累计订单数每笔订单（港元）
梯度1：1-5笔30.00
梯度2：6-20笔15.00
梯度3：21-50笔10.00
梯度4：51-100笔9.00
梯度5：101-500笔8.00
梯度6：501-1000笔7.00
梯度7：1001-2000笔6.00
梯度8：2001-3000笔5.00
梯度9：3001-4000笔4.00
梯度10：4001-5000笔3.00
梯度11：5001-6000笔2.00
梯度12：6001笔及以上1.00
实现一个函数，用于计算用户一个月共计交费多少港元
假设一个用户，一个月交易了6笔订单，
则在梯度1交费共计： 30港元*5=150港元，
在梯度二交费：15港元，一共交
费165港元。*/
```
14. 给定一个整数数组，请设计一个算法，将所有的0移到末尾，同时保持非0元素的相对位置。比如给定数组[0,6,9,0,22]，输出应该为[6,9,22,0,0]

# 数学题和智力题
1.  有若干只猴子和若干个桃子,如果每只猴子分 3 个桃子,则剩下 59 个桃子,如果每只猴子分 5 个,则最后一 只猴子不够分,问有多少只猴子和多个个桃子
2.  有一人有240公斤水，他想运往干旱地区赚钱。他每次最多携带80公斤，并且每前进一公里须耗水1公斤（均匀耗水）。假设水的价格在出发地为0，以后，与运输路程成正比，（即在10公里处为10元/公斤，在20公里处为20元/公斤……），又假设他必须安全返回，请问，他最多可赚多少钱？
3.  有两桶容量一样的红色颜料 A 和蓝色颜料 B,现在从 A 桶中拿出部分倒入 B 桶,再从 B 桶中拿出部分倒入 A 桶,最终 A 桶中的红蓝颜料的比例和 B 桶中的蓝红颜料比例是什么关系。
4.  有 10 瓶,每瓶有若干瓶药片,其中 9 瓶每片药片都是 10g,有一瓶药的药片重 9g,如何通过一次称重找到 哪一瓶是 9g 的药片。如果有两瓶药里的药片重 9g 呢,又该如何称

# Vue
1. vue 的 **v-for** 中的 **key** 有什么作用？
2. 为什么不推荐数组用 **index** 作 **key**?
3. v2 中 **v-if** 和 **v-for** 哪个优先？
4. vue2 如何实现双向绑定？
5. vue 对数组做了什么处理？
6. v3 对双向绑定做了什么优化？为什么要这么做？
7. vue diff
8. vue3 新变化
9. vue 的生命周期？接口请求放在哪个地方？
10. 如何结合 **vue-router** 做页面的权限访问
11. 简述修改 data 中一个属性值引起页面响应式更新的过程
12. 组件通信
13. 多次修改属性后，页面会多次更新吗？
14. $nextTick 原理
15. 父子组件生命周期的顺序？
16. 路由懒加载的原理
17. vue 项目中做过什么优化？

# 工程化
1. **parcel** 打包原理
2. 为什么用 **parcel**
3. **babel** 如何实现低语法转义？
4. 如何实现用 **babel** 针对不同浏览器对新语法兼容的问题是否转义的问题
5. **parcel** 如何减少打包文件初始大小
6. 公司内的通用 ui库 和 颜色库 是如何制定的？规范是什么？
7. 做过什么工程化工作？
8. parcel 的 **contentHash** 规则与原理

# 浏览器与网络
1. 跨域
2. 浏览器缓存？缓存配置策略？
3. CSRF XSS 攻击及对应的防护
4. 一个页面同时发起 100 个 http 请求,   那么需要建立几次的 http 连接
5. http2 优化
6. 命中协商缓存时状态码是多少
7. 浏览器输入地址发生了什么,说出针对每一阶段的优化
8. https 如何进行安全通信
9. 说一下前段缓存，缓存时间如何制定
10. 强缓存如何更新？
11. contentHash vs 协商缓存
12. 首页加载优化
13. 从点击一个元素则触发其点击回调事件,浏览器做了什么事件？浏览器如何得知调用点击回调事件？
14. 对 cookie 有什么了解？
15. 流量控制？拥塞控制？超时重发？报文序号？

# 项目
1. 对 element-ui 二次封装的标准
2. 项目难点
3. 做过的优化有什么指标表面带来了效率和收益
4. 如果负责一个新的定制化项目，最先考虑到的是什么

# Outisde of Technology 
1. 这一年做了什么？
2. 为什么找不到工作？
3. 长时间不工作有做什么保持手感吗？
4. 离职原因
5. 对新职场有什么希望？
6. 如何看待加班？