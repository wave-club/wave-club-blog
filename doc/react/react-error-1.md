# Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the EditerInput component.



原因主要是：

这个错误在配合 多次Route的时候会经常出现

Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.
主要是在执行 Ajax 执行 response 函数时
因为 component 已经 unmounted
导致 setState 执行时所造成的错误


与在componentDidMount或componentWillMount中运行的项目中的异步代码（promise，generator或async / await）有关。导致回调的时候component 已经不复存在

![dw topic](../assets/images/react-error@2x.png)

我的错误原因在于绑定了click 事件， 所以一定需要解绑，如果是非Route 切换的话， 是不会报错的。



## 错误的如下

```jsx
componentDidMount() {
    
    const {displayLayout} = this.props

    document.addEventListener('click', () => {
        super.defineState('displayLayout', false)
    }, false)

    this.state._input.addEventListener('click', (ev) => {

        super.stop(ev)
        super.defineState('displayLayout', true)
    }, false)
}
```







修改成了

### 正确的如下

```jsx
componentDidMount() {

    const {displayLayout} = this.props
    document.addEventListener('click', this.missLayotu, false)
    this.state._input.addEventListener('click', this.displayLayout, false)
}

componentWillUnmount() {
    document.removeEventListener('click',this.missLayotu)
    this.state._input.removeEventListener('click',this.displayLayout)
}

missLayotu(){
    super.defineState('displayLayout', false)
}
displayLayout(ev){
    super.stop(ev)
    super.defineState('displayLayout', true)
}
```





官方的介绍如下

# isMounted是一个反模式

2015年12月16日通过[Jim Sproch](http://www.jimsproch.com/)

随着我们接近正式弃用isMounted，值得理解为什么函数是反模式，以及如何在不使用isMounted函数的情况下编写代码。

主要的用例`isMounted()`是`setState()`在组件卸载之后避免调用，因为`setState()`在组件卸载后调用会发出警告。“setState警告”存在可以帮助你捕捉错误，因为调用`setState()`一个卸载的组件表明你的应用程序/组件无法正确清理。具体来说，调用`setState()`一个卸载的组件意味着你的应用程序在组件被卸载后仍然持有对组件的引用 - 这通常表示内存泄漏！

为了避免错误信息，人们经常添加这样的行：

```jsx
if (this.isMounted()) { // This is bad.
  this.setState({...});
}
```

`isMounted`调用之前的检查`setState()`确实消除了警告，但是它也打破了警告的目的，因为现在你永远不会得到警告（即使你应该！）。

其他用途`isMounted()`同样是错误的; 使用`isMounted()`是一种代码气味，因为你会检查的唯一原因是因为你认为你可能在组件卸载后持有一个引用。

任何人升级他们的代码以避免一个简单的迁移策略`isMounted()`是跟踪自己安装的状态。只需将`_isMounted`属性设置为true，`componentDidMount`并将其设置为false `componentWillUnmount`，并使用此变量来检查组件的状态。

一个最佳的解决方案将是找到`setState()`一个组件卸载后可能被调用的地方，并修复它们。这种情况通常是由于回调，组件在等待某些数据并在数据到达之前取消挂载而发生的。理想情况下，任何回调应在取消`componentWillUnmount`之前取消。

例如，如果您在组件中使用Flux商店，则必须退订`componentWillUnmount`：

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    mydatastore.subscribe(this);
  }
  render() {
    ...
  }
  componentWillUnmount() {
    mydatastore.unsubscribe(this);
  }
}
```

如果你使用ES6的承诺，你可能需要包装你的承诺，以使其可取消。

```jsx
const cancelablePromise = makeCancelable(
  new Promise(r => component.setState({...}}))
);

cancelablePromise
  .promise
  .then(() => console.log('resolved'))
  .catch((reason) => console.log('isCanceled', reason.isCanceled));

cancelablePromise.cancel(); // Cancel the promise
```

当`makeCancelable`最初[由@istarkov定义](https://github.com/facebook/react/issues/5465#issuecomment-157888325)为：

```jsx
const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
```

作为提早清理代码的附加功能，删除功能`isMounted()`使您可以轻松升级到`isMounted()`已禁止使用的ES6类。快乐的编码！



