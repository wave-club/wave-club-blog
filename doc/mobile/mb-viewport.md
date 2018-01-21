# viewport详解

以下内容整理自ppk文章，[metaviewport](http://www.quirksmode.org/mobile/metaviewport/)，比较早期，但能够说明白许多事情。



文章可以解释清楚以下问题：

- 如果不设置`viewport`标签，H5页面的宽度为何会很大。为什么？这个值是固定的吗？
- `device-width`到底的值到底是多少，有何科学依据，为何好像每个机器不一样？这个和硬件的分辨率有什么关系？如何解决各种硬件的宽度自适应？
- 为何有些优化方案不需要写`width=device-width`,只需要设置`initial-scale=1`
- 解决1px边框问题，对于dpr为2的iOS设备，设置`<meta name="viewport" content="initial-scale=0.5,user-scalable=no,maximum-scale=0.5, minimum-scale=0.5">`就搞定了，而同样的设置对于DPR为2的Android设备却不可行，这背后的原理又使什么？

viewport mata标签包含了浏览器关于视窗（`viewports`）和缩放（`zooming`）的指令。特别地是，它允许web开发人员设置`layout viewport`的宽度，这个宽度直接影响到`width：20%`这样的css声明的计算。

viewport meta标签包含如下的语法：

```html
<meta name="viewport" content="name=value,name=value">
```

## 指令

**viewport mata标签的每一对name/value都是一条指令。总共有6条指令：**

- width： 用来设置layout viewport的宽度.
- initial-scale： 用来设置页面的初始缩放值以及layout viewport的宽度。
- minimum-scale： 用来设置允许的最小缩放值(例如，用户可以缩小至什么程度)。
- maximum-scale： 用来设置允许的最大缩放值(例如，用户可以放大至什么程度)。
- height： 期望用于设置layout viewport的高度。但一直没被支持。
- user-scalable： 当设置为no时，则禁止用户进行缩放。

## device-width值

width指令有一个特殊的值：`device-width`。它能将`layout viewport`的宽度设置成`理想`的viewport宽度。 理论上同样有一个类似的`device-height`值，但实际上这个值并不起作用。

## 第三种viewport

之前ppk曾发文说过移动端浏览器有[两种viewport](http://www.quirksmode.org/mobile/viewports2.html)：一种是`visual viewport`，另外一种是`layout viewport`。可以再次阅读这篇文章。现在假定读者已经了解这两种`viewport`。

## ideal viewport

事实上还有第三种`viewport`，在此就称之为`ideal viewport`。它为每个设备上的web页面提供了一个理想的尺寸（`ideal size`）。因此,每个设备的`ideal viewport`的尺寸都会不同。

非retina屏幕的老旧/便宜设备，它们的`ideal viewport`和设备的物理分辨率是相同的，但其实没有这个必要。具备高物理像素密度的新式设备很好地保留了原有的`ideal viewport`，因为`ideal viewport`很机智地适配了这些新设备。

包括4S，iPhone的`ideal viewport`是320x480(物理分辨率640*960)，无论这些设备是不是具备retina屏幕。这是因为在这些iPhone上web页面的理想尺寸都是320x480（5s就不一样了，6、6p、7、7p又都不一样了）。

关于`ideal viewport`有两点很关键：

1. `layout viewport`可以被设置为`ideal viewport`对应的值。`width=device-width` 和 `initial-scale=1`指令都能够实现。
2. 所有的缩放比例指令都相是对于`ideal viewport`而言，无论`layout viewport`拥有什么样的宽度。因此`maximum-scale=3`意味着web页面可以放大到`ideal viewport`的三倍大。

## 找到每个设备的ideal viewport尺寸

给H5页面设置如下的meta标签，并读取`document.documentElement.clientWidth/Height`的值：

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

部分机型可能取不到值，在这不做全面测试。

## 兼容性-ideal viewport

下图是ppk整理的部分机型的`ideal viewport`值以及存在的兼容性

![2e51463a4cffe345c2af20237e33579b](https://camo.githubusercontent.com/dea07b0a19cc12ac6c39c35caee86cda472ccdbc/687474703a2f2f696d67322e746263646e2e636e2f4c312f3436312f312f31663637363430333935333263326335623735636662303031616439356261626236653932343966)

这里列出了主流机型的`ideal viewport`（N年前数据），由于目前大部分APP只支持Android和iOS设备，并且只支持竖屏，所以在这里只关心部分数据。

如图所示，通过设置`width=device-width`以及`initial-scale=1`在竖屏下，浏览器都会成功地将`layout viewport`的宽度设置成`ideal viewport`的宽度。

## Layout viewport的宽度

在渲染页面前，浏览器需要知道`layout viewport`的宽度是多少。`layout viewport`与例如如何计算`width: 20%`的CSS声明有关联。

如果没有进一步指令，浏览器会自行为`width`取一个值。用来测试的8个浏览器中的6个都设置成了980px，而BlackBerry和IE10则是1024px。这里没有对和错，这只是浏览器厂商的一个选择而已。

但我们在viewport meta标签使用`width=400`或者其他数字时，layout viewport会被设置为这个值。

但Android WebKit和IE的viewport的宽度最小值是320px。因此当设置小于320px时，它们会恢复成`ideal viewport`对应的宽度值。

所以存在一种情况，会使`layout viewport`和`ideal viewport`相等。即当设置了`width=device-width`或`initial-scale=1`时。实际情况有些复杂，因为在Safari和IE10上存在bug。使用`initial-scale`会抛出一个异常，虽然这是通用的规则。

## 最大和最小值的指令

`layout viewport`的最大宽度是**10000px**，虽然这个数值不太可信，因为浏览器不会允许你放大到这个数值，现在假定这个官方数值有效。

宽度的最小值一般是`ideal viewport`的1/10，这也是放大的最大值。（也就是`layout viewport`不可能再比这最小的`visual viewport`再小）。不过有一个例外，Android WebKit和IE, 其宽度都不能低于320px。

## 兼容性-layout viewport

![af29aaf8bfed762e082004dc52d79b01](https://camo.githubusercontent.com/1ab82324d6d300258d046606300007686c86708e/687474703a2f2f696d67322e746263646e2e636e2f4c312f3436312f312f37623734653162303662363761666338333735356134386639663263313237333037393062663237)

## 缩放

浏览器的缩放很诡异。理论上很简单：缩放系数（zoom factor）取决于用于用户设置的放大和缩小系数。这里存在两个问题：

1、 我们不能够直接读取缩放系数，而是需要读取`visual viewport`的宽度，这个宽度和缩放系数成反比关系。缩放系数越大，`visual viewport`的宽度越小。

所以最小缩放系数决定了最大的`visual viewport`宽度，反之亦然。

2、事实上缩放系数都和`ideal viewport`成比例，无论`layout viewport`的尺寸是多少。

因此关于缩放这个名字的问题，缩放实际上是比例，而`viewport meta`的指令称之为`initial-scale`、`minimum-scale`、`maximum-scale`。其它浏览器为了保持和针对iPhone适配的网站兼容也只好被迫实现了这些指令。

这三个指令控制了缩放行为，例如2意味着放大到`ideal viewport`宽度的两倍。

## 公式

首先可以定义一个公式：

```jade
visual viewport width = ideal viewport width / zoom factor
zoom factor = ideal viewport width / visual viewport width
```

因此，对于`ideal viewport`宽度是320px，而zoom factor是2，我们得到`visual viewport`的宽度则是160px。这里的计算和`layout viewport`的宽度无关。

## 最大和最小缩放系数

由于现在主流的H5页面都不支持缩放，所以这点没有继续深究的必要。

## initial-scale

设置`initial-scale`指令，实际上完成了2件事情：

```jsx
1、设置了页面的初始缩放比例，根据相关的`ideal viewport`，生成对应的`visual viewport`宽度。

2、根据刚刚计算出来的`visual viewport`宽度设置`layout viewport`的宽度。
```

所以可以说在iPhone的竖屏模式下，如果设置了`initial-scale=2`，并且没有其它的指令时。这时会设置`visual viewport`的宽度为160px（320/2）。这充分解释缩放指令是如何工作的。

同时，它也将`layout viewport`的宽度设置为160px。因此，我们在最小缩放模式下有了一个160px宽的网页。（因为`visual viewpor`不能比`layout viewport`宽，所以无法对其进行缩小）。

### 浏览器bug

Android WebKit有个问题，Android WebKit在没有`width`指令时，仅允许`initial-scale`的值为1，用它来设置`layout viewport`的宽度才会生效。所以没有其它指令而只有`initial-scale=1`，只有这种情况才会工作。

## width指令的冲突

因为`initial-scale`设置了`layout viewport`的宽度，因此可能出现指令冲突。

```html
<meta name="viewport" content="initial-scale=1,width=400">
```

以上标签会发生什么？浏览器识别到了冲突的设置，以iPhone4s为例：

```
1、`initial-scale=1`通知浏览器将`layout viewport`的宽度在竖屏模式下设置为320px，在横屏模式下设置为480px。
2、width=400通知浏览器将`layout viewport`的宽度在竖屏模式和横屏模式都设置为400px。
```

浏览器会按照最大的宽度值来设置，无论在横屏还是竖屏。在这个例子里，在竖屏模式下，`layout viewport`的宽度设置成了400px（取320和400两者的最大值），而在横屏模式下，layout viewport的宽度则为480px（480和400两者的最大值）。

### 浏览器bug

Android WebKit不会遵循以上的规则。如果`width`等于`device-width`或者小于320,Android WebKit总是会将`layout viewport`的宽度设置成ideal viewport。而大于320的宽度则一直遵循`width`指令。

## 小结

理解下来，对于H5页面（只针对iOS和Android）：

- 如果不设置`viewport`，则H5页面的width即`layout viewport`的width（`document.documentElement.clientWidth`）会是**980px**。
- 如果设置了`viewport`（`width=device-widt`h或者`initial-scale=x`），则`layout viewport`的width瞬间变成`ideal viewport`的宽度（即device-width，每个机器不一样）。

文中我的理解肯定有些地方不对，欢迎指正！