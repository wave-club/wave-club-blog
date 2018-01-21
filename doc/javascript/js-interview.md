# 面试问题

#### 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）



```javascript
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms
```

#### position:fixed;在android下无效怎么处理？

```css
fixed的元素是相对整个页面固定位置的，你在屏幕上滑动只是在移动这个所谓的viewport，
  原来的网页还好好的在那，fixed的内容也没有变过位置，
  所以说并不是iOS不支持fixed，只是fixed的元素不是相对手机屏幕固定的。
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
```

#### 让页面里的字体变清晰，变细用CSS怎么做？

```css
  -webkit-font-smoothing: antialiased;
```

#### 如何修改chrome记住密码后自动填充表单的黄色背景 ？

```css
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
```

#### CSS 外边距合并

```html
 外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
 合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。
 注释：只有普通文档流中块框的垂直外边距才会发生外边距合并。**行内框、浮动框或绝对定位之间的外边距不会合并。**
```

#### 怎么让Chrome支持小于12px 的文字

 ```
    1、用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
    2、使用12px及12px以上字体大小：为了兼容各大主流浏览器，建议设计美工图时候设置大于或等于12px
       的字体大小，如果是接单的这个时候就需要给客户讲解小于12px浏览器不兼容等事宜。
    3、继续使用小于12px字体大小样式设置：如果不考虑chrome可以不用考虑兼容，同时在设置小于12px对象设置
       -webkit-text-size-adjust:none，做到最大兼容考虑。
    4、使用12px以上字体：为了兼容、为了代码更简单 从新考虑权重下兼容性。
 ```

####   Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

```css
 hasOwnProperty

 javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。
 使用方法：
 object.hasOwnProperty(proName)
 其中参数object是必选项。一个对象的实例。
 proName是必选项。一个属性名称的字符串值。

 如果 object 具有指定名称的属性，那么JavaScript中hasOwnProperty函数方法返回 true，反之则返回 false。
```

#### js延迟加载的方式有哪些？

```html
 defer和async、动态创建DOM方式（用得最多）、按需异步载入js
```

#### 如何解决跨域问题?

```html
 jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面
```

#### AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？



```js
Asynchronous Module Definition，异步模块定义，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。

  区别：

     1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
     2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

 // CMD
 define(function(require, exports, module) {
     var a = require('./a')
     a.doSomething()
     // 此处略去 100 行
     var b = require('./b') // 依赖可以就近书写
     b.doSomething()
     // ...
 })

 // AMD 默认推荐
 define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
     a.doSomething()
     // 此处略去 100 行
     b.doSomething()
     // ...
 })
```

#### DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

```javascript
  （1）创建新节点
    createDocumentFragment()    //创建一个DOM片段
    createElement()   //创建一个具体的元素
    createTextNode()   //创建一个文本节点
  （2）添加、移除、替换、插入
    appendChild()
    removeChild()
    replaceChild()
    insertBefore() //在已有的子节点前插入一个新的子节点
  （3）查找
    getElementsByTagName()    //通过标签名称
    getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
    getElementById()    //通过元素Id，唯一性
    
```

#### 检测浏览器版本版本有哪些方式？

```js
  功能检测、userAgent特征检测

  比如：navigator.userAgent
  //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36
    (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"
```

#### 那些操作会造成内存泄漏？

```html
 内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

 setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）
```

#### 你对加班的看法？

```
  加班就像借钱，原则应当是------救急不救穷
```




23.如何快速合并雪碧图

Gulp：gulp-css-spriter
webpack：optimize-css-assets-webpack-plugin
Go！Png
在线工具

24.代码优化基本方法

**减少HTTP请求**
HTML优化：

- 使用语义化标签
- 减少iframe：iframe是SEO的大忌，iframe有好处也有弊端
- 避免重定向

CSS优化：

- 布局代码写前面
- 删除空样式
- 不滥用浮动，字体，需要加载的网络字体根据网站需求再添加
- 选择器性能优化
- 避免使用表达式，避免用id写样式

js优化：

- 压缩
- 减少重复代码

图片优化：

- 使用WebP
- 图片合并，CSS sprite技术

**减少DOM操作**

- 缓存已经访问过的元素
- "离线"更新节点, 再将它们添加到树中
- 避免使用 JavaScript 输出页面布局--应该是 CSS 的事儿

**使用JSON格式来进行数据交换**
**使用CDN加速**
**使用HTTP缓存：**添加 `Expires` 或 `Cache-Control` 信息头
**使用DNS预解析**
Chrome内置了DNS Prefetching技术, Firefox 3.5 也引入了这一特性，由于Chrome和Firefox 3.5本身对DNS预解析做了相应优化设置，所以设置DNS预解析的不良影响之一就是可能会降低Google Chrome浏览器及火狐Firefox 3.5浏览器的用户体验。
预解析的实现：

1. 用meta信息来告知浏览器, 当前页面要做DNS预解析:`<meta http-equiv="x-dns-prefetch-control" content="on" />`
2. 在页面header中使用link标签来强制对DNS预解析: `<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />`

25.HTTPS的握手过程

1. 浏览器将自己支持的一套加密规则发送给服务器。
2. 服务器从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。
3. 浏览器获得网站证书之后浏览器要做以下工作：
   - 验证证书的合法
   - 如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密。
   - 使用约定好的HASH算法计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给服务器
4. 网站接收浏览器发来的数据之后要做以下的操作：
   - 使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致。
   - 使用密码加密一段握手消息，发送给浏览器。
5. 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密。

参考文章：[《HTTPS 工作原理和 TCP 握手机制》](http://blog.jobbole.com/105633/)

26.BFC相关问题

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有 Block-level box 参 与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。

**BFC的渲染规则**

- BFC这个元素的垂直方向的边距会发生重叠
- BFC的区域不会与浮动元素的box重叠（清除浮动原理）
- BFC在页面上是一个独立的容器，外面的元素不会影响它里面的元素，反过来它里面的元素也不会影响外面的元素
- 计算BFC的高度的时候，浮动元素也会参与计算

**如何创建BFC？**

- overflow属性不为visible
- float属性不为none
- position属性为absolute或fixed
- display属性为inline-block、table-cell、table-caption、flex、inline-flex

**BFC的使用场景**
他的很常用的一个应用场景就是解决边距重叠的问题.

27.响应式图片

1.JS或者服务端硬编码，resize事件，判断屏幕大小加载不同的图片
2.img srcset 方法
3.picture标签 -> source
4.svg
5.第三方库polyfill

28.判断一个变量是否是数组

```js
var a = []; 
// 1.基于instanceof 
a instanceof Array; 
// 2.基于constructor 
a.constructor === Array; 
// 3.基于Object.prototype.isPrototypeOf 
Array.prototype.isPrototypeOf(a); 
// 4.基于getPrototypeOf 
Object.getPrototypeOf(a) === Array.prototype; 
// 5.基于Object.prototype.toString 
Object.prototype.toString.apply(a) === '[object Array]';
// 6.Array.isArray
Array.isArray([]); // true
```

以上，除了`Object.prototype.toString`外，其它方法都不能正确判断变量的类型。

29.UTF-8和Unicode的区别

UTF-8就是在互联网上使用最广的一种unicode的实现方式。
Unicode的出现是为了统一地区性文字编码方案，为解决unicode如何在网络上传输的问题，于是面向传输的众多 UTF（UCS Transfer Format）标准出现了，顾名思义，UTF-8就是每次8个位传输数据，而UTF-16就是每次16个位。
ASCII --> 地区性编码（GBK） --> Unicode --> UTF-8



