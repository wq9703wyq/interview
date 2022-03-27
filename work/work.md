<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-03-17 11:38:02
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-03-23 09:36:45
-->
1. ### space-table
   1. 组件层级太深
   <!-- 2. space-seach 和 space-foot 不使用时未消去自身的高度 -->
   3. 修改传入对象时，未检查对象是否拥有修改属性，未使用$set
   4. 太多element本身的属性写死，无法透传
   5. 对element本身的属性重命名，且文档不够详细
   6. select 和 index 列应该封装成单独组件使用