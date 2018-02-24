# react 从使用 看定义



如果你创建了一个类似元素做出反应**Twitter的**下面，你会的组件定义**Twitter的**样子？



```javascript
<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>
```



```javascript
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise
// which will resolve with that username's data.

class Twitter extends Component {
  // finish this
}
```



如果你不熟悉*渲染回调*模式，这将看起来有点奇怪。在这种模式中，组件接收一个函数作为它的孩子。注意`<Twitter>`上面打开和关闭标签的内容。*Twitter*组件的子代替您之前可能看到的其他组件，而是一个功能。这意味着在实现*Twitter*组件时，我们需要将*props.children*视为一个功能。



以下是我如何解决问题。



```javascript
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'

class Twitter extends Component {
  state = {
    user: null,
  }
  static propTypes = {
    username: PropTypes.string.isRequired,
  }
  componentDidMount () {
    fetchUser(this.props.username)
      .then((user) => this.setState({user}))
  }
  render () {
    return this.props.children(this.state.user)
  }
}
```

请注意，正如我上面提到的，我通过调用它并将其传递给用户来处理*props.children*作为一个函数。

这种模式的好处是我们已经将我们的父组件与子组件分离了。父组件管理状态，父组件的消费者可以决定以何种方式将从父级接收的参数应用于其UI。

为了证明这一点，我们假设在另一个文件中，我们要渲染一个*Profile*而不是一个*Badge*，因为我们使用render回调模式，所以我们可以很容易地在UI上交换，而不用改变我们对父（*Twitter*）组件的实现。