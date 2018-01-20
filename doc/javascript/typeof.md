## typeof 的用法



typeof操作符返回一个**字符串**,指示未经计算的操作数的类型。



**typeof operand**

operand 是一个表达式，表示对象或原始值，其类型将被返回。

下表总结了 typeof 可能的返回值。有关类型和原语的更多信息，可查看 [JavaScript数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures) 页面。



**类型**	**结果**

Undefined  =>>	"undefined"

Null   =>>	"object" (见下方)

Boolean	 =>> "boolean"

Number =>>	"number"

String =>>	"string"

Symbol (ECMAScript 6 新增)	=>> "symbol"

宿主对象(由JS环境提供)	Implementation-dependent

函数对象 ( [[Call]] 在ECMA-262条款中实现了)  =>>	"function"

正则  =>> "object"

任何其他对象  =>> "object"



**常规用法**

```javascript
// Numbers

typeof 37 === 'number';

typeof 3.14 === 'number';

typeof Math.LN2 === 'number';

typeof Infinity === 'number';

typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写

typeof Number(1) === 'number'; // 但不要使用这种形式!

// Strings

typeof "" === 'string';

typeof "bla" === 'string';

typeof (typeof 1) === 'string'; // typeof总是返回一个字符串

typeof String("abc") === 'string'; // 但不要使用这种形式!

// Booleans

typeof true === 'boolean';

typeof false === 'boolean';

typeof Boolean(true) === 'boolean'; // 但不要使用这种形式!

// Symbols

typeof Symbol() === 'symbol';

typeof Symbol('foo') === 'symbol';

typeof Symbol.iterator === 'symbol';

// Undefined

typeof undefined === 'undefined';

typeof declaredButUndefinedVariable === 'undefined';

typeof undeclaredVariable === 'undefined'; 

// Objects

typeof {a:1} === 'object';

// 使用Array.isArray 或者 Object.prototype.toString.call

// 区分数组,普通对象

typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要使用！

typeof new Boolean(true) === 'object';

typeof new Number(1) ==== 'object';

typeof new String("abc") === 'object';

// 函数

typeof function(){} === 'function';

typeof Math.sin === 'function';

//null

typeof null === 'object';


```

**正则表达式**

对正则表达式字面量的类型判断在某些浏览器中不符合标准：



typeof /s/ === 'object'; // Firefox 5+ , 符合 ECMAScript 5.1

