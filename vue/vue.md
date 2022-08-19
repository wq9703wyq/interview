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

# 7. Vue 权限管理方案
   1. 页面权限： 后端将 `页面路由信息` 存在数据库中，用户登录时后端将 `用户角色` 对应的 `页面路由信息` 发送给前端，前端再使用 `route.addRoute` 将页面路由添加到实例内
   2. 按钮权限：同样后端将 `用户角色` 对应的 `按钮权限` 发送给前端，前端通过按钮预先设置的 `v-if`、`v-show` 或者 封装好的自定义指令来控制按钮的状态

# 8. vue 数据响应式
   1. 数据响应式就是能够**使数据变化可以被检测并对这种变化做出响应**的机制
   2. MVVM框架解决的最核心的一个问题就是 **数据层和视图层** 的链接，数据变化，视图更新，为了实现这一需求就需要对数据做监听响应式处理
   3. 以 Vue 为例子，如果需要控制列表元素的样式，可以通过 `computed` 使用一个或多个变量控制返回的类名，但如果是 jquery，则需要手动遍历列表元素修改类名，这就是 `数据响应式` 带来的开发的便捷
   4. vue2 中通过 `defineProperty()` 的方式来定义对象的 `get()` 和 `set()`，以此实现数据拦截；但是 `defineProperty()` 是对对象的属性的监听，当直接修改对象类的属性时，与修改对象相关的 `computed` 和 `watch` 并不会被触发，也就是说这种情况下无法被拦截，因此额外提供了 `Vue.set/delete` 来弥补，同样数组本身的push、shift、unshift等方法也是无法拦截的，因此 vue 重写这些数组函数并覆盖原型上的函数
   5. vu3 则通过 proxy 来实现数据的拦截，而 `proxy` 是对对象本身的监听和 `defineProperty()` 对对象的属性监听是不同的，这意味着无论是对象属性的修改还是数组原型的方法，vue无需做额外操作都能拦截到，并且vue还利用这特性做了 `懒加载` 的优化，vue2 中数据初始化会对 `data` 返回的对象进行深度遍历监听，但是 vue3 由于 `proxy` 可以拦截到对对象属性的访问，因此初始化只做了第一层的监听，并在访问到对象属性时，再对访问属性进行监听

# 9. vue 虚拟dom
   1. 虚拟dom 是对视图抽象化，描述了视图的结构的 js 对象
   2. 将真实dom元素抽象成 VNode，减少直接操作 dom 次数
      -  一个 dom 元素所包含的内容是十分庞大的，并且其中许多属性并不被开发者所关注；所以无论对 dom 元素的直接 diff，还是 clone 操作都会带来额外且没有必要的开销，前者额外 diff 了不关注的内容，后者则是额外花费内存去存储无意义内容
      -  频繁地移动、删除、添加 dom 元素是比较昂贵的操作，频繁地操作 dom 会多次引起页面的重绘、回流，但是以 VNode 为基础的 diff 操作，能够找出最小的改动，有效减少操作 dom 带来的重绘和回流
   3. 组件初始化过程中，`<template>` 会被编译器编译成渲染函数，再由 `render` 函数调用，返回虚拟dom，并在后续的 `patch` 过程中被转化为真实dom；初始阶段结束后，如果某些响应式数据发生了变化，将会再次调用 `render`，并返回新的虚拟dom，并且和旧的虚拟dom进行 `diff`，获得最小量的更新操作。
# 10. diff
   1. vue 的 diff 算法在响应式数据更新后执行，执行 `render` 函数后获得新的虚拟dom，并传入新旧虚拟dom，通过比较两者找到最小的改动，并且转化为真实dom
   2. v2 中 diff 是一个深度优先、同层比较的递归过程：
      1. v2中比较vnode的方法叫做 `smaecode`，会根据节点的 `key`、属性、节点类型作比较判断是否相同
      2. 首先会判断两个节点是否相同，如果不同则直接删除重建
      3. 如果相同会判断新节点是否为文本节点，如果是则会更新文本内容
      4. 如果新旧节点都有子节点，则会比较子节点，否则直接更新新节点
      5. 比较子节点时会使用 `双端比较`
         -  通过比较新旧节点列表的两端，来判断节点是否在同层移动
         -  如果新旧节点不一致，则会继续判断是否为文本节点或比较子节点列表
   3. v3 中使用 `patchFlags` 标记能够更新的动态节点，避免v2中比较静态节点产生的浪费，并且 `patchFlags` 的值能够表示节点动态的部分是text、class、style或者复合动态内容，以此实现靶向更新
   4. v3 中的 `render` 渲染函数并不直接包含虚拟节点的数据结构，而是一个个用于创建虚拟接的的函数 `createVnode`，在每次更新后都会重新执行 `render` 以及它包含的 `createVnode`，但是对于静态节点的 `createVnode` 重新执行是没有必要的，因此静态节点的只会在初始化时执行一次 `createVnode` 并保存执行结果，每次更新直接调用保存的执行结果
   5. 而连续的静态节点，v3 会直接保存字符串化的真实dom节点


      
