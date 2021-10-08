<!--
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2021-10-02 00:26:36
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2021-10-09 00:01:10
-->

## 什么是 ***[this](https://tc39.es/ecma262/#sec-this-keyword)*** ?

[ECMAScript](https://tc39.es/ecma262/) 中定义了 ***this*** 是由抽象操作(简称 AO) [ResolveThisBinding](https://tc39.es/ecma262/#sec-resolvethisbinding) 决定：
>  ResolveThisBinding 使用[当前执行上下文](https://tc39.es/ecma262/#sec-execution-contexts)的 LexicalEnvironment 来决定 ***this*** 的绑定，当 ResolveThisBinding 被调用时执行以下步骤:  
> 1. Let envRec be [GetThisEnvironment](https://tc39.es/ecma262/#sec-getthisenvironment)().
>  2.  Return ? envRec.GetThisBinding().

GetThisEnvironment 的行为简单来说就是判断 ***当前执行上下文*** 的LexicalEnvironment的HasThisBinding方法是否返回true，也就是判断当前LexicalEnvironment是否可以执行绑定 ***this*** 操作，如果可以则返回当前LexicalEnvironment作为 ***this*** 的绑定值，如果不可以则判断上一层Environment Record(也就是 [[OuterEnv]] )直到满足条件。

需要注意的是，Environment Record 有5种子类，其中只有Global Environment Records，module Environment Recors、function Environment Records 的HasThisBinding抽象方法会返回true以及各自实现了 GetThisBinding 抽象方法；也就是说 ***this*** 绑定只会发生在 全局/函数/模块 。

GetThisBinding 的返回值指向的是 ***当前执行上下文*** 中 ***this*** 的值，因此this的值会随诊 ***当前执行上下文*** 变化而变化。


## 1. Global execution context

```javascript
console.log(this); // window
setTimeout(function() {
    console.log(this); // window
    console.log("Not global context");
})
```
全局环境记录的 [GetThisBinding](https://tc39.es/ecma262/#sec-global-environment-records-getthisbinding) 的实现中,
> Return envRec.[[GlobalThisValue]]

[[GlobalThisValue]] 是全局环境记录中一个值等同于 [global object](https://tc39.es/ecma262/#sec-global-object)且可以通过 <u>globalThis</u>( <u>globalThis</u> 在web端是 <u>window</u> ,在 nodeJs 中则是  <u>global</u> ) 来访问。

## 2. modules environment Record
这里的 modules environment Record 主要指的是 ***\<script type="module">*** 中的全局执行上下文， modules environment Record 的 [GetThisBinding](https://tc39.es/ecma262/#sec-module-environment-records-getthisbinding) 实现如下:  
> Return undefined

也就是说在module环境中，全局执行上下文的this永远是undefined，因为module默认是[严格模式](https://tc39.es/ecma262/#sec-strict-mode-code)

## 3. eval code
***eval*** 分为直接和间接调用两种情况，
 - 直接调用 ***eval*** 的一般看起来是
   - eval(...);
   - (eval)(...);
   - ((eval))(...); 
 - 间接调用 ***eval*** 指的是通过调用 ***eval*** 的引用来调用 ***eval***,一般是
   - eval?.(...)
   - (..., eval)(...)
   - window.eval(...)
   - eval.call(..., ...)
   - ```javascript
        const aliasEval1 = eval;
        window.aliasEval2 = eval;
        aliasEval1(...);
        aliasEval2(...);
        ```
   - ```javascript
        const originalEval = eval;
        widnow.eval = (x) => originalEval(x);
        eval(...);
        ```
    [这一篇文章](https://web.archive.org/web/20210530120958/https://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode#indirect-eval-call)较为详细地讨论了 ***eval*** 直接与间接调用的区别。

    [PerformEval](https://tc39.es/ecma262/#sec-performeval) 展示了 ***eval*** 代码执行的步骤，其中15、16条说明了
    > 1. Let lexEnv be NewDeclarativeEnvironment(runningContext's LexicalEnvironment).  
    如果是直接调用，则取执行 ***eval*** 的上下文的 LexicalEnvironment 作 declarative Environment Record
    > 2. Let lexEnv be NewDeclarativeEnvironment(evalRealm.[[GlobalEnv]]).  
    > 如果是间接调用，则取 Global Environment Record 作 declarative Environment Record

    也就是说
    > 1. 直接调用， ***this*** 取之于执行 ***eval*** 的执行上下文
    > 2. 间接调用，***this*** 取之于 <u>globalThis</u>

## 4. function Environment Record
函数调用分为两类AO， [EvaluateCall]()、[EvaluateNew]() 分别对应四种函数调用的语法：  

- [EvaluateCall]():
  - [Normal function calls]()
  - [Optional chaining calls]()
  - [Tagged templatesd]()
- [EvaluateNew]():
  - [Constructor invocations]()


以上四种函数调用在最后都会调用 AO [Call]()，而 [Call]() 在最后也会调用函数的内部方法 [\[\[Call\]\]]()，[\[\[Call\]\]]() 就是执行函数的实际行为。在 [\[\[Call\]\]]() 中会调用 [PrepareForOrdinaryCall]() 来为函数调用新建*函数环境记录* [NewFunctionEnvironment](https://tc39.es/ecma262/#sec-newfunctionenvironment)，~~这里面根据被调用函数F的 [[[ThisMode]]]() 是否为lexcial (lexcial一般为箭头函数) 设置 [[]]~~，随后 [[[Call]]]()会调用 [[[OrdinaryCallBindThis]]]() 来决定 [[[ThisValue]]]()，这里面主要看第2、5、6条
>2. If thisMode is lexical, return NormalCompletion(undefined).  
>     - 如果 thisMode 是 lexcial，不执行后续的AO [BindThisValue]()
>     - 对应了箭头函数没有 ***this*** 的现象

>5. If thisMode is strict, let thisValue be thisArgument.
>     - 如果 thisMode 是 strice，[[[ThisValue]]]() 只取 thisArgument
>     - 对应了在严格模式下，语法上函数调用不取对象时 ***this*** 为 null 的现象

> 6. Else,  
>     1. If thisArgument is undefined or null, then  
>         1. Let globalEnv be calleeRealm.[[GlobalEnv]].
>         2. Assert: globalEnv is a global Environment Record.
>         3. iii. Let thisValue be globalEnv.[[GlobalThisValue]].
>     2. Else,
>         1. Let thisValue be ! ToObject(thisArgument).  

只有在 [[[ThisMode]]]() 是 *strict* 或者 *global* 的情况下，才会执行 [BindThisValue]()，将 [[[ThisValue]]]() 绑定到*函数环境记录*.

之后便通过 [GetThisBinding]() 来获取当前 ***当前执行上下文*** 的 ***this***.

以上便是一个粗略的总览，下文会提出数个常见的详细例子。

## [Arrow functions]()
在[箭头函数]()的[实例化]()中，会将函数实例的 [[[ThisMode]]]() 设置为 ***lexcial-this***

#### InstantiateArrowFunctionExpression
> 5. Let closure be **OrdinaryFunctionCreate**(%Function.prototype%, sourceText, ArrowParameters, ConciseBody, ***lexical-this***, scope, privateScope).


#### [OrdinaryFunctionCreate]()
> 9. If thisMode is ***lexical-this***, set F.[[ThisMode]] to lexical.
> 10. Else if Strict is true, set F.[[ThisMode]] to strict.
> 11. Else, set F.[[ThisMode]] to global.

上文也提到 [[[OrdinaryCallBindThis]]]() 对于 [[[ThisMode]]]() 是 ***lexcial*** 的值会直接跳过绑定 ***this*** 环节，因此[箭头函数]()对应的[执行上下文]()是没有自己的 ***this***.

[执行上下文]()通过 [ResolveThisBinding](https://tc39.es/ecma262/#sec-resolvethisbinding) 和 [GetThisEnvironment]() 来获取 ***this***，

#### [GetThisEnvironemnt]()
> 2. Repeat,
>     1. Let exists be env.HasThisBinding().
>     2. If exists is true, return env.
>     3. Let outer be env.[[OuterEnv]].
>     4. Assert: outer is not null.
>     5. Set env to outer.

通过调用 [HasThisBinding]() 来判断当前环境是否有 ***this***，如果没有则查看 [[[OuterEnv]]]() 直到找到可用 ***this***.

也就是说，判断[箭头函数]()中的 ***this*** 指向的是哪个对象只看箭头函数在哪个函数执行，[箭头函数]()的 ***this*** 指向与外部函数一致。


## Function properties
  ```javascript
  const refObj = {
    func: function() {
      console.log(this)
    }
  }
  ```
  以上对象为例子，以下几种不同调用语法的输出都是 *refObj*
  - ***refObj.func()***
  - ***refObj\["func"]()***
  - ***refObj?.func()***
  - ***refObj.func?.()***
  - ***refObj.func``***
  
  以最常见的 ***refObj.func()*** 和 ***refObj\["func"\]()*** 为例 ，两者都是语法格式 [CallMemberExpression]() 的具体实例，***refObj.func*** (或者 ***refObj\["func"]***) 是 [MemberExpression]()，***()*** 是 [Arguments]().在解释语义时，会从 [MemberExpression]() 中寻找 [[[Base]]]() 作为 ***this*** 的值.

  ### [Runtime Semantics: Evaluation](https://tc39.es/ecma262/#sec-function-calls-runtime-semantics-evaluation)
> .  
> .  
> .  
> 2. Let ***memberExpr*** be the MemberExpression of expr.  
> .  
> 4. Let ***ref*** be the result of evaluating ***memberExpr***.
> .  
> .  
> .  
> 9. Return ? [EvaluateCall](https://tc39.es/ecma262/#sec-evaluatecall)(func, ***ref***, arguments, tailCall).
> ```

  ### [EvaluateCall](https://tc39.es/ecma262/#sec-evaluatecall)
> 1. If ***ref*** is a Reference Record, then
>     1. If [IsPropertyReference]()(***ref***) is true, then
>         1. Let thisValue be [GetThisValue]()(***ref***).
>     2. Else,
>         1. Let refEnv be ***ref***.[[Base]].
>         2. Assert: refEnv is an Environment Record.
>         3. Let thisValue be refEnv.WithBaseObject().  
> 2. Else,
>     1. Let thisValue be undefined.
.  
.  
.  
> 7. Let result be [Call]()(func, ***thisValue***, argList).

结合来看，[EvaluateCall](https://tc39.es/ecma262/#sec-evaluatecall) 用 [IsPropertyReference]() 判断 [MemberExpression]() （或者说是 ***refObj.func***）是否是某个对象的属性，如果是则 [GetThisValue]() 返回它的 [[[Base]]]() 作为 ***this***.

剩下的 [Optional-chains](https://tc39.es/ecma262/#sec-optional-chains) 和 [Tagged Templates](https://tc39.es/ecma262/#sec-tagged-templates) 都会将 [MemberExpression]() 作为参数传递给 [EvaluateCall]().


## Calls without base reference, strice mode, and with