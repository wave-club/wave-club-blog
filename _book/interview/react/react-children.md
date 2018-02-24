# 为什么用`React.Children.map(props.children, () => )`而不是`props.children.map(() => )`



不能保证*props.children*将是一个数组。

以此代码为例，

```javascript
<Parent>
  <h1>Welcome.</h1>
</Parent>
```

如果我们尝试使用`props.children.map`它来映射孩子，父母内部会抛出错误，因为它`props.children`是一个对象而不是一个数组。

`props.children`如果有多个子元素（如此），则React只会生成一个数组

```javascript
<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>
```

这就是为什么你想要赞成，`React.Children.map`因为它的实现考虑到*props.children*可能是一个数组或一个对象。