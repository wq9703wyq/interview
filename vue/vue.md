<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-01-16 17:33:56
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-01-17 02:24:27
-->
# 1. vue2 数据绑定原理
   1. **observer** 函数对数据对象进行递归遍历生成 **Observer** 对象，使用 **Object.defineProperty()** 对 **Object** 和 基本类型数据 进行数据劫持；对于 **Array** 则递归遍历其属性，只对 **Object** 和 **Object**属性中的基本类型数据 进行数据劫持；同时每一个 **Observer** 对象都会绑定一个 **Dep** 对象用于收集 **Watcher**
   2. **Dep** 类会收集各个阶段生成的 **Watcher**，并且会在所属值发生变化时调用 **notify** 去调用收集的 **Watcher** 的 **update** 方法进行更新
   3. **Watcher** 对象会在生成时将自身存储在 **Dep** 类的的 **static属性** 中，并且被各个 **Dep** 收集
   4. **Watcher** 主要在 **watch**，**computed**，**mount** 阶段初始化时生成

# 2. Vue 组件通信方式
   1. ### 组件常用通信有以下8种:  
      - props
      - $emit / ~~$on~~
      - ~~$children~~ / $parent
      - $attrs / ~~$listeners~~
      - ref
      - $root
      - eventBus
      - vuex
   2. ### 按照层级关系可以这么区分
      - 父子组件
         - props / $emit / $parent / $attrs / ref
      - 兄弟组件
         - $parent / $root / eventBus / vuex
      - 跨层级关系
         - eventBus / vuex / provide + inject

# 3. v-if 和 v-for 的优先级
   1. ### v2 版本
      v2 中，v-for 的优先级高于 v-if，当它们作用于同一个元素时，就会先执行循环再判断条件，并且当列表中一小部分变化时，也会重现遍历整个列表
   2. ### v3 版本
      v3中，v-if 的优先级高于 v-for，若果 v-if 中判断的变量来自于 v-for，就会因为变量不存在而导致异常
   3. ### 一般解决方法
      1. 使用计算属性，返回过滤后的列表
      2. 在元素外层包裹一层 `<template>`，v-for 和 v-if 分开作用于 `<template>` 和 元素
# 4. 简述 Vue 的生命周期以及每个阶段做的事
   | V2 | V3 | 描述 |
   | :---:| :---: | :---: |
   |beforeCreate|beforeCreate|组件实例被创建前|
   |created|created|组件实例创建完成|
   |beofreMount|beofreMount|组件挂载之前|
   |mounted|mounted|组件挂载到实例后|
   |beforeUpdate|beforeUpdate|组件数据变化，更新前|
   |updated|updated|数据更新之后|
   |beforeDestroy|beforeUnmounted|组件实例销毁前|
   |destroyed|unMounted|组件实例销毁之后|
   |activated|activated|keep-alive 缓存的组件激活时|
   |deactivated|deactivated|keep-alive 缓存的组件停用时调用|

   1. 实践阶段
      - beforeCreate: 通常用于插件开发中执行一些初始化任务
      - created: 组件初始化完毕，可以访问computed、data，适合请求接口数据
      - mounted: dom 已创建，可用于获取访问数据和 dom 元素，此阶段可访问子组件
      - beforeunmounted: 实例被销毁前调用，清除定时器
      - unMounted: 销毁实例，清除实例与其他实例的链接

# 5. v-model 简述
   1. vue 提供双向绑定指令 `v-model` ，用于简化 `:value` 和 `@input` 的数值绑定和事件监听代码
   2. 对于不同的表单元素 `v-model` 会监听不同的事件，
      - input: @input
      - text、textarea: @input
      - checkbox、radio: @change
      - select: @change
   3. v2 和 v3 的区别
      -  v2 中提供自定义选项 `model` 用于指定组件绑定的 `prop` 和监听的事件 `event`
      -  v3 中由组件定义的 `update:modelvalue` 为默认绑定，并且可以额外绑定 `update:[prop]` 来绑定多个 `prop`，上级元素则使用 `v-model:[prop]` 来指定监听数据

# 6. 子组件能否改变父组件数据
   1. 子组件可以通过 $parent，provide/inject，$emit 去改变父组件数据
   2. 但是根据官方文档，所有 props 都遵循 `单向绑定` 原则，即 props 只能因为父组件更新而变化，由父组件自然地流向子组件，而不能由子组件直接修改 props 而使父组件更新，防止数据流向变得混乱(特别是在多个子组件的组件中)
   3. 同理，使用 $parent 去直接修改父组件的状态也是慎之又慎