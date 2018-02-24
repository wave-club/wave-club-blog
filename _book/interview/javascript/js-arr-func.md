# 箭头函数



个**箭头函数表达式**的语法比一个[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)更短，并且不绑定自己的 [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)，[arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)，[super](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)或 [new.target](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target)。

这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数。



### 基础语法

```js
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 等价于：(param1, param2, …, paramN) => { return expression; }
/* 当删除大括号时，它将是一个隐式的返回值，这意味着我们不需要指定我们返回*/

// 如果只有一个参数，圆括号是可选的:
(singleParam) => { statements; }
singleParam => { statements; }

// 如果箭头函数 无参数 , 必须使用 ()圆括号:
() => { statements; } 
```

### 高级语法

```js
//返回一个对象时，函数体外要加圆括号
params => ({foo: bar})

// 支持 剩余参数和默认参数:
(param1, param2, ...rest) => { statements }

// ...rest 参数, 必须是参数列表最后一个参数



(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

// 也支持参数列表中的解构赋值
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c; // a=1; b=2; x=c; c=a+b=3;
f();  // 6
```

 

## 描述 

另见 ["ES6 In Depth: Arrow functions" on hacks.mozilla.org](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/).

箭头函数的引入有两个方面的作用：一是更简短的函数书写，二是对 `this`的词法解析`。`

### 更短的函数

更短的函数在函数式编程里很受欢迎。试比较：

```js
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });

var a3 = a.map( s => s.length );
```

### `不绑定 this`

在箭头函数出现之前，每个新定义的函数都有它自己的 `this `值（例如，构造函数中的 this 指向了一个新对象；[严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)下的函数 `this` 值是 `undefined`；如果是作为对象方法而调用的函数，则它的 this 会指向调用它的对象）。实践证明，在面向对象风格的编程中，这种方式会带来很多困扰。

```js
function Person() {
    // 构造函数 Person() 定义的 `this` 就是新实例对象自己
    this.age = 0;
    setInterval(function growUp() {
        // 在非严格模式下，growUp() 函数定义了其内部的 `this`为全局对象, 
        // 不同于构造函数Person()的定义的 `this`
        this.age++;
    }, 3000);
}

var p = new Person();
```

在 ECMAScript 3/5 中，这个问题通过把this的值赋给变量，然后将该变量放到闭包中来解决。

```js
function Person() {
    var self = this; 
    // 也有人选择使用 `that` 而非 `self`, 只要保证一致就好.
    self.age = 0;
    setInterval(function growUp() {
        // 回调里面的 `self` 变量就指向了期望的那个对象了
        self.age++;
    }, 3000);
}

var p = new Person();
```

除此之外，还可以使用 [bind 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)，把期望的 `this `值传递给 `growUp()` 函数。

箭头函数会捕获其所在上下文的  `this` 值，作为自己的 `this` 值，因此下面的代码将如期运行。

```js
function Person() {  
    this.age = 0;  
    setInterval(() => {
        // 回调里面的 `this` 变量就指向了期望的那个对象了
        this.age++;
    }, 3000);
}

var p = new Person();
```

#### 与严格模式的关系

考虑到 `this` 是词法层面上的，[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)中与 `this` 相关的规则都将被忽略。

```js
var f = () => {'use strict'; return this};
f() === window; // 或全局对象
```

严格模式的其他规则依然不变.

#### 使用 call 或 apply 调用

由于 `this`* *已经在词法层面完成了绑定，通过 `call()`* 或* `apply()` 方法调用一个函数时，只是传入了参数而已，对 `this` 并没有什么影响：

```js
var adder = {
  base : 1,
    
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3 ——译者注）
```

### `不绑定参数（arguments）`

箭头函数不会在其内部暴露出参数（[`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) )： `arguments.length`, `arguments[0]`, `arguments[1]` 等等，都不会指向箭头函数的 arguments，而是指向了箭头函数所在作用域的一个名为 arguments 的值（如果有的话，否则，就是 undefined。——译者注）。

```js
var arguments = 42;
var arr = () => arguments;

arr(); // 42

function foo() {
  var f = (i) => arguments[0]+i; 
  // foo函数的间接参数绑定
  return f(2);
}

foo(1); // 3
```

箭头函数没有自己的 `arguments` ，不过在大多数情形下，[rest参数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)可以给出一个解决方案：

```js
function foo() { 
  var f = (...args) => args[0]; 
  return f(2); 
}

foo(1); 
// 2
```

### 像方法一样使用箭头函数

如上所述，箭头函数表达式对非方法函数是最合适的。让我们看看当我们试着把它们作为方法时发生了什么。

```js
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); 
// undefined
obj.c(); 
// 10, Object {...}
```

箭头函数没有定义this绑定。 另一个涉及[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):的示例：

```js
'use strict';
var obj = {
  a: 10
};

Object.defineProperty(obj, "b", {
  get: () => {
    console.log(this.a, typeof this.a, this);
    return this.a+10; 
   // represents global object 'Window', therefore 'this.a' returns 'undefined'
  }
});
```

### 使用 `new` 操作符

箭头函数不能用作构造器，和 new 一起用就会抛出错误。

```js
var Foo = () => {};
var foo = new Foo(); 
// TypeError: Foo is not a constructor
```

### 使用原型属性

箭头函数没有原型属性。

```js
var Foo = () => {};
console.log(Foo.prototype); 
// undefined
```

### 使用 `yield` 关键字

 `yield` 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。

## 函数主体

箭头函数既支持简写也支持常规编写。

简写时只需要一个表达式和一个返回值。常规编写时必须有一个明确的返回值。

```js
var func = x => x * x;                  
// 简写函数 省略return

var func = (x, y) => { return x + y; }; 
//常规编写 明确的返回值
```

## 返回文字表达式 

请牢记，用 `params => {object:literal} `这种简单的语法返回一个文字表达式是行不通的：

```js
var func = () => {  foo: 1  };
// undefined!

var func = () => {  foo: function() {}  };
// SyntaxError: function statement requires a name（未定义函数语句）
```

这是因为花括号（即 `{}` ）里面的代码被解析为序列语句了（例如， `foo` 被认为是一个标签, 而非文字表达式的组成部分）。

所以，记得用圆括号把文字表达式包起来：

```js
var func = () => ({ foo: 1 });

```

## `换行` 

箭头函数在参数和箭头之间不能换行哦

```js
var func = ()
           => 1; 

// SyntaxError: expected expression, got '=>'
```

## 解析顺序 

在箭头函数中的箭头不是操作符(或者运算符,就像'+ -'那些)， 但是箭头函数有特殊的解析规则就是：相比普通的函数，受操作符的优先级影响。

```js
let callback;

callback = callback || function() {}; 
// ok
callback = callback || () => {};      
// SyntaxError:非法箭头函数属性
callback = callback || (() => {});    
// ok
```

###  

## 示例  

```js
// 一个空箭头函数,返回 undefined

let empty = () => {};

(() => "foobar")(); 
// ES6 IIFE, 返回 "foobar" 

var simple = a => a > 15 ? 15 : a; 
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? `a bigger `: `b bigger`;

// 简单的数组筛选（数组filter方法），运算（数组map方法）, ...

var arr = [5, 6, 13, 0, 1, 18, 23];
var sum = arr.reduce((a, b) => a + b);  
// 66
var even = arr.filter(v => v % 2 == 0);
 // [6, 0, 18] 
var double = arr.map(v => v * 2);       
// [10, 12, 26, 0, 2, 36, 46] 


// 更简明的promise链

promise.then(a => {
  // ...
}).then(b => {
   // ...
});

// 更易理解的无参数箭头函数
setTimeout( () => {
  console.log('I happen sooner');
  setTimeout( () => {
    // deeper code
    console.log('I happen later');
  }, 1);
}, 1);
```