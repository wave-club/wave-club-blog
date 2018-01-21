# DOM事件类



**DOM事件的级别**

- DOM0，element.onclick = function(){}
- DOM2，element.addEventListener('click', function(){}, false);

**DOM事件模型是什么：**指的是冒泡和捕获
**DOM事件流是什么：**捕获阶段 -> 目标阶段 -> 冒泡阶段
**描述DOM事件捕获的具体流程**
window --> document --> documentElement(html标签) --> body --> .... --> 目标对象
**Event对象常见应用**

- event.preventDefault()，阻止默认行为
- event.stopPropagation()，阻止事件冒泡
- event.stopImmediatePropagation()，阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上，这个方法不接受任何参数。
- event.currentTarget，返回绑定事件的元素
- event.target，返回触发事件的元素

**如何自定义事件**
Event，不能传递参数

```js
var eve = new Event('自定义事件名');
ev.addEventListener('自定义事件名', function(){
    console.log('自定义事件')
});
ev.dispatchEvent(eve);
```

CustomEvent，还可以指定参数



 