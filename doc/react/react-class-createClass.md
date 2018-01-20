# es6的class写法与es5的createClass都有哪些区别？

## 0. 前言

在使用`React`的时候，根据官方文档，发现了两种创建组件的方式。一种是使用`React.createClass({})`的方式来创建，还有一种是使用`ES6`的class并继承`React.Component`来创建。 刚开始学的时候自己觉得有点迷，并且一直都是使用`ES6`语法来创建组件(毕竟先进嘛)。这段时间稍稍有空，来钻研一下两者之间的区别。

## 1. 先看官方怎么说

从`React`的`v0.13`版本开始，就可以使用`ES6`的语法来代替`React.createClass({})`这种写法了。但是官方也有所声明，在未找到当前mixin用例的代替方案时，都不会放弃`React.createClass({})`这样的写法。
[官方文档地址](https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html)
搬运部分文档

> Today, we’re happy to release React v0.13!
> The most notable new feature is support for ES6 classes, which allows developers to have more flexibility when writing components. Our eventual goal is for ES6 classes to replace React.createClass completely, but until we have a replacement for current mixin use cases and support for class property initializers in the language, we don’t plan to deprecate React.createClass.

## 2. 对比

`React.createClass({})`的工作，基本上都可以使用`ES6`语法来代替。例如，设置`state`：

```
var Msg = React.createClass({
    getInitialState: function() {
        return {
            msg: "HW" 
        };
    }
})

```

```
class Msg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "HW"
        }
    }
}

```

由以上例子可以看出，两种书写方式还是有较大的区别的。

### 区别1. 构造函数

在`React.createClass({})`中，是不用写构造函数并且传入`props`再调用`super(props)`的，而在`ES6`中类的构造函数需要接受`props`作为参数并调用方法。

### 区别2. 初始化状态

`React.createClass({})`中需要书写方法`getInitialState`来对状态进行初始化，而在`ES6`语法中，这些都可以放在构造函数内完成。

### 区别3. 函数绑定

我们虽然可以使用`ES6`语法来定义一些事件方法，但是可惜的是，这些我们定义在`class`中的方法并没有自动绑定到我们希望的对象上，换句话说，就是函数作用域内的`this`的指向不对。
可以看这样一个简单的组件。

```
import React from 'react'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "HW"
        }
    }

    handleClick() {
        this.setState({
            msg: "Click!"
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.msg}</p>
                <button onClick={this.handleClick}>Click!</button>
            </div>
        )
    }
}

```

渲染结果是这样
![img](https://image.hduzplus.xyz/image/1491573401429.png)
这时如果点击按钮，会报错
![img](https://image.hduzplus.xyz/image/1491573430225.png)
这就是因为上文所述，this的作用域不对导致的。
解决方法很简单，在构造方法内加上这么一句话就可以。

```
this.handleClick = this.handleClick.bind(this)

```

如果方法很多，这个方式就很不舒服，可以使用[react-autobind](https://www.npmjs.com/package/react-autobind)

### 区别4. 其他配置

`React.createClass({})`中，`propTypes`和`defaultProps`的定义无需太过费心。
而在`ES6`语法中，情况又有所不同。

```
import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p>{this.props.bar}</p>
            </div>
        )
    }
}

App.propTypes = {
    bar: React.PropTypes.string
}

App.defaultProps = {
    bar: "barbar"
}
export default App

```

而如果使用了`babel-preset-stage-2`，我们可以写出更有感觉的代码。

```
import React from 'react'

export default class App extends React.Component {
    static propTypes = {
        bar: React.PropTypes.string
    }
    static defaultProps = {
        bar: "barbar"
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p>{this.props.bar}</p>
            </div>
        )
    }
}

```

## 3. 总结

以上是我在实际项目中、网络中、官方文档中搜集到的一些关于`React.createClass({})`和`ES6`语法创建组件的不同点。如果有遗漏的话，希望我们可以多多探讨。

**在具体项目中，我们应该用哪个？ **

这个问题其实探讨的意义不是很大。
ES6写法虽然人气日益上涨，但并不是唯一的写法。而且官方也说了，暂时不会放弃对`React.createClass({})`的维护。
如果是个人开发者，完全可以依据个人喜好来选择使用。
如果是项目组，当然需要优先考虑项目组的代码规范。
不过我认为，了解这两者之间的不同点，并且掌握这两种方式是非常有必要的。

**2017年07月18日更新**

其实还有一个非常重要的创建组件的方式——函数式组件。
它的创建方式类似于这样：

```
function Button(props) {
  return <button onClick={props.onClick}>{props.title}</button>
}

```

这是在React 0.14版本之后提供的方法。
这种创建组件的方式相对`ES5`和`ES6`来说简单了不少。尤其是其内部没有包含任何状态(`state`)，我们可以称，他是一个“纯”的组件。

> 关于纯：目前已知的“纯”类最具有代表性的是纯函数，其定义为“传入相同的输入，永远都会有相同的输出”的无副作用的函数。那么类比到组件身上可以定义纯组件为“传入相同的props，永远都会得到相同的组件”。即组件不会受内部状态(state)影响

这样写的好处有很多，我可以简单举几例：
\1. 可以遵循`React`的`controller view`模式。我们可以定义`controller`来保存组件状态，并单独定义纯组件来作为`view`渲染。参考：[controller view模式](http://blog.andrewray.me/the-reactjs-controller-view-pattern/)，[flux架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)
\2. 语法简洁！
其具体可以体现在：
`function Button(props) { return <button onClick={props.onClick}>{props.title}</button> } `
精简：
`let Button = (props) => { return <button onClick={props.onClick}>{props.title}</button> `
再精简：
`let Button = (props) => ( <button onClick={props.onClick}>{props.title}</button>) `
\3. 占用内存少
和其他类型的创建相比，这是显而易见的。
\4. 可扩展占性强
`React`是数据驱动型框架，数据决定了组件的渲染结果。而如果将数据操作绑定在组件内部成为状态(state)的话会增加组件与数据之间的耦合性。编写纯组件并且使用`controller view`模式可以有效降低数据与组件之间的耦合度，使组件的复用能力、扩展能力大大提高。并且使用函数的方式创建组件，可以更好的结合函数式编程，使代码更加优雅。

当然了，其也有比较严重的缺点：
**没有生命周期函数**

因此，对于如何选择定义组件的方式，我还是保留之前的想法，“优先考虑项目组的代码规范”，并且还需要结合实际来考虑，才是最佳之举。

****