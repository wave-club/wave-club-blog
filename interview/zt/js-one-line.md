# JS单线程遐想



### JS单线程

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。

#### JS为什么会是单线程

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？(其实就是为了避免DOM渲染冲突)

- 浏览器需要渲染DOM
- JS可以修改DOM
- JS执行的时候，浏览器DOM渲染会暂停
- 两端JS也不能同时执行（都修改DOM就冲突）
- webworker支持多线程（子线程受主线程控制），并且不能访问DOM

### 代码演示单线程

```javascript
// example 1
console.log('strat')
var i, sum = 0;
for (i = 0; i < 1000000000; i++) {
    sum++
}
console.log(sum, ' end')

// example 2
console.log(1)
alert('弹窗阻止JS')
var p = document.createElement('p'); // 页面被阻止了渲染
p.innerHTML = '点击之后才能显示'
document.body.appendChild(p);
```

### 解决方案 - 异步

```javascript
// setTimeout 李兰器默认毫是>=4ms
console.log(1)
setTimeout(() => {
    console.log(2)
}, 0);
console.log(3)
// 1,3,2
```

### 实现方式 - Event Loop(事件循环)

主线程（同步函数执行完毕）然后从”任务队列（异步Timer容器）”中读取事件（异步事件），这个过程是循环不断的（轮询），所以整个的这种运行机制又称为Event Loop（事件循环）。

> 阮一峰 <http://www.ruanyifeng.com/blog/2014/10/event-loop.html>
>
> - 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
> - 主线程之外，还存在一个”任务队列”（task queue）。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
> - 一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
> - 主线程不断重复上面的第三步。