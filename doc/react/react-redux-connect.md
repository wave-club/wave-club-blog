# react-redux 之 connect 方法详解



作者: 叶斋 发表于: [2016-08-18](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)

![React 实践心得：react-redux 之 connect 方法详解](http://img.alicdn.com/tfs/TB1fYYeLpXXXXbtXFXXXXXXXXXX-900-500.jpg)

Redux 是「React 全家桶」中极为重要的一员，它试图为 React 应用提供「可预测化的状态管理」机制。Redux 本身足够简单，除了 React，它还能够支持其他界面框架。所以如果要将 Redux 和 React 结合起来使用，就还需要一些额外的工具，其中最重要的莫过于 react-redux 了。

react-redux 提供了两个重要的对象，`Provider` 和 `connect`，前者使 React 组件可被连接（connectable），后者把 React 组件和 Redux 的 store 真正连接起来。react-redux 的文档中，对 `connect` 的描述是一段晦涩难懂的英文，在初学 redux 的时候，我对着这段文档阅读了很久，都没有全部弄明白其中的意思（大概就是，单词我都认识，连起来啥意思就不明白了的感觉吧）。

在使用了一段时间 redux 后，本文尝试再次回到这里，给[这段文档](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)（同时摘抄在附录中）一个靠谱的解读。

## 预备知识

首先回顾一下 redux 的基本用法。如果你还没有阅读过 redux 的文档，你一定要先去[阅读一下](https://github.com/reactjs/redux/blob/master/docs/README.md)。

```jsx
const reducer = (state = {count: 0}, action) => {
  switch (action.type){
    case 'INCREASE': return {count: state.count + 1};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}

const actions = {
  increase: () => ({type: 'INCREASE'}),
  decrease: () => ({type: 'DECREASE'})
}

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}
```

通过 `reducer` 创建一个 `store`，每当我们在 `store` 上 `dispatch` 一个 `action`，`store` 内的数据就会相应地发生变化。

我们当然可以**直接**在 React 中使用 Redux：在最外层容器组件中初始化 `store`，然后将 `state` 上的属性作为 `props` 层层传递下去。

```jsx
class App extends Component{

  componentWillMount(){
    store.subscribe((state)=>this.setState(state))
  }

  render(){
    return <Comp state={this.state}
                 onIncrease={()=>store.dispatch(actions.increase())}
                 onDecrease={()=>store.dispatch(actions.decrease())}
    />
  }
}
```

但这并不是最佳的方式。最佳的方式是使用 react-redux 提供的 `Provider` 和 `connect` 方法。

## 使用 react-redux

首先在最外层容器中，把所有内容包裹在 `Provider` 组件中，将之前创建的 `store` 作为 `prop` 传给 `Provider`。

```jsx
const App = () => {
  return (
    <Provider store={store}>
      <Comp/>
    </Provider>
  )
};
```

`Provider` 内的任何一个组件（比如这里的 `Comp`），如果需要使用 `state` 中的数据，就必须是「被 connect 过的」组件——使用 `connect` 方法对「你编写的组件（`MyComp`）」进行包装后的产物。

```jsx
class MyComp extends Component {
  // content...
}

const Comp = connect(...args)(MyComp);
```

可见，`connect` 方法是重中之重。

## `connect` 详解

究竟 `connect` 方法到底做了什么，我们来一探究竟。

首先看下函数的签名：

> connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

`connect()` 接收四个参数，它们分别是 `mapStateToProps`，`mapDispatchToProps`，`mergeProps`和`options`。

### `mapStateToProps(state, ownProps) : stateProps`

这个函数允许我们将 `store` 中的数据作为 `props` 绑定到组件上。

```jsx
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
```

这个函数的第一个参数就是 Redux 的 `store`，我们从中摘取了 `count` 属性。因为返回了具有 `count` 属性的对象，所以 `MyComp` 会有名为 `count` 的 `props` 字段。

```jsx
class MyComp extends Component {
  render(){
    return <div>计数：{this.props.count}次</div>
  }
}

const Comp = connect(...args)(MyComp);
```

当然，你不必将 `state` 中的数据原封不动地传入组件，可以根据 `state` 中的数据，动态地输出组件需要的（最小）属性。

```jsx
const mapStateToProps = (state) => {
  return {
    greaterThanFive: state.count > 5
  }
}
```

函数的第二个参数 `ownProps`，是 `MyComp` 自己的 `props`。有的时候，`ownProps` 也会对其产生影响。比如，当你在 `store` 中维护了一个用户列表，而你的组件 `MyComp` 只关心一个用户（通过 `props` 中的 `userId` 体现）。

```jsx
const mapStateToProps = (state, ownProps) => {
  // state 是 {userList: [{id: 0, name: '王二'}]}
  return {
    user: _.find(state.userList, {id: ownProps.userId})
  }
}

class MyComp extends Component {
  
  static PropTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object
  };
  
  render(){
    return <div>用户名：{this.props.user.name}</div>
  }
}

const Comp = connect(mapStateToProps)(MyComp);
```

当 `state` 变化，或者 `ownProps` 变化的时候，`mapStateToProps` 都会被调用，计算出一个新的 `stateProps`，（在与 `ownProps` merge 后）更新给 `MyComp`。

这就是将 Redux `store` 中的数据连接到组件的基本方式。

### `mapDispatchToProps(dispatch, ownProps): dispatchProps`

`connect` 的第二个参数是 `mapDispatchToProps`，它的功能是，将 action 作为 `props` 绑定到 `MyComp` 上。

```jsx
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: (...args) => dispatch(actions.increase(...args)),
    decrease: (...args) => dispatch(actions.decrease(...args))
  }
}

class MyComp extends Component {
  render(){
    const {count, increase, decrease} = this.props;
    return (<div>
      <div>计数：{this.props.count}次</div>
      <button onClick={increase}>增加</button>
      <button onClick={decrease}>减少</button>
    </div>)
  }
}

const Comp = connect(mapStateToProps， mapDispatchToProps)(MyComp);
```

由于 `mapDispatchToProps` 方法返回了具有 `increase` 属性和 `decrease` 属性的对象，这两个属性也会成为 `MyComp` 的 `props`。

如上所示，调用 `actions.increase()` 只能得到一个 `action` 对象 `{type:'INCREASE'}`，要触发这个 `action` 必须在 `store` 上调用 `dispatch` 方法。`diapatch` 正是 `mapDispatchToProps` 的第一个参数。但是，为了不让 `MyComp` 组件感知到 `dispatch` 的存在，我们需要将 `increase` 和 `decrease` 两个函数包装一下，使之成为直接可被调用的函数（即，调用该方法就会触发 `dispatch`）。

Redux 本身提供了 `bindActionCreators` 函数，来将 action 包装成直接可被调用的函数。

```jsx
import {bindActionCreators} from 'redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    increase: action.increase,
    decrease: action.decrease
  });
}
```

同样，当 `ownProps` 变化的时候，该函数也会被调用，生成一个新的 `dispatchProps`，（在与 `statePrope` 和 `ownProps` merge 后）更新给 `MyComp`。注意，`action` 的变化不会引起上述过程，默认 `action` 在组件的生命周期中是固定的。

### `[mergeProps(stateProps, dispatchProps, ownProps): props]`

之前说过，不管是 `stateProps` 还是 `dispatchProps`，都需要和 `ownProps` merge 之后才会被赋给 `MyComp`。`connect` 的第三个参数就是用来做这件事。通常情况下，你可以不传这个参数，`connect` 就会使用 `Object.assign` 替代该方法。

### 其他

最后还有一个 `options` 选项，比较简单，基本上也不大会用到（尤其是你遵循了其他的一些 React 的「最佳实践」的时候），本文就略过了。希望了解的同学可以直接看文档。

（完）

## 附：connect 方法的官方英文文档

> #### `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`
>
> Connects a React component to a Redux store.
>
> It does not modify the component class passed to it. Instead, it returns a new, connected component class, for you to use.
>
> #### Arguments
>
> - [mapStateToProps(state, [ownProps]): stateProps] (Function): If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called. Its result must be a plain object*, and it will be merged into the component’s props. If you omit it, the component will not be subscribed to the Redux store. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever the component receives new props (e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated).
> - [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.) If you omit it, the default implementation just injects dispatch into your component’s props. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapDispatchToProps will be re-invoked whenever the component receives new props.
> - [mergeProps(stateProps, dispatchProps, ownProps): props] (Function): If specified, it is passed the result of mapStateToProps(), mapDispatchToProps(), and the parent props. The plain object you return from it will be passed as props to the wrapped component. You may specify this function to select a slice of the state based on props, or to bind action creators to a particular variable from props. If you omit it, Object.assign({}, ownProps, stateProps, dispatchProps) is used by default.
> - [options] (Object) If specified, further customizes the behavior of the connector.
>   - [pure = true] (Boolean): If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps, preventing unnecessary updates, assuming that the component is a “pure” component and does not rely on any input or state other than its props and the selected Redux store’s state. Defaults to true.
>   - [withRef = false] (Boolean): If true, stores a ref to the wrapped component instance and makes it available via getWrappedInstance() method. Defaults to false.