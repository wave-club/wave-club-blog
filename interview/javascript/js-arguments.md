# arguments 详解

**arguments** 是一个类似数组的对象, 对应于传递给函数的参数。

## 描述 

arguments对象是所有函数中可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。例如，如果一个函数传递了三个参数，你可以参考它们如下：

```js
arguments[0]
arguments[1]
arguments[2]
```

参数也可以被设置:

```js
arguments[1] = 'new value';
```

arguments对象不是一个 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 。它类似于数组，但除了 [长度](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/length)之外没有任何数组属性。例如，它没有 [pop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 方法。但是它可以被转换为一个真正的数组：：

```js
let args = Array.prototype.slice.call(arguments); 

let args = [].slice.call(arguments);
```

你还可以使用  [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)方法或 [spread 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)将 arguments 转换为真正的数组：

```js
let args = Array.from(arguments);
let args = [...arguments];
```

对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 引擎 - [更多信息](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments))。

如果你关心它们，尝试通过遍历arguments对象来构造一个新的数组。

另一种方法是使用 被忽视的/鄙视/轻视,/看不起 Array构造函数作为一个函数：

```js
let args = (
arguments.length === 1 ? 
[arguments[0]] : 
Array.apply(null, arguments)
);
```

 

如果 [Array generics](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#Array_generic_methods) 可用的话，下面的代码可以作为替代:

```js
var args = Array.slice(arguments);
```

`arguments` 对象仅在函数内部有效，在函数外部调用 arguments 对象会出现一个错误。

arguments的typeof返回'object'。

```js
console.log(typeof arguments); 
// 'object'
```

可以使用索引来确定**各个**arguments的类型。

```js
console.log(typeof arguments[0]); 
//这将返回单个参数的typeof。
```

如果你调用一个函数，当这个函数的参数数量比它显式声明的参数数量更多的时候，你就可以使用 `arguments` 对象。这个技术对于参数数量是一个可变量的函数来说比较有用。 你可以用 `arguments.length` 来得到参数的数量，然后可以用 `arguments` object 来对每个参数进行处理。 (想要得到函数签名的参数数量, 请使用 `Function.length` 属性。)

## 属性 

- `arguments.callee`

  指向当前执行的函数。

- `arguments.caller` **

  指向调用当前函数的函数。

- `arguments.length`

  指向传递给当前函数的参数数量。

## 例子 

### 例子: 定义一个连接几个字符串的函数

这个例子定义了一个函数来连接字符串。这个函数唯一正式声明了的参数是一个字符串，该参数指定一个字符作为衔接点来连接字符串。该函数定义如下：

```js
function myConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}
```

你可以传递任意数量的参数到该函数，然后该函数会将每个参数作为一个条目来创建一个列表。

```js
// returns "red, orange, blue"
myConcat(", ", "red", "orange", "blue");

// returns "elephant; giraffe; lion; cheetah"
myConcat("; ", "elephant", "giraffe", "lion", "cheetah");

// returns "sage. basil. oregano. pepper. parsley"
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");
```

### 例子: 定义一个创建HTML列表的方法

这个例子定义了一个函数通过一个字符串来创建HTML列表。这个函数唯一正式声明了的参数是一个字符。当该参数为 "`u`" 时，创建一个无序列表 (项目列表)；当该参数为 "`o`" 时，则创建一个有序列表 (编号列表)。该函数定义如下：

```js
function list(type) {
  var result = "<" + type + "l><li>";
  var args = Array.prototype.slice.call(arguments, 1);
  result += args.join("</li><li>");
  result += "</li></" + type + "l>"; // end list

  return result;
}
```

你可以传递任意数量的参数到该函数，然后该函数会将每个参数作为一个条目添加到第一个参数指定类型的列表当中。

```js
var listHTML = list("u", "One", "Two", "Three");

/* listHTML is:

"<ul><li>One</li><li>Two</li><li>Three</li></ul>"

*/
```

### 剩余参数, 默认参数 和 解构赋值参数

arguments 对象可以与剩余参数、默认参数和结构赋值参数结合使用。

```js
function foo(...args) {
  return args;
}
foo(1, 2, 3);  // [1,2,3]
```

在严格模式下,剩余参数剩余参数、默认参数和结构赋值参数的存在不会改变 arguments 对象的行为,但是在非严格模式下就有所不同了。

当在非严格模式函数中 没有包含 剩余参数、默认参数或结构赋值参数,那么 arguments 对象将会追踪参数的变化,反之亦然。看下面的代码:

```js
function func(a) { 
  arguments[0] = 99;   // 更新了arguments[0] 同样更新了a
  console.log(a);
}
func(10); // 99
```

并且

```js
function func(a) { 
  a = 99;              // 更新了a 同样更新了arguments[0] 
  console.log(arguments[0]);
}
func(10); // 99
```

当在非严格模式函数中 包含有 剩余参数、默认参数或结构赋值参数,那么 arguments 对象将不会追踪参数的变化,反之亦然。相反, arguments 反映了调用时提供的参数 :

```js
function func(a = 55) { 
  arguments[0] = 99; // 提供了默认参数,更新 arguments[0] 不会更新 a
  console.log(a);
}
func(10); // 10
```

并且

```js
function func(a = 55) { 
  a = 99;   // 提供了默认参数,更新 a 不会更新 arguments[0]
  console.log(arguments[0]);
}
func(10); // 10
```

并且

```js
function func(a = 55) { 
  console.log(arguments[0]);
}
func(); // undefined

//上面函数调用的时候没有传递参数,所有 arguments[0] 值为 undefined

```