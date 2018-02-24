# 高性能 React 组件



作者: 慎里 发表于: [2016-08-12](http://taobaofed.org/blog/2016/08/12/optimized-react-components/)

![高性能 React 组件](http://img.alicdn.com/tfs/TB1P4h_LpXXXXbGXpXXXXXXXXXX-900-500.jpg)

# 前言

## 组件的重新渲染

说到 React 组件，肯定离不开组件的 props 和 state，我们可以在 props 和 state 存放任何类型的数据，通过改变 props 和 state，去控制整个组件的状态。当 props 和 state 发生变化时，React 会重新渲染整个组件，组件重新渲染的过程可简化如下图：

![1](http://img1.tbcdn.cn/L1/461/1/c3c7f7f478d86c40530967b5b0fc12037bc71d22)

当组件的 props 或 state 变化，React 将会构建新的 virtual DOM，使用 diff 算法把新老的 virtual DOM 进行比较，如果新老 virtual DOM 树不相等则重新渲染，相等则不重新渲染。DOM 操作是非常耗时的，这导致重新渲染也非常的耗时，因此要提高组件的性能就应该尽一切可能的减少组件的重新渲染。

假设有一个渲染完成的组件，如下图：

![2](http://img3.tbcdn.cn/L1/461/1/c9a9e30223ef6188a4a498a8cfd92e346ba5c17d)

接下来因为状态改变，需要重新渲染下图的绿色的节点，如下图：

![3](http://img4.tbcdn.cn/L1/461/1/7a8b26b7b14319ae4bfedf385fcb092ac33927a4)

一般的想法是只需要更新下面的三个绿色节点就能够完成组件的更新，如下图：

![4](http://img4.tbcdn.cn/L1/461/1/5519a489525ef4b43ca636c2d05890f4cdbb8c94)

事实上根据 React 的更新规则，只要组件的 props 或 state 发生了变化就会重新渲染整个组件，因此除了上述的三个绿色节点以外，还需要重新渲染所有的黄色的节点，如下图：

![5](http://img3.tbcdn.cn/L1/461/1/ca1f450b3816ce5fa3411be1710ecc76d7552765)

除了必要渲染的三个节点外，还渲染了其他不必要渲染的节点，这对性能是一个很大的浪费。如果对于复杂的页面，这将导致页面的整体体验效果非常差。因此要提高组件的性能，就应该想尽一切方法减少不必要的渲染。

# 组件优化

## Pure Component

如果一个组件只和 props 和 state 有关系，给定相同的 props 和 state 就会渲染出相同的结果，那么这个组件就叫做纯组件，换一句话说纯组件只依赖于组件的 props 和 state，下面的代码表示的就是一个纯组件。

```
render() {
     return (
         <div style={{width: this.props.width}}>
                  {this.state.rows}
         </div>
     );
}

```

## shouldComponentUpdate

`shouldComponentUpdate` 这个函数会在组件重新渲染之前调用，函数的返回值确定了组件是否需要重新渲染。函数默认的返回值是 `true`，意思就是只要组件的 props 或者 state 发生了变化，就会重新构建 virtual DOM，然后使用 diff 算法进行比较，再接着根据比较结果决定是否重新渲染整个组件。函数的返回值为 `false` 表示不需要重新渲染。 `shouldComponentUpdate` 在组件的重新渲染的过程中的位置如下图：

![6](http://img1.tbcdn.cn/L1/461/1/354dc8a5e804e06986dae35a92309ec7685499d9)

函数默认返回为 `true`，表示在任何情况下都进行重新渲染的操作，要减少重新渲染，只需要在一些不必要重新渲染的时候，使得函数的返回结果为 `false`。如果使得函数的结果一直为 `false`，这样不管组件的状态怎么变化，组件都不会重新渲染，当然一般情况下没有人会这样干。

## PureRenderMixin

React 官方提供了 PureRenderMixin 插件，插件的功能就是在不必要的情况下让函数 `shouldComponentUpdate` 返回 `false`, 使用这个插件就能够减少不必要的重新渲染，得到一定程度上的性能提升，其使用方法如下：

```js
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}
```

查看源码后发现这个插件其实就是重写了 `shouldComponentUpdate` 方法。

```js
shouldComponentUpdate(nextProps, nextState) {
	return shallowCompare(this, nextProps, nextState);
}
```

重写的方法里面根据组件的目前的状态和组件接下来的状态进行`浅比较`，如果组件的状态发生变化则返回结果为 `false`，状态没有发生变化则返回结果为 `true`，把这个函数进行进一步的分解其实现如下：

```js
shouldComponentUpdate(nextProps, nextState) {
	return !shallowEqual(this.props, nextProps) ||
			!shallowEqual(this.state, nextState);
}
```

就是分别去比较了函数的 props 和 state 的变化情况。

在 React 的最新版本里面，提供了 `React.PureComponent` 的基础类，而不需要使用这个插件。

## 状态比较

假设在每一个组件中都使用 PureRenderMixin 这个插件，我们来看一下使用这个插件后的状态的比较过程。假设我们有一个组件如下：

```html
<Input size={100} color='red'>
```

我们想要去改变这个组件的颜色，使其变为 `blue`，

```html
<Input size={100} color='blue'>
```

则状态的比较就是下面的对象的比较。

![7](http://img4.tbcdn.cn/L1/461/1/72ca4706b371e37deaa3d63a3427c992b6b6911d)

上图的比较是简单对象的比较，比较过程非常简单而且快速。但是如果是比较复杂的对象的比较，比如日期、函数或者一些复杂的嵌套许多层的对象，这些会比较耗时，甚至没法进行比较。

其实我们自己可以重写 `shouldComponentUpdate` 这个函数，使得其能够对任何事物进行比较，也就是`深比较`（通过一层一层的递归进行比较），深比较是很耗时的，一般不推荐这么干，因为要保证比较所花的时间少于重新渲染的整个组件所花的时间，同时为了减少比较所花的时间我们应该保证 props 和 state 尽量简单，不要把不必要的属性放入 state，能够由其他属性计算出来的属性也不要放入 state 中。

## Immutable.js

对于复杂的数据的比较是非常耗时的，而且可能无法比较，通过使用 Immutable.js 能够很好地解决这个问题，Immutable.js 的基本原则是对于不变的对象返回相同的引用，而对于变化的对象，返回新的引用。因此对于状态的比较只需要使用如下代码即可：

```js
shouldComponentUpdate() {
	return ref1 !== ref2;
}
```

这类比较是非常快速的。

## 动静分离

假设我们有一个下面这样的组件：

```jsx
<ScrollTable
	width={300}
	color='blue'
	scrollTop={this.props.offsetTop}
/>
```

这是一个可以滚动的表格，`offsetTop` 代表着可视区距离浏览器的的上边界的距离，随着鼠标的滚动，这个值将会不断的发生变化，导致组件的 props 不断地发生变化，组件也将会不断的重新渲染。如果使用下面的这种写法：

```jsx
<OuterScroll>
	<InnerTable width={300} color='blue'/>
</OuterScroll>
```

因为 `InnerTable` 这个组件的 props 是固定的不会发生变化，在这个组件里面使用 `pureRenderMixin` 插件，能够保证 `shouldComponentUpdate` 的返回一直为 `false`， 因此不管组件的父组件也就是 `OuterScroll` 组件的状态是怎么变化，组件 `InnerTable` 都不会重新渲染。也就是子组件隔离了父组件的状态变化。

通过把变化的属性和不变的属性进行分离，减少了重新渲染，获得了性能的提升，同时这样做也能够让组件更容易进行分离，更好的被复用。

## Children

对于嵌套多层、复杂的组件，组件的子节点很多，组件的更新的时间也将花费更多，并且难于维护，信息流从上往下由父组件传递到子组件单向流动，这可能会导致组件失去我们的控制。

### children change over time

有如下的一个组件（现实中没人会这样写，这只是一个 demo），组件每 1 秒渲染一次。

```jsx
class Parent extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.children != nextProps.children;
    }

    render() {
        return <div>{this.props.children}</div>;
    }

}

setInterval(() => {
    ReactDOM.render(
        <Parent>
            <div>child</div>
        </Parent>
    );
}, 1000);
```

通过在 `shouldComponentUpdate` 函数里面判断组件的 children 是否相等决定是否重新进行渲染，由于 children 是 props 的一个属性，应该每次都是一样的，组件应该不会重新渲染，可是事实上组件每次都会重新渲染。

让我们来看一下，children 的具体结构，如下图：

![8](http://img4.tbcdn.cn/L1/461/1/63cb24b655ca5fd9cec7168d0716fd0be7a7f854)

children 是一个比较复杂的对象，每次组件更新的时候都会重新构造，也就是说 children 是动态构建的，因此每次更新的时候都是不相等的。所以 `shouldComponentUpdate` 每次都会返回 `true`，因此组件每次都会重新渲染。可以用一个变量来代替 children，这样每次构造的也会是相同的对象。

### Independent children

再来看一个比较费力的做法，如下：

```jsx
class TwoColumnSplit extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div>
                <FloatLeft>{this.props.children[0]}</FloatLeft>
                <FloatRight>{this.props.children[1]}</FloatRight>
            </div>
        );
    }
}

<TwoColumnSplit>
    <TargetContainer/>
    <BudgetContainer/>
</TwoColumnSplit>
```

通过在 `shouldComponentUpdate` 中返回 `false`，组件将不会因为外界的状态变化而发生改变，我们这样做是因为组件 `TargetContainer` 和 `BudgetContainer` 没有从它们的父元素获取任何信息，这样就不需要管外界的变化，把 children 和父组件进行了隔离，其实 `TwoColumnSplit` 就是起了隔离的作用。对于不需要从外界获取数据的组件，可以通过返回 `false` 来隔离外界的变化，减少重新渲染。

## Container and Component

我们也可以通过组件的容器来隔离外界的变化。容器就是一个数据层，而组件就是专门负责渲染，不进行任何数据交互，只根据得到的数据渲染相应的组件，下面就是一个容器以及他的组件。

```jsx
class BudgetContainer extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    computeState() {
        return BudgetStore.getStore()
    }

    render() {
        return <Budget {...this.state}/>
    }
}
```

容器不应该有 props 和 children，这样就能够把容器自己和父组件进行隔离，不会因为外界因素去重新渲染，也没有必要重新渲染。

设想一下，如果设计师觉得这个组件需要移动位置，你不需要做任何的更改只需要把组件放到对应的位置即可，我们可以把它移到任何地方，可以放在不同的应用中，同时也可以应用于测试，我们只需要关心容器的内部的数据的来源即可，在不同的环境中编写不同的容器。

![9](http://img1.tbcdn.cn/L1/461/1/c74de69b05661a277c6e9ad2ab12775b706af4d6)

# 总结

- Purity => Use shouldComponentUpdate & PureRenderMixin

- Data Comparability => Use highly comparable data (immutability)

- Loose coupling => Use for maintainability and performance

- Children => Be careful of children, children create deep update,

  ```
  children are always change,  we should  insulate them from parent
  ```