# 受控组件与不受控制的组件有什么区别？



React的很大一部分是将组件控制和管理自己的状态的想法。

当我们将本机HTML表单元素（输入，选择，文本区域等）投入到组合中时会发生什么？我们是否应该使用React作为“单一的真理来源”，就像我们习惯使用React一样，或者**我们是否允许表单数据生活在DOM中**，就像我们习惯于使用HTML表单元素一样？这两个问题是控制和不受控制组件的核心。

甲**控制**组分为其中阵营处于组分*控制*和是真理的表单数据的单一来源。

如下所示，*用户名*不存在于DOM中，而是以我们的组件状态存在。每当我们想要更新*用户名时*，我们就像以前一样调用*setState*。

```javascript
class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () => {}
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.username}
          onChange={this.updateUsername} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

一种**不受控制的**组分为其中表单数据由DOM处理，而不是你阵营组件内部。

你可以使用*参考*来完成这个。

```javascript
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

虽然不受控制的组件通常更容易实现，

因为您只需使用引用从DOM获取值，通常建议您通过不受控制的组件来支持受控组件。**主要原因是受控组件支持即时字段验证，允许您有条件地禁用/启用按钮，强制输入格式**，并且更多的是“React方式”。