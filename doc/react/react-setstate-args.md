# 什么是可以选择传递给**setState**的第二个参数，它的目的是什么？



一个回调函数，当setState结束并重新呈现该组件时将被调用。

一些没有说出来的东西是setState是异步的，这就是为什么它需要一个第二个回调函数。通常情况下，最好使用另一种生命周期方法，而不是依赖这个回调函数，但是很高兴知道它存在。



```javascript
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)
```

