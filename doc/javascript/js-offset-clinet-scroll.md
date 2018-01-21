# 容易混淆的DOM元素尺寸client-*、scroll-*、 offset-*



## 1.关于offset-*

offset在这里有偏移量的意思，`offset-*`系列共有四个属性：`offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`，这些属性均用来测算距离，但在详细讲解之前，我们先要弄懂`offsetParent`。
![offset系列](http://p1.bqimg.com/567571/31e9e0aac7a7e6c1.jpg)

### 1.offsetParent

`offsetParent`直译过来是偏移父级，但准确理解，应为定位父级。我们要确定一个元素的偏移量，需要参照物，而这个参照物就是`offsetParent`。它指的是，离当前元素最近的定位父元素（position≠static）。
判别`offsetParent`：可以通过以下几条：

- 通过元素的`offsetParent`属性直接获取。
- 元素`position:fixed`，则其`offsetParent`的值为`null`，此时相对视口定位。
- 元素非`fixed`定位，其父元素无位设置定位，则`offsetParent`均为`<body>`。
- 元素非`fixed`定位，其父元素中有设置定位的，则其中离当前元素最近的父元素为`offsetParent`。
- `<body>`的`offsetParent`为`null`，相对视口定位。

### 2.offsetTop

`offsetTop`指元素上外边框到`offsetParent`上内边框的距离。
**PS:**与JQuery中的`offset().top`不同！`offset().top`指元素相对于文档的偏移。

### 3.offsetLeft

`offsetLeft`指元素作外边框到`offsetParent`左内边框的距离。
**PS:**与JQuery中的`offset().left`不同！`offset().left`指元素相对于文档的偏移。

### 4.offsetWidth

`offsetWidth`指元素在水平方向上所占空间的大小，为盒模型宽度减去水平margin值。

```js
offsetWidth =  border-left-width + padding-left + width + padding-right + border-right-width; 
```

### 5.offsetHeight

`offsetHeight`指元素在垂直方向上所占空间的大小，为盒模型高度减去垂直margin值。

```
offsetHeight =  border-top-width + padding-top + height + padding-bottom + border-bottom-width;
```

### 6.演示

```html
<style>
* {
    margin: 0;
    padding: 0;
}
.wrap {
    width: 200px;
    height: 200px;
    margin: 10px;
    border: 15px solid #ccc;
    position: relative;
}
#div {
    width: 100px;
    height: 100px;
    margin: 20px;
    padding: 10px;
    border: 10px solid #333;
    background-color: black;
}

</style>
</head>
<body>
    <div class="wrap">
        <div id="div"></div>
    </div>

    <script>
        var div = document.getElementById('div');
        console.log('offsetLeft is:'+div.offsetLeft);
        console.log('offsetTop is:'+div.offsetTop);
        console.log('offsetWidth is:'+div.offsetWidth);
        console.log('offsetHeight is:'+div.offsetHeight);
        console.log(div.offsetParent);
    </script>
</body>
```

在此，`#div`并未设置任何定位，但它的父元素`.wrap`设置了相对定位，因此`#div`的`offsetParent`为`.wrap`，我们通过所设数据可以计算：

- offsetLeft = margin-left(20)；
- offsetTop = margin-top(20)；
- offsetWidth = border-left(10) + padding-left(10) + width(100) + padding-right(10) + border-right(10) = 140
- offsetHeight = border-top(10) + padding-top(10) + height(100) + padding-bottom(10) + border-bottom(10) = 140
  **PS：** 由于浏览器的原因，我们得到的`offsetWidth`与`offsetHeight`均不足140。
  ![offset演示](http://p1.bqimg.com/567571/9ac0209c5ef1eafb.jpg)

### 7.注意事项

- 所有偏移量只读。
- 若元素`display:none`则所有偏移量为0.
- 每次访问偏移量都要重新计算，因此建议将其存为变量。

## 2.关于client-*

`client`指客户端、视口、可视区。
![client系列](http://p1.bpimg.com/567571/99d4fd46b71b061d.jpg)

### 1.clientTop

其值为元素`border-top`的值。

### 2.clientLeft

其值为元素`border-left`的值。

### 3.clientWidth

与`offsetWidth`类似，但它只包含内容宽度与padding宽度，不含margin值。当出现滚动条时，不包含滚动条大小，但会额外增加几像素。

```
clientWidth = padding-left + width + padding-right;

```

### 4.clientHeight

与`offsetHeight`类似，但它只包含内容高度与padding大小，不含margin值。当出现滚动条时，不包含滚动条大小，但会额外增加几像素。

```
clientHeight = padding-top +height + padding-height;

```

### 5.演示

```html
<style>
* {
    margin: 0;
    padding: 0;
}
#div {
    width: 100px;
    height: 100px;
    margin: 20px;
    padding: 10px;
    border: 15px solid #333;
    background-color: black;
    overflow: auto;
}

</style>
</head>
<body>
    <div id="div"></div>
    <script>
        var div = document.getElementById('div');
        console.log('clientLeft is:'+div.clientLeft);
        console.log('clientTop is:'+div.clientTop);
        console.log('clientWidth is:'+div.clientWidth);
        console.log('clientHeight is:'+div.clientHeight);
    </script>
</body>
```

- clientLeft ≈ border-left（15）;
- clientTop ≈ border-top（15）;
- clientWidth = padding-left（10） + width（100） + padding-right（10）;
- clientHeight = padding-top（10） +height（100） + padding-height（10）;

**PS:**因为浏览器的缘故，border总与设置有略微出入。

![client系列演示](http://p1.bpimg.com/567571/2ae75ba6650b6ff4.jpg)

## 3.关于scroll-*

此系列示意图可参考：[DOM元素尺寸offsetWidth,scrollWidth,clientWidth等详解](http://www.2cto.com/kf/201507/413536.html)中的展示

### 1.scrollTop

指当前元素可见区顶部，到完整内容顶部的距离。

### 2.scrollLeft

指当前元素可见区左部，到完整内容左部的距离。

### 3.scrollWidth

```
scrollWidth = 完整内容宽度 + padding-left + padding-right; 

```

### 4.scrollHeight

```
scrollHeight = 完整内容高度 + padding-top + padding-bottom;

```

### 5.演示

```html
<style>
* {
    margin: 0;
    padding: 0;
}
#div {
    width: 100px;
    height: 100px;
    margin: 20px;
    padding: 10px;
    border: 15px solid #333;
    background-color: black;
    overflow: auto;
    color: blue;
}
</style>
</head>
<body>
    <div id="div">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo vitae similique consequuntur, voluptatem, impedit labore minus odit sequi, deleniti aliquam inventore ipsa qui. Rem quis assumenda quisquam inventore deleniti consequatur!</div>
    <script>
        var div = document.getElementById('div');
        console.log('scrollLeft is:'+div.scrollLeft);
        console.log('scrollTop is:'+div.scrollTop);
        console.log('scrollWidth is:'+div.scrollWidth);
        console.log('scrollHeight is:'+div.scrollHeight);
    </script>
```

- 此时尚未拖动滚动条，因此scrollLeft与scrollTop均为0。
  ![scroll系列演示](http://p1.bpimg.com/567571/f5daab602f97466c.jpg)