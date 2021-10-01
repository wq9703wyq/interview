<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-10-02 00:26:36
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-10-02 01:51:44
-->

## 什么是 ***[this](https://tc39.es/ecma262/#sec-this-keyword)*** ?

[ECMAScript](https://tc39.es/ecma262/) 中定义了 ***this*** 是由抽象操作(简称 AO) [ResolveThisBinding](https://tc39.es/ecma262/#sec-resolvethisbinding) 决定：
>  ResolveThisBinding 使用[当前执行上下文](https://tc39.es/ecma262/#sec-execution-contexts)的 LexicalEnvironment 来决定 ***this*** 的绑定，当 ResolveThisBinding 被调用时执行以下步骤:  
> 1. Let envRec be [GetThisEnvironment](https://tc39.es/ecma262/#sec-getthisenvironment)().
>  2.  Return ? envRec.GetThisBinding().

GetThisEnvironment 的行为简单来说就是判断 ***当前执行上下文*** 的LexicalEnvironment的HasThisBinding方法是否返回true，也就是判断当前LexicalEnvironment是否可以执行绑定 ***this*** 操作，如果可以则返回当前LexicalEnvironment作为 ***this*** 的绑定值，如果不可以则判断上一层Environment Record(也就是 [[OuterEnv]] )直到满足条件。

需要注意的是，Environment Record 有5种子类，其中只有Global Environment Records，module Environment Recors、function Environment Records 的HasThisBinding抽象方法会返回true以及各自实现了 GetThisBinding 抽象方法；也就是说 ***this*** 绑定只会发生在 全局/函数/模块 。