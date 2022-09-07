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

# 11. patchFlags 和 Block
   1. v2 中 diff 是不区分动态与静态节点的，这会导致性能的浪费
   2. v3 针对这个缺点加入了 `patchFlags` 属性，该属性附着在动态节点上，用于区分动态节点，同时 `patchFlags` 不同的值还代表节点所含有的动态内容，例如：动态的属性、动态的text，可以在 diff 过程中实现靶向更新
   3. 同时 v3 还有用于收集动态节点的虚拟节点 `Block`，`Block` 比其他普通节点还多一个 `dynamicChildren` 用于收集动态节点，并且 `Block` 不仅收集直接的子节点，还能够收集所有动态子节点
   4. 一般来说，`template` 中的**根节点**必然是一个 `Block`，但是由于 vue 中存在 `v-if`、`v-for` 这种能使 `DOM` 结构不稳定的要素而使 `Block` 更新失效
      - 如果 `v-if` 和 `v-else` 所包含的 `DOM` 结构不一致，在变量变化，发生 `diff` 时，由于框架只收集了变化前的 dom 节点，因此就算变化后有新增 dom 节点也不会参与 `diff`
      - 对于 `v-if` 的情况，v3 会将所有 `v-if`、`v-else-if`、`v-if` 视作单独的 `Block`，在收集阶段会被收集到 `父Block` 中，而 `父Block` 不会收集他们的动态子节点，在 `diff` 阶段通过深度优先递归再去访问他们的动态子节点
      - 同样在 `v-for` 中，v3 也会将 `v-for` 视作 `Block` 用于解决 `父Block` 的 `dynamicChildren` 结构不稳定的问题
      - 但是如果 `v-for` 中使用动态变量进行渲染，这会导致 `v-for` 本身的 `dynamicChildren` 结构不稳定，而 v3 则放弃使用 `dynamicChildren` 来进行 `diff`，而回退到 v2 使用 `children` 来代替

# 12. v3 的 diff
   1. v3 中 diff 依旧遵循深度优先、同层比较的原则，但是由于 `patchFlags` 的存在使得 v3 能够快速找出动态节点，并根据 `patchFlags` 的值找出节点上动态的部分
      1. 首先会对新旧节点列表从头开始一一比较，如果不一致则中断
      2. 再次对新旧节点列表从尾部开始一一比较，如果不一致则中断
      3. 如果旧节点遍历完毕，则说明新节点列表较长，有产生新的节点，遍历插入新节点
      4. 如果新节点遍历完毕，则说明新节点列表较短，有旧的节点消失，遍历删除旧节点
      5. 如果新旧节点列表都没有遍历完毕，则说明有部分节点相对位置发生了变化：
         - 遍历新节点列表未处理节点生成 `key-index` 的 map
         - 新建 `newIndexToOldIndexMap`（`<newIndex, oldIndex>`） 遍历旧节点列表，
         如果当前旧节点存在对应新节点，则将 `oldIndex` 存入 `newIndexToOldIndexMap` 对应的新节点下标中；
         遍历完毕后会得到一个 `<newIndex, oldIndex>` 的数组，值为 0 代表下标对应的节点新生成，非 0 则是新节点在旧节点列表中对应的位置
         - 获得 `newIndexToOldIndexMap` 的 `最长递增子序列`，遍历 `newIndexToOldIndexMap`:
            - 值为 0 的节点为新生成的节点，执行插入操作
            - 值非 0 的节点如果在 `最长递增子序列` 中，则说明该节点的相对位置并没有发生改变，不作处理；如果不在 `最长递增子序列` 中，则说明节点相对位置发生改变，执行移动操作
   2. 相对于 v2 中的 diff，v3 中由于使用了 `最长递增子序列` 去保存相对位置未发生改变的节点，因此实际上只对位置发生了改变的节点执行了移动操作，因此 `最长递增子序列` 越长 v3 的优点则越显著

# 13. key 的作用
   1. key 是高效地 `diff` 不可或缺的要素
   2. key 是**判断两个节点是否为同一个节点的必要条件之一**，如果两个相似的节点都没有定义 key，vue 也会把他们认作是同一个节点（n1.key === n2.key），哪怕他们不是同一个节点，而且在 `diff` 中，如果判断两个节点相同，那就会发生深度优先的子节点比较，这会造成性能的浪费
   3. 并且 key 还用做 `旧节点Map` 的下标，如果节点没有定义下标，那么 vue 就会遍历整个旧节点列表试图找到相同的节点，这也会造成性能的浪费
   4. 所以对于动态节点，特别是类似 `v-for` 这种会产生大量动态节点的场景，需要对所有子节点设置 key 且 key 值不应该使用更新后顺序不会发生变化的字符串数组

# 14. nextTick 原理
   1. `nextTick` 是一个 Vue 提供给我们便于获取更新后的 dom 状态的全局 API
   2. 由于 vue 中更新响应式数据时，最终的 DOM 的更新并不是同步的，而是 Vue 会将这些数据更新存到一个队列中并等待下一个 tick 再执行
   3. v2 中 `nextTick` 将我们传入的函数存进一个队列中，并且该队列执行时间比更新视图要晚，因此 `nextTick` 中的函数自然能拿到更新后的视图，v2 中通过 Promise、MutationObserver、setImmediate、setTimeout 来执行异步任务
   4. v3 则直接通过 Promise 来实现异步，v3 中如果 `nextTick` 有传入函数则通过 `then` 来挂载传入函数，如果传入为空则直接返回主任务队列的 Promise

# 15. watch 和 computed 的区别
   1. ``computed`` 用于 **描述响应式数据的复杂逻辑**，而 ``watch`` 则是 **随响应式数据变化而执行回调函数**
   2. ``computed`` 一般会返回一个只读 ``ref`` 复用于模板或者其他函数上，但如果额外传入 ``set`` 方法获得可写的 ``ref``，但就算 ``computed`` 能够修改其他数据，也不应该在 ``computed`` 做 **异步操作或者修改DOM**，因为这会破坏 ``computed`` 只计算属性和返回值的原则，并且异步操作还会让 ``computed`` 的使用变得更加复杂
   3. ``watch`` 监听一个响应式数据，并在他状态变化后执行一些额外的dom操作或者异步操作，因此复杂逻辑应该在 ``watch`` 中实现而不是 ``computed``，同时由于 ``computed`` 返回的 ``ref`` 本身就是一个响应式数据，因此 ``watch`` 也能够监听 ``computed``
   4. ``computed`` 由于存在缓存的特性，只要依赖的数据不发生变化就不会重新计算，因此相比于使用函数每次 `getter` 重新计算，`computed`有更好的性能

# 16. 从 0 到 1 构建一个vue项目
   1. 由于 `vite` 有更多的社区支持，所以会选择 `vite` 来创建项目
   2. 接着会引入 vue 常用的插件，使用 `vue-router` 来控制路由，`pinia` 来做全局store，ui库则使用 `element-plus`、`antd-vue`又或者 `vuetify`，通信方面使用 `axios`
   3. 代码规范结合使用 `prettier`、`eslint`、`stylelint` 和他们各自的 vue 推荐配置
   4. 提交规范则使用 `husky` 定义钩子执行 `commitlint` 和 `lint-staged`

# 17. vue3 响应式的实现
   1. 与 vue2 中 `Object.defineProperty` 劫持对象的读写类似，vue3 中使用 `proxy` 来劫持对象的读写
   2. 在触发 `getter` 时， 执行 `track` 收集依赖，
      1. 收集的依赖由会存储在由 `上层WeakMap 和 下层Map` 构成的特殊结构中，
         - `WeakMap` 的键是原始对象 **target**，`WeakMap` 的值是原始对象 **target** 对应的 `Map`
         - **target** 的 `Map` 的键是原始对象 **target** 的 **key**，值则是关联 **key** 的副作用函数 `Set`
         - 使用这种结构的原因是，`WeakMap` 的弱引用特性会在用户对 **target** 没有引用的情况下会由 `垃圾回收器` 直接回收 **target**；但是 `Map` 是强引用类型，即使用户实际上没用引用 **target** ，**target** 也会一直占用内存，最终导致内存溢出
   3. 在触发 `setter` 时，执行 `trigger` 派发通知收集的副作用函数

# 18. `track` 的优化
   1. 我们都知道 `v-if` 与 `v-for` 都是在控制元素是否存在，若元素不存在则其中的依赖也没有收集的必要，但是也存在例外的情况：
   ```html
      <div v-if="isShow">{{msg}}</div>
      <button @click="isShow = false"></button>

      <script setup>
         const isShow = ref(true);
         const msg = ref("msg")
      </script>  
   ```
   以上例子中，初始化会收集 `msg` 的依赖，但是 `isShow` 为 false 后不渲染 div，收集或者执行 `msg` 依赖就没有意义  
   2. 对于这种情况，就需要及时清除空依赖；为了明确 `effect` 和依赖间的关系，vue3 在每个 `effect` 上添加 `deps` 属性用于存放对应的依赖，有这个关系后，每次执行 `effect` (记为 **A**) 时都会执行 `cleanup` 清除 **A** 上的 `deps` 数组，并且删除 `deps` 数组中的每一个依赖收集的 **A**；之后再次触发 `track` 时再将  **A** 收集起来，这样子就能保持收集来的依赖都是有意义的  
   3. 在实际开发中，经常发生 **effect嵌套** 的情况,
   ```javascript
      const counter = reactive({ 
         num: 0, 
         num2: 0 
      }) 
      function logCount() { 
         effect(logCount2) 
         console.log('num:', counter.num) 
      } 
      function count() { 
         counter.num++ 
      } 
      function logCount2() { 
         console.log('num2:', counter.num2) 
      } 
      effect(logCount) 
      count()
   ```
   如果以简单的 `activeEffect` 赋值来决定当前活跃 `effect`，那么 `activeEffect` 就会跳过 **num** 指向 **num2**，为了解决这中问题，改用栈 **effectStack** 来存储，每当 `effect` 执行完毕就弹出栈，这样就能收集到每一个 `effect`

# 19. 为什么vue3使用 Proxy 而不是 Object.defineProperty?
   1. 实际上脱离需求，`Proxy` 的性能不如 `Object.defineProperty` [详见](https://thecodebarbarian.com/thoughts-on-es6-proxies-performance)，但 `Proxy` 给 vue3 带来的并不是表面上代码执行速度提升，而是允许 vue3 以更合理的流程来实现响应式数据
   2. 由于 `Object.defineProperty` 是对对象某个已经存在的属性添加对应的 `getter` 和 `setter`，所以只能监听到这个属性值的变化，而不能监听属性的增删，进而导致在初始化时，就必须对整个data进行递归遍历处理，并且数组和对象的新增属性也都无法监听到，需要用特殊的api去进行修改才会更新
   3. 但 `Proxy` 是对整个对象的劫持，无论是属性的值变化还是增删都能监听到，这使得 vue 在初始化时只需要对最外层做处理，内层的属性在被访问到时再作监听，这其实一种延时定义子对象响应式的实现，在性能上有一定的提升，另外 `Proxy` 也解决了 vue2 中数组和对象增删属性的问题，所以 `Proxy` 也就成了自然而然的选择