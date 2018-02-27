# 移动端和pc的差异



#### 0.pc和移动端布局的差异

1.兼容性差异。PC端在开发过程中考虑的是浏览器兼容性，移动端开发中考虑的是手机兼容性问题，做移动端开发，更多考虑的是手机分辨率的自适应和不同手机操作系统的略微差异化； 2.布局差异。移动端布局一般是rem或者百分比布局，但是pc布局一般都是固定px布局。 移动端布局：百分比布局+rem和媒体查询 3.事件处理差异。 4.动画处理的差异。PC端要考虑IE的兼容性，通常用JS做动画的通用性会好一些，但相比CSS3却牺牲了较大的性能，而在手机端，如果要做一些动画、特效等，第一选择肯定是CSS3，既简单，效率又高。 5.移动端更加需要性能的优化。

#### 1.移动端适配和布局

为什么会有混合式app？

原因： H5的优势在于随时发布，无需修改native代码，满足了业务灵活配置的需求。 webview作为移动端H5容器，可以在移动端显示和渲染Web页面，直接使用html文件（网络上或本地assets中）作布局，可和JavaScript交互调用

##### 1.viewport视口

桌面浏览器的视口就是浏览器的窗口，视口的宽度和浏览器窗口的宽度一致 移动端的视口比较复杂，在手机上，视口与移动端浏览器屏幕宽度不再相关联

在默认情况下，一般来讲，移动设备上的viewport都是要大于浏览器可视区域的。一般为980px或者1024px，但会导致浏览器出现滚动条。这个浏览器默认的viewport叫做 layout viewport。

layout viewport-渲染视图，渲染页面所需要的尺寸--document.documentElement.clientWidth获取 visual viewport-视觉视图，浏览器可视区域尺寸--window.innerWidth获取 ideal viewport-理想视图，不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；显示的文字的大小合适 ideal viewport并没有一个固定的尺寸，不同的设备拥有有不同的ideal viewport。 所有的iphone的ideal viewport宽度都是320px，无论它的屏幕宽度是320还是640， 也就是说，在iphone中，css中的320px就代表iphone屏幕的宽度。

```html
//该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。--ideal viewport
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

```

把当前的viewport宽度设置为 ideal viewport 的宽度的三种写法

```html
//在iphone和ipad上，无论是竖屏还是横屏，宽度都是竖屏时ideal viewport的宽度。
<meta name="viewport" content="width=device-width">
//windows phone 上的IE 无论是竖屏还是横屏都把宽度设为竖屏时ideal viewport的宽度。
<meta name="viewport" content="initial-scale=1">
//这样是比较完美的写法，可以解决上述bug
<meta name="viewport" content="width=device-width, initial-scale=1">

```

##### 2.像素

存在两种像素：设备像素和CSS像素。桌面浏览器物理像素1px和css像素1px是对应的，所以给我们一种css像素是物理像素的错觉。

设备像素pt(物理像素)：屏幕是由很多像素点组成的。 随着设备生产出来就已经被确定下来了，比如 iPhone4 的屏幕分辨率为 640×960，就表示屏幕的横向有 640 个像素点，纵向有 960 个像素点。

CSS像素px(逻辑像素)：css元素的像素相当于多少设备像素取决于页面是否缩放和屏幕是否为高密度

设备像素比：window.devicePixelRatio = 物理像素/CSS像素 比如：5s的物理像素为640px, CSS像素为320px,那 dpr = 640/320 = 2.

rem：font size of the root element，那么rem是个单位，单位大小由根元素font-size的大小决定。

##### 3.移动开发常遇到的几个问题

0.meta标签

--禁止缩放

--设置Web应用是否以全屏模式运行

--启动或禁用自动识别页面中的电话号码 （默认情况下，设备会自动识别任何可能是电话号码的字符串。设置telephone=no可以禁用这项功能。）

1.图片不清晰。两倍图片(2x)，然后图片容器缩小50%。

如：图片大小，400×600;但只有200*300的空间

```css
//img标签
width: 200px;
height: 300px;
//背景图片
width: 200px;
height: 300px;
background-image: url(image@2x.jpg);
background-size: 200px 300px; // 或者: background-size: contain;

```

ps：background-size的属性值：length，percentage(相对于父元素的比例)，cover(把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。)，contain(把图像扩展至最大尺寸，以使宽度和高度 完全适应内容区域。)

2.判断设备类型是android还是ios

```js
var u = navigator.userAgent;
//android终端
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
//ios终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

```

3.移动端Retina屏幕1px边框问题

在retina屏幕上1px可能会因为dpr的原因被渲染成1.5px，2px等等。所以需要解决

方法一：ios8已经有了支持0.5px，但是其他不支持

```css
// IOS8 hairline
.hairline(@color, @style:solid) {
    @media (-webkit-min-device-pixel-ratio: 2) {
        border: 0.5px @style @color;
    }
}

```

方法二：我们照常写border-bottom: 1px solid #ddd;，然后通过transform: scaleY(.5)缩小0.5倍来达到0.5px的效果

```css
.scale{
    position:relative;
}
.scale:after{
    content:'';
    position:absolute;
    right:0;
    left:0;
    boottom:0;
    border-bottom:1px solid black;
    -webkit-transform:scaleY(.5);
    -webkit-transform-origin:0 0;
}

```

方法三：rem+viewport实现--适合新项目，不然该起来成本较大

```html
在devicePixelRatio = 2 时，输出viewport：
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
在devicePixelRatio = 3 时，输出viewport：
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">

```

4.多屏适配布局问题

一般rem可以用docEl.clientWidth * dpr / 10;

方法一：用css的@media，但是可能不够精准

```css
@media only screen and (min-width : 320px) and (max-width : 359px) {
    html,body {
        font-size: 12px;
    }
}

@media only screen and (min-width : 360px) and (max-width : 639px) {
    html,body {
        font-size: 12px;
    }
}

@media only screen and (min-width : 640px) and (max-width : 749px) {
    html,body {
        font-size: 20px;
    }
}

@media only screen and (min-width : 750px) {
    html,body {
        font-size: 25px;
    }
}

```

方法二：js方法精确计算基准值rem

泽斯实现的

```js
function Adapter(config) {
    this.config = config;
    return this;
}

Adapter.prototype = {

    // TODO: 根据适配策略适配屏幕
    reset: function() {
        var baseline = this.config && this.config.baseline && !isNaN(this.config.baseline) ? this.config.baseline : 750;
        //策略1: 小于750动态计算缩放，大于750页面不再放大
        var logicFontSize = Math.min(document.documentElement.clientWidth, baseline) / baseline * 100;
        document.documentElement.style.fontSize = logicFontSize + 'px';

        //缩放补偿
        var actualFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize),
        scaleRate = logicFontSize/actualFontSize;
        if(scaleRate == 1){
            return;
        }
        document.documentElement.style.fontSize = (logicFontSize * scaleRate) + "px";
    }

};

/*
 * 通过ADAPTER_CONF设置屏幕基准
 * window.ADAPTER_CONF = {
 *      baseline: 750
 * };
 */
window.Adapter = new Adapter(window.ADAPTER_CONF || {});

window.Adapter.reset();

window.onload = function() {
    window.Adapter.reset();
};

window.onresize = function() {
    window.Adapter.reset();
};

```

```js
var docEl = document.documentElement,
    metaEl = document.querySelector('meta[name='viewport']'),
    fontEl = document.createElement('div');

var dpr = docEl.devicePixelRatio || 1,
    rem = docEl.clientWidth * dpr/10,
    scale = 1/dpr;

// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);
// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

```

```js
!function(win, lib) {
    var timer,
        doc     = win.document,
        docElem = doc.documentElement,

        vpMeta   = doc.querySelector('meta[name="viewport"]'),
        flexMeta = doc.querySelector('meta[name="flexible"]'),

        dpr   = 0,
        scale = 0,

        flexible = lib.flexible || (lib.flexible = {});

    // 设置了 viewport meta
    if (vpMeta) {

        console.warn("将根据已有的meta标签来设置缩放比例");
        var initial = vpMeta.getAttribute("content").match(/initial\-scale=([\d\.]+)/);

        if (initial) {
            scale = parseFloat(initial[1]); // 已设置的 initialScale
            dpr = parseInt(1 / scale);      // 设备像素比 devicePixelRatio
        }

    }
    // 设置了 flexible Meta
    else if (flexMeta) {
        var flexMetaContent = flexMeta.getAttribute("content");
        if (flexMetaContent) {

            var initial = flexMetaContent.match(/initial\-dpr=([\d\.]+)/),
                maximum = flexMetaContent.match(/maximum\-dpr=([\d\.]+)/);

            if (initial) {
                dpr = parseFloat(initial[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }

            if (maximum) {
                dpr = parseFloat(maximum[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    // viewport 或 flexible
    // meta 均未设置
    if (!dpr && !scale) {
        // QST
        // 这里的 第一句有什么用 ?
        // 和 Android 有毛关系 ?
        var u = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi)),
            _dpr = win.devicePixelRatio;

        // 所以这里似乎是将所有 Android 设备都设置为 1 了
        dpr = u ? ( (_dpr >= 3 && (!dpr || dpr >= 3))
                        ? 3
                        : (_dpr >= 2 && (!dpr || dpr >= 2))
                            ? 2
                            : 1
                  )
                : 1;

        scale = 1 / dpr;
    }

    docElem.setAttribute("data-dpr", dpr);

    // 插入 viewport meta
    if (!vpMeta) {
        vpMeta = doc.createElement("meta");

        vpMeta.setAttribute("name", "viewport");
        vpMeta.setAttribute("content",
            "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no");

        if (docElem.firstElementChild) {
            docElem.firstElementChild.appendChild(vpMeta)
        } else {
            var div = doc.createElement("div");
            div.appendChild(vpMeta);
            doc.write(div.innerHTML);
        }
    }

    function setFontSize() {
        var winWidth = docElem.getBoundingClientRect().width;

        if (winWidth / dpr > 540) {
            (winWidth = 540 * dpr);
        }

        // 根节点 fontSize 根据宽度决定
        var baseSize = winWidth / 10;

        docElem.style.fontSize = baseSize + "px";
        flexible.rem = win.rem = baseSize;
    }

    // 调整窗口时重置
    win.addEventListener("resize", function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);


    // 这一段是我自己加的
    // orientationchange 时也需要重算下吧
    win.addEventListener("orientationchange", function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);


    // pageshow
    // keyword: 倒退 缓存相关
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    // 设置基准字体
    if ("complete" === doc.readyState) {
        doc.body.style.fontSize = 12 * dpr + "px";
    } else {
        doc.addEventListener("DOMContentLoaded", function() {
            doc.body.style.fontSize = 12 * dpr + "px";
        }, false);
    }

    setFontSize();

    flexible.dpr = win.dpr = dpr;

    flexible.refreshRem = setFontSize;

    flexible.rem2px = function(d) {
        var c = parseFloat(d) * this.rem;
        if ("string" == typeof d && d.match(/rem$/)) {
            c += "px";
        }
        return c;
    };

    flexible.px2rem = function(d) {
        var c = parseFloat(d) / this.rem;

        if ("string" == typeof d && d.match(/px$/)) {
            c += "rem";
        }
        return c;
    }
}(window, window.lib || (window.lib = {}));

```

5.touchstart和click冲突

问题常见发生场景： 假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的touchstart事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了click事件。

这是因为在移动端浏览器，事件执行的顺序是 touchstart > touchmove >touchend > click。

另外ontouchstart／ontouchmove／ontouchend／事件的原理如下： 1.在touchstart事件触发时， 记录手指按下的时间startTime，本次滑动的初始位置initialPos。 2.在touchmove事件触发时， 记录当前位置nowPosition（实时移动元素），滑动距离movePosition（当前位置nowPosition与初始位置initialPos的差值），判断正负数再决定是左还是右移动。 3.在touchend事件触发时， 记录手指离开屏幕的时间endTime，获得手指在屏幕上停留的时间（endTime－startTime），滑动距离movePosition 判断是否滑动： 如果停留时间少于300ms，则认为是快速滑动，无论滑动距离是多少，都到下一页 滑动距离与‘容器’ 大小进行比较，若超过‘容器’大小的1/3，则到下一页

6.两列布局，但是有padding或者border。

```css
.box{
    float:left;
    width:50%;
    box-sizing:border-box;
    padding://这时候设置padding就无所谓了，因为是border-box
}

```

7.图片加载比较慢

预加载图片

```js
function preloadImg(srcArr){
    if(srcArr instanceof Array){
        for(var i=0; i<srcArr.length; i++){
            var oImg = new Image();
            oImg.src = srcArr[i];
        }
    }
}

```

???/canvas加载

8.移动端的媒体查询

width device-width max-width min-width max-device-width min-device-width orientation

```css
@media screen and (min-width:1024px) {}
@media screen and (max-device-width: 480px) and (orientation:landscape)

```

#### 2.移动端性能的提升

如何优化HTML5在移动设置上的性能表现，首先需要明确以下几个原则：

1、PC优化手段在Mobile端同样适用。

2、在Mobile侧我们提出三秒种渲染完成首屏指标。

3、基于第二点，首屏加载3秒完成或使用Loading。

4、基于联通3G网络平均338KB/s(2.71Mb/s)，所以首屏资源不应超过1014KB。

5、Mobile端因手机配置原因，除加载外渲染速度也是优化重点。

6、基于第五点，要合理处理代码减少渲染损耗。

7、基于第二、第五点，所有影响首屏加载和渲染的代码应在处理逻辑中后置。

8、加载完成后用户交互使用时也需注意性能。