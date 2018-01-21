# 纯CSS绘制三角形



我们的网页因为 CSS 而呈现千变万化的风格。这一看似简单的样式语言在使用中非常灵活，只要你发挥创意就能实现很多比人想象不到的效果。特别是随着 CSS3 的广泛使用，更多新奇的 CSS 作品涌现出来。

学会了一种css绘制方法后，绘制其他三角形的方法基本也是大同小异。

**1.向上**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921214754_75811.jpg)

```css
#triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
```

**2.向下**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921214826_10629.jpg)

```css
#triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}
```

**3.向左**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921214847_52721.jpg)

```css
#triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}
```

**4.向右**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921214904_77183.jpg)

```css
#triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
}
```

**5.左上**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921214937_96503.jpg)

```css
#triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
```

**6.右上**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921215008_28301.jpg)

```css
#triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent; 
}
```

**7.左下**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921215031_42793.jpg)

```css
#triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}
```

**8.右下**

![img](http://www.hello-ui.com/Uploads/image/20160921/20160921215049_92522.jpg)

```css
#triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}
```