# 首屏、白屏时间如何计算





 

“闻之我也野, 视之我也饶, 行之我也明” —- 前段时间感觉自己看的书比较多, 其中关于性能优化方面, 虽然知道一些
对于 web 页面的性能优化手段, 像雅虎性能十四条这样的业界金规玉律, 但是对于其中为什么这样做以及什么时候这样
做脑海始终有点模糊, 所以写篇博文来让自己理解性能方面的知识.
为什么要监测性能因为在开发中, 性能是非常重要的部分, 我们在开发中可以不需要理会太多的性能问题, 正如那句老话: “不要过早地考
虑性能问题”, 但是在生产环境, 面对成百上千的 pv 量, 如何提高用户体验如何加快页面内容加载速度对于一个产品来
说非常重要, 一句话说: 性能既是金钱.
当然, 我们也已经有了很多工具来测试页面的性能, 个人比较常用的是 webpagetest, yslow 等等这些, 但是这些工具
测量的指标都比较单一而且测试环境比较单一, 如果我们需要比较详细的性能测量报告就无法做到了, 因为用户所用的
网络环境实在是非常复杂. 所以我们会建立性能监测系统通过上报的数据分析出页面的真实整体性能是如何的.确定测量目标在开始测量之前, 我们需要知道, 我们要测量什么时间, 不然根本无法下手.性能指标白屏时间首屏时间用户可操作时间资源总下载时间DNS 解析时间TCP 链接时间HTTP 请求时间HTTP 响应时间CSS 渲染时间Javascript 执行时间以上这些指标对于我们性能优化都非常有用.我们需要关注这些指标.测量工具准备W3C 性能小组提供了三个 API 供我们获取页面的详细性能信息.Navigation Timing APIperformance.timing 返回的是一个对象, 包含了页面加载的所有信息.
[![img](http://ofsur12wi.bkt.clouddn.com/timgingfull.png)](http://ofsur12wi.bkt.clouddn.com/timgingfull.png)
这里不再细讲每个字段的值的含义, 下面添加一个个人画的图帮助大家理解.[![img](http://ofsur12wi.bkt.clouddn.com/459304073.jpg)](http://ofsur12wi.bkt.clouddn.com/459304073.jpg)Resource Timing APIperformance.getEntries() 返回的是数组, 每一个元素就是一个对象, 包含了每一个请求的静态资源的加载信息.
注意这里返回来的数组对象存储的 Performance Resource 对象不仅仅是图片, css, script 这种静态资源, 还包括了像
XMLHttpRequest 对象这种.根据请求资源的原因, Reource timing 也会根据不同的原因进行记录:如果有两个相同 url img 图片标签, 那么浏览器只会请求一次, 然后将记录记录到一个 resource object 中.如果 img src 属性被 script 改变, 那么 img 前后两个请求都会被记录到 resource object 中.当然如果 src 属性是 base64 格式的值, 则不会被记录到 resource object 中.如果一个资源请求因为网络中断或者另外诸如 DNS 查询失败, TCP 握手失败, TLS 握手失败, 那么请求时间也会被记录到 resourcce object 中, 只是时间值会被记录成之前步骤所用时间, 例如 TCP 握手失败会记录 DNS 查询时间如果一个资源因为资源位置丢失或者跨域失败那么将不会被记录到 resource timging 中.下面是自己画得一个图:(PS:字比较丑不要见怪),建议大家可以也画一下,可能会帮助理解.
[![img](http://ofsur12wi.bkt.clouddn.com/1129102037.jpg)](http://ofsur12wi.bkt.clouddn.com/1129102037.jpg)Performance API也即是 window.performance 接口, 提供精细的接口供我们知道网页加载的详细信息.
[![img](http://ofsur12wi.bkt.clouddn.com/window.performanceFull.png)](http://ofsur12wi.bkt.clouddn.com/window.performanceFull.png)**memory** : 用于监测网页使用的内存情况, 如果 *usedJSHeapSize* 大于 *totalJSHeapSize*就会可能存在内存泄漏.**navigation**: 保存了网页文档加载的类型, TYPE_RELOAD, TYPE_BACK_FORWARD, TYPE_NAVIGATE 这些文档加载类型, redirectionCount 只能记录同源重定向的次数.**timing**: 记录了页面加载各个步骤的详细时间.之前在面试的时候也有做过类似的一道题,就是计算打开一个页面的时间, 计算时间就可以使用上面这三个 API 进行计算计算指标其中有两个可以帮助我们检测真实用户环境下的页面加载 Timing 和页面资源加载 Timing : Navigation Timing 和 Resource Timing。
这两个API非常有用，可以帮助我们获取页面的Domready时间、onload时间、白屏时间等，以及单个页面资源在从发送请求到获取到rsponse各阶段的性能参数。[![img](http://ofsur12wi.bkt.clouddn.com/performanceInfo.png)](http://ofsur12wi.bkt.clouddn.com/performanceInfo.png)
按照文档上面所说的, 在 window 对象构建出来之前, 该 Navigation timing 与 Resource timing 都不可用.因此,
使用这两个API时需要在页面完全加载完成之后才能使用，最简单的办法是在window.onload事件中读取各种数据，因为很多值必须在页面完全加载之后才能得出。Navigation TimingNavigation Timing API 能够帮助网站开发者检测真实用户数据（RUM），例如带宽、延迟或主页的整体页面加载时间。用法如下：
`var timinhObj = performance.timing;`一般来说，我们需要获取到的页面性能参数包括：DNS查询耗时、TCP链接耗时、request请求耗时、解析dom树耗时、白屏时间、domready时间、onload时间等，而这些参数是通过上面的 performance.timing 各个属性的差值组成的.
`DNS 查询时间: domainlookupEnd - domainlookupstartTCP 链接时间: connectEnd - connectStart请求时间: requestEnd - requestStart响应时间: responseEnd - responseStartDOM 解析时间: domloadedEventEnd - navigationStart白屏时间: responseStart - navigationStart首屏时间: loadEventEnd - navigationStart`Resource Timing API如果要获取个别资源（例如JS、图片）的性能指标，就需要使用 Resource Timing.浏览器获取网页时，会对网页中每一个静态资源（脚本文件、样式表、图片文件等等）发出一个HTTP请求。 Resource Timing 可以获取到单个静态资源从开始发出请求到获取响应之间各个阶段的Timing。用法如下:
`var resourcesObj = performance.getEntries();`[![img](http://ofsur12wi.bkt.clouddn.com/reource.png)](http://ofsur12wi.bkt.clouddn.com/reource.png)附录什么是直出直出也就是数据直出, 为什么会有这个概念呢? 其实还是为了优化页面性能, 前后端分离带来了开发便利与效率,但是
也带来了一些性能问题, 前后端分离在首屏的时候, 首屏需要的数据仍然需要 ajax 去获取, 这时候需要 TCP 链接等等
的延迟,所以对于网络不好的用户等待的时间比较长, 所以有了使用 node 作为中间层作为数据直出加快页面渲染.



## 白屏时间

白屏时间指的是浏览器开始显示内容的时间。因此我们只需要知道是浏览器开始显示内容的时间点，即页面白屏结束时间点即可获取到页面的白屏时间。

![img](http://images2017.cnblogs.com/blog/978149/201708/978149-20170817153956537-520597283.png)

## 计算白屏时间

因此，我们通常认为浏览器开始渲染 `<body>` 标签或者解析完 `<head>` 标签的时刻就是页面白屏结束的时间点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>白屏</title>
  <script type="text/javascript">
    // 不兼容performance.timing 的浏览器，如IE8
    window.pageStartTime = Date.now();
  </script>
  <!-- 页面 CSS 资源 -->
  <link rel="stylesheet" href="common.css">
  <link rel="stylesheet" href="page.css">
  <script type="text/javascript">
    // 白屏时间结束点
    window.firstPaint = Date.now();
  </script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

因此白屏时间则可以这样计算出：

### 可使用 Performance API 时

`白屏时间 = firstPaint - performance.timing.navigationStart;`

### 不可使用 Performance API 时

`白屏时间 = firstPaint - pageStartTime;`

## 首屏时间

首屏时间是指用户打开网站开始，到浏览器首屏内容渲染完成的时间。对于用户体验来说，首屏时间是用户对一个网站的重要体验因素。通常一个网站，如果首屏时间在5秒以内是比较优秀的，10秒以内是可以接受的，10秒以上就不可容忍了。超过10秒的首屏时间用户会选择刷新页面或立刻离开。

通常计算首屏的方法有

- 首屏模块标签标记法
- 统计首屏内加载最慢的图片的时间
- 自定义首屏内容计算法

### 1、首屏模块标签标记法

首屏模块标签标记法，通常适用于首屏内容不需要通过拉取数据才能生存以及页面不考虑图片等资源加载的情况。我们会在 HTML 文档中对应首屏内容的标签结束位置，使用内联的 JavaScript 代码记录当前时间戳。如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>首屏</title>
  <script type="text/javascript">
    window.pageStartTime = Date.now();
  </script>
  <link rel="stylesheet" href="common.css">
  <link rel="stylesheet" href="page.css">
</head>
<body>
  <!-- 首屏可见模块1 -->
  <div class="module-1"></div>
  <!-- 首屏可见模块2 -->
  <div class="module-2"></div>
  <script type="text/javascript">
    window.firstScreen = Date.now();
  </script>
  <!-- 首屏不可见模块3 -->
  <div class="module-3"></div>
    <!-- 首屏不可见模块4 -->
  <div class="module-4"></div>
</body>
</html>
```



此时首屏时间等于 `firstScreen - performance.timing.navigationStart;`

事实上首屏模块标签标记法 在业务中的情况比较少，大多数页面都需要通过接口拉取数据才能完整展示，因此我们会使用 JavaScript 脚本来判断首屏页面内容加载情况。

### 2、统计首屏内图片完成加载的时间

通常我们首屏内容加载最慢的就是图片资源，因此我们会把首屏内加载最慢的图片的时间当做首屏的时间。

由于浏览器对每个页面的 TCP 连接数有限制，使得并不是所有图片都能立刻开始下载和显示。因此我们在 DOM树 构建完成后将会去遍历首屏内的所有图片标签，并且监听所有图片标签 onload 事件，最终遍历图片标签的加载时间的最大值，并用这个最大值减去 `navigationStart` 即可获得近似的首屏时间。

此时首屏时间等于 `加载最慢的图片的时间点 - performance.timing.navigationStart;`

### 3、自定义模块内容计算法

由于统计首屏内图片完成加载的时间比较复杂。因此我们在业务中通常会通过自定义模块内容，来简化计算首屏时间。如下面的做法：

- 忽略图片等资源加载情况，只考虑页面主要 DOM
- 只考虑首屏的主要模块，而不是严格意义首屏线以上的所有内容






部分来源 

https://zhangxiang958.github.io/2017/05/20/%E7%BB%86%E8%AF%B4%20window.performance/


