<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-16 17:33:56
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-17 02:24:27
-->
1. ## vue2 数据绑定原理
   1. **observer** 函数对数据对象进行递归遍历生成 **Observer** 对象，使用 **Object.defineProperty()** 对 **Object** 和 基本类型数据 进行数据劫持；对于 **Array** 则递归遍历其属性，只对 **Object** 和 **Object**属性中的基本类型数据 进行数据劫持；同时每一个 **Observer** 对象都会绑定一个 **Dep** 对象用于收集 **Watcher**
   2. **Dep** 类会收集各个阶段生成的 **Watcher**，并且会在所属值发生变化时调用 **notify** 去调用收集的 **Watcher** 的 **update** 方法进行更新
   3. **Watcher** 对象会在生成时将自身存储在 **Dep** 类的的 **static属性** 中，并且被各个 **Dep** 收集
   4. **Watcher** 主要在 **watch**，**computed**，**mount** 阶段初始化时生成