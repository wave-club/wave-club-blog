# React 扩展运算符未知的支柱警告



如果您尝试使用不被React识别的道具作为合法的DOM属性/属性来渲染DOM元素，那么unknown-prop警告将触发。你应该确保你的DOM元素没有虚假的道具。

这个警告可能会出现几个可能的原因：

1. 您是否使用`{...this.props}`或`cloneElement(element, this.props)`？您的组件直接将其自己的道具转移到子元素（例如<https://reactjs.org/docs/transferring-props.html>）。将道具转移到儿童组件时，应确保您不会意外地转发旨在由父组件解释的道具。
2. 您在本地DOM节点上使用非标准DOM属性，可能表示自定义数据。如果您尝试将自定义数据附加到标准DOM元素，请考虑使用[MDN中](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes)描述的自定义数据属性。
3. React尚未识别您指定的属性。这可能会在未来版本的React中修复。但是，React目前会去除所有未知属性，因此在您的React应用程序中指定它们不会导致它们被渲染。
4. 您正在使用不带大写字母的React组件。React将其解释为DOM标记，因为[React JSX转换使用大写与小写惯例来区分用户定义的组件和DOM标记](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)。

------

为了解决这个问题，复合组件应该“消耗”用于复合组件的任何道具，而不是用于子组件。例：

**不好：**意外的`layout`道具被转发到`div`标签。

```jsx
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // BAD! Because you know for sure "layout" is not a prop that <div> understands.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // BAD! Because you know for sure "layout" is not a prop that <div> understands.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

**好：**扩展运算符可以用来从道具上拉出变量，并把剩下的道具放到一个变量中。

```jsx
function MyDiv(props) {
  const { layout, ...rest } = props
  if (layout === 'horizontal') {
    return <div {...rest} style={getHorizontalStyle()} />
  } else {
    return <div {...rest} style={getVerticalStyle()} />
  }
}
```

**好：**您还可以将道具分配给新对象，并从新对象中删除正在使用的按键。确保不要从原始`this.props`对象中删除道具，因为该对象应该被认为是不可变的。

```jsx
function MyDiv(props) {

  const divProps = Object.assign({}, props);
  delete divProps.layout;

  if (props.layout === 'horizontal') {
    return <div {...divProps} style={getHorizontalStyle()} />
  } else {
    return <div {...divProps} style={getVerticalStyle()} />
  }
}
```