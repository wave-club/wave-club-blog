# 这段代码有什么问题？

> 这段代码有什么问题？

```javascript
this.setState((prevState, props) => {
  return {
    streak: prevState.streak + props.count
  }
})
```



没有什么是错的🙂。它很少被使用，并不为人所知，但是你也可以传递一个函数给**setState**，它接收到先前的状态和道具并返回一个新的状态，正如我们在上面所做的那样。而且不仅没有什么问题，而且如果您根据以前的状态设置状态，也会积极推荐。