# React 中的ref 介绍， 为什么他们很重要



ref 是一个入口 允许您直接访问DOM元素或组件实例。

为了使用它们，您可以向组件添加一个ref属性，该属性的值是一个回调函数，它将接收底层的DOM元素或组件的已挂接实例作为其第一个参数。



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

以上注意到我们的输入字段有一个ref属性，其值是一个函数。该函数接收我们然后放在实例上的实际的DOM元素，以便在*handleSubmit*函数内部访问它。



经常误解，您需要使用类组件才能使用参考，但是参考也可以通过利用JavaScript中的闭包与功能组件一起使用。



```javascript
function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

