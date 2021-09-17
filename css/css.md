<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-09-13 22:22:28
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-09-18 00:28:28
-->

1. ## p标签默认的 display 和 position 属性分别是什么
- > display: block 和 position: static

2. ## BFC
- > BFC-Block Formatting Context 格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域或一个独立的隔离容器
   
   1. ### BFC的五种条件
   - > 浮动元素，float 除了 none 以外的值
   - > 定位元素，position (absolute, fixed)
   - > displat 为以下其中之一的值 inline-block, table-cell
   - > overflow 除了visible 以外的值 (hidden, auto, scroll)
   - > body根元素就是一个 BFC

   1. ### [@BFC的特性](http://192.168.0.102:8890/css/BFC/index.html)
   - > ~~内部的Box会在垂直方向上一个接一个的位置~~
   - > BFC中的子元素与"和父元素同级元素"不会发生margin折叠
   - > BFC 不会与 float 的元素重叠
   - > BFC 会清除内部Box浮动(BFC计算高度包含浮动的子元素)
   
1. ## CSS 选择器的权重计算
   
- > ### **权重**
      
  - > 从 0 开始，一个 **行内样式** +1000，一个**id选择器** +100，一个**属性选择器**、**class**或**伪类** +10，
      一个**元素选择器**或者**伪元素** +1，**通配符** +0
- > ### **优先级**
  - > 权重相同，写在后面的覆盖前面
  - > 使用 !important 达到最大优先级，都使用 !important 时，则按原本权重排序

4. ## 若是以下布局中，要让 p 标签单行和多行文本，分别垂直水平居中，有哪些方案
```html
<p class="p-1" style="width: 50px; height: 200px">
 <span class="span-1">text1</span>
</p>
<p class="p-2" style="width: 50px; height: 200px">
 <span class="span-1">text1</span>
 <span class="span-2">text2</span>
</p>
```
- >

5. ## 重绘和重排
- > ### 重排
   
   - > 当DOM的变化影响了元素的几何信息(位置与大小)，浏览器需要重新计算DOM的几何属性并重新排位，这就是重排
   - >> 触发：元素的位置、大小、浏览器resize，查询属性的方法(offsetWidth、offsetHeight)

- > ### 重绘
   - > 当一个元素的外观发生变化，但没有改变布局，重新绘制这个元素的过程就是重绘
   - >> 触发：color、background、text-decoration，box-sizing: border-size下的border-style

6. ## 行内元素和块级元素有什么不同。如何给行内元素设置宽高。为什么img是行内元素，可以设置宽高
   - > 默认情况下，行内元素只有在一行内放不下才会换行，块级元素则是默认占一行
   - > width, height属性对行内元素不起作用
   - > 块级元素可以设置 margin 和 padding，但行内元素只有水平方向的 margin 和 padding才生效

7. ## flex 布局中，哪一个属性可以设置子项的排列方向？子项的哪一个属性可以设置排列顺序
   1. > flex-direction决定主轴线方向
   2. > order，越小越靠前

8. ## 以两种方式实现 checkbox 选择的表单提交, 并说明其优缺点
   1. > 使用 input[type='checkbox'] 实现，在原生 checkbox 的基础上实现工作量会少很多，另外也可以通过伪类来修改 checkbox 样式，但是伪类只能满足一些比较简单的样式，例如修改选中的字体背景颜色，选中图标；无法实现点击动画等复杂需求
   2. > 使用div封装一个 checkbox，工作量较大，样式与事件触发功能都需要从头开始，但是可以满足比较复杂的需求

9. ## 以两种方式实现"左边固定 200px, 右边栏自适应"的布局，并说明其优缺点
   1. > 左 float 右margin-left: 200px；代码简单适合比较小的模块，需要确定数字，无法适用于宽度有浮动的模块
   2. > flex，主要应用于子模块大小随祖先模块变化而变化的场景，
   3. > position + margin，与 float 类似
   4. > BFC + float，利用 BFC 和 float 不会重叠的特性，但是只看代码比较难看出overflow:hidden，display: flex是为了触发BFC

10. ## css 的常见定位有哪些?fixed 除了 transform 外还有什么属性可以影响其定位的父元素
    1. > static: 默认值，top、right、bottom、left等属性都不会被禁用
    2. > relative: 对象遵循正常文档流，依据top、right、bottom、left属性在正常文档流中偏移
    3. > absolute：脱离正常文档流，top、right、bottom、left会根据其非static父元素定位
    4. > fixed: 脱离正常文档流，top、right、bottom、left相对于窗口定位，滚动时不会移动；当祖先元素的transform，perspective，filter非none时，容器则由视口改为改组件

11. ## 介绍一样的 css 的 important 和 link 的区别
> link 会将 @important 的同级样式替换
> ?

12. ## 若是实现一个 div 在 10s 内向左移动 500px 的动画，可以怎么实现。各有什么优缺点。
    1. > 设置transition: 10s，用js修改他的margin或者left；可拓性较强，可以任意设置动画的移动方向与距离，并且搭配transform使用不改变其他元素布局，减少重排带来的消耗；动画细节不容易控制，例如速度曲线，又或者transition是对大部分样式都有影响，若一起设置移动500px和变宽200px，结果就会变成变移动边变宽，除非js设置先后顺序
    2. > css3动画，可以设置动画时间、播放状态、播放次数、结束状态和预设时间曲线，且可以控制动画每一个时间点元素的属性效果
    3. > 纯JS控制，通过setTimeOut、setInterval在极短时间内去定期延修改元素属性，可控性比较强，但是相比功能差不多的css3动画不仅工作量更大，JS不断对元素修改属性会造成多次重绘重排对客户端压力较大