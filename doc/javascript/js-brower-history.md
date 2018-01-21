# 主流浏览器内核介绍（前端开发值得了解的浏览器内核历史）



最近 “个人恶趣味” 持续发酵，突然想了解下浏览器内核的发展历史。

# 内核

------

首先得搞懂浏览器内核究竟指的是什么。

浏览器内核又可以分成两部分：渲染引擎(layout engineer 或者 Rendering Engine)和 JS 引擎。它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。JS 引擎则是解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，**内核就倾向于只指渲染引擎**。有一个网页标准计划小组制作了一个 ACID 来测试引擎的兼容性和性能。内核的种类很多，如加上没什么人使用的非商业的免费内核，可能会有 10 多种，但是常见的浏览器内核可以分这四种：Trident、Gecko、Blink、Webkit。

# Trident ([‘traɪd(ə)nt])

------

Trident(IE内核)：该内核程序在 1997 年的 IE4 中首次被采用，是微软在 Mosaic（”马赛克”，这是人类历史上第一个浏览器，从此网页可以在图形界面的窗口浏览） 代码的基础之上修改而来的，并沿用到 IE11，也被普遍称作 “IE内核”。

Trident实际上是一款开放的内核，其接口内核设计的相当成熟，因此才有许多采用 IE 内核而非 IE 的浏览器(壳浏览器)涌现。由于 IE 本身的 “垄断性”（虽然名义上 IE 并非垄断，但实际上，特别是从 Windows 95 年代一直到 XP 初期，就市场占有率来说 IE 的确借助 Windows 的东风处于 “垄断” 的地位）而使得 Trident 内核的长期一家独大，微软很长时间都并没有更新 Trident 内核，这导致了两个后果——一是 Trident 内核曾经几乎与 W3C 标准脱节（2005年），二是 Trident 内核的大量 Bug 等安全性问题没有得到及时解决，然后加上一些致力于开源的开发者和一些学者们公开自己认为 IE 浏览器不安全的观点，也有很多用户转向了其他浏览器，Firefox 和 Opera 就是这个时候兴起的。非 Trident 内核浏览器的市场占有率大幅提高也致使许多网页开发人员开始注意网页标准和非 IE浏览器的浏览效果问题。

补充：IE 从版本 11 开始，初步支持 WebGL 技术。IE8 的 JavaScript 引擎是 Jscript，IE9 开始用 Chakra，这两个版本区别很大，Chakra 无论是速度和标准化方面都很出色。

国内很多的双核浏览器的其中一核便是 Trident，美其名曰 “兼容模式”。

Window10 发布后，IE 将其内置浏览器命名为 Edge，Edge 最显著的特点就是新内核 EdgeHTML。关于 Edge 浏览器更多可以参考 [如何评价 Microsoft Edge 浏览器？](https://www.zhihu.com/question/29985708)

# Gecko ([‘gekəʊ])

------

Gecko(Firefox 内核)：Netscape6 开始采用的内核，后来的 Mozilla FireFox(火狐浏览器) 也采用了该内核，Gecko 的特点是代码完全公开，因此，其可开发程度很高，全世界的程序员都可以为其编写代码，增加功能。因为这是个开源内核，因此受到许多人的青睐，Gecko 内核的浏览器也很多，这也是 Gecko 内核虽然年轻但市场占有率能够迅速提高的重要原因。

事实上，Gecko 引擎的由来跟 IE 不无关系，前面说过 IE 没有使用 W3C 的标准，这导致了微软内部一些开发人员的不满；他们与当时已经停止更新了的 Netscape 的一些员工一起创办了 Mozilla，以当时的 Mosaic 内核为基础重新编写内核，于是开发出了 Gecko。不过事实上，Gecko 内核的浏览器仍然还是 Firefox (火狐) 用户最多，所以有时也会被称为 Firefox 内核。此外 Gecko 也是一个跨平台内核，可以在Windows、 BSD、Linux 和 Mac OS X 中使用。

# Webkit

------

一提到 webkit，首先想到的便是 chrome，可以说，chrome 将 Webkit内核 深入人心，殊不知，Webkit 的鼻祖其实是 Safari。现在很多人错误地把 webkit 叫做 chrome内核（即使 chrome内核已经是 blink 了），苹果都哭瞎了有木有。

Safari 是苹果公司开发的浏览器，使用了KDE（Linux桌面系统）的 KHTML 作为浏览器的内核，Safari 所用浏览器内核的名称是大名鼎鼎的 WebKit。 Safari 在 2003 年 1 月 7 日首度发行测试版，并成为 Mac OS X v10.3 与之后版本的默认浏览器，也成为苹果其它系列产品的指定浏览器（也已支持 Windows 平台）。

如上述可知，WebKit 前身是 KDE 小组的 KHTML 引擎，可以说 WebKit 是 KHTML 的一个开源的分支。当年苹果在比较了 Gecko 和 KHTML 后，选择了后者来做引擎开发，是因为 KHTML 拥有清晰的源码结构和极快的渲染速度。

Webkit内核 可以说是以硬件盈利为主的苹果公司给软件行业的最大贡献之一。随后，2008 年谷歌公司发布 chrome 浏览器，采用的 chromium 内核便 fork 了 Webkit。

# Chromium/Blink

------

2008 年，谷歌公司发布了 chrome 浏览器，浏览器使用的内核被命名为 chromium。

chromium fork 自开源引擎 webkit，却把 WebKit 的代码梳理得可读性提高很多，所以以前可能需要一天进行编译的代码，现在只要两个小时就能搞定。因此 Chromium 引擎和其它基于 WebKit 的引擎所渲染页面的效果也是有出入的。所以有些地方会把 chromium 引擎和 webkit 区分开来单独介绍，而有的文章把 chromium 归入 webkit 引擎中，都是有一定道理的。

谷歌公司还研发了自己的 Javascript 引擎，V8，极大地提高了 Javascript 的运算速度。

chromium 问世后，带动了国产浏览器行业的发展。一些基于 chromium 的单核，双核浏览器如雨后春笋般拔地而起，例如 搜狗、360、QQ浏览器等等，无一不是套着不同的外壳用着相同的内核。

然而 2013 年 4 月 3 日，谷歌在 Chromium Blog 上发表 [博客](http://blog.chromium.org/2013/04/blink-rendering-engine-for-chromium.html)，称将与苹果的开源浏览器核心 Webkit 分道扬镳，在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。

webkit 用的好好的，为何要投入到一个新的内核中去呢？

Blink 其实是 WebKit 的分支，如同 WebKit 是 KHTML 的分支。Google 的 Chromium 项目此前一直使用 WebKit(WebCore) 作为渲染引擎，但出于某种原因，并没有将其多进程架构移植入Webkit。

后来，由于苹果推出的 WebKit2 与 Chromium 的沙箱设计存在冲突，所以 Chromium 一直停留在 WebKit，并使用移植的方式来实现和主线 WebKit2 的对接。这增加了 Chromium 的复杂性，且在一定程度上影响了 Chromium 的架构移植工作。

基于以上原因，Google 决定从 WebKit 衍生出自己的 Blink 引擎（后由 Google 和 Opera Software 共同研发），将在 WebKit 代码的基础上研发更加快速和简约的渲染引擎，并逐步脱离 WebKit 的影响，创造一个完全独立的 Blink 引擎。这样以来，唯一一条维系 Google 和苹果之间技术关系的纽带就这样被切断了。

Google 和苹果在多个领域都是竞争对手，而唯独在浏览器引擎上有技术合作，利益一致。但为了各自的利益，谁都不会拿出 100% 的 “诚意” 来做好 WebKit，因为你做出来的成果竞争对手可以直接享用。移动互联网已经崛起，手机和平板设备端必将成为浏览器的另一个战场。这个时候，如果 Google 跟苹果仍然黏在一起，将会严重阻碍双方的进步，也会阻碍 WebKit 的进步。

据说 Blink 删除了 880w 行 webkit 代码。

至于为什么叫 blink？有兴趣的可以看下这篇访谈 [Paul Irish on Chrome Moving to Blink](http://alistapart.com/blog/post/paul-irish-on-chrome-moving-to-blink)，里面说

| 1    | it fits that Blink will never support the infamous <blink> tag. |
| ---- | ---------------------------------------- |
|      |                                          |

Blink 引擎问世后，国产各种 chrome 系的浏览器也纷纷投入 Blink 的怀抱，可以在浏览器地址栏输入 `chrome://version` 进行查看。比如在 360 下：

![img](http://ww3.sinaimg.cn/mw690/0064cTs2jw1ezusglpsrcj30gv03vdfq.jpg)

# Presto ([‘prestəʊ])

------

Presto 是挪威产浏览器 opera 的 “前任” 内核，为何说是 “前任”，因为最新的 opera 浏览器早已将之抛弃从而投入到了谷歌大本营。

Opera 的一个里程碑作品是 Opera7.0，因为它使用了 Opera Software **自主开发**的 Presto 渲染引擎，取代了旧版 Opera 4 至 6 版本使用的 Elektra 排版引擎。该款引擎的特点就是渲染速度的优化达到了极致，然而代价是牺牲了网页的兼容性。

Presto 加入了动态功能，例如网页或其部分可随着 DOM 及 Script 语法的事件而重新排版。Presto 在推出后不断有更新版本推出，使不少错误得以修正，以及阅读 Javascript 效能得以最佳化，并成为当时速度最快的引擎。

然而为了减少研发成本，Opera 在 2013 年 2 月宣布放弃 Presto，转而跟随 Chrome 使用 WebKit 分支的 Chromium 引擎作为自家浏览器核心引擎，Presto 内核的 Opera 浏览器版本永远的停留在了 12.17。在 Chrome 于 2013 年推出 Blink 引擎之后，Opera 也紧跟其脚步表示将转而使用 Blink 作为浏览器核心引擎。

Presto 与开源的 WebKit 和经过谷歌加持的 Chromium 系列相比毫无推广上的优势，这是 Opera 转投 WebKit 的主要原因，并且使用 WebKit 内核的 Opera 浏览器可以兼容谷歌 Chrome 浏览器海量的插件资源。但是换内核的代价对于 Opera 来说过于惨痛。使用谷歌的 WebKit 内核之后，原本快速，轻量化，稳定的 Opera 浏览器变得异常的卡顿，而且表现不稳定，Opera 原本旧内核浏览器书签同步到新内核上的工作 Opera 花了整整两年时间，期间很多 Opera 的用户纷纷转投谷歌浏览器和其他浏览器，造成了众多的用户流失。时至今日现在还有上千万人在使用老版本的 Opera。

很多人都认为 Opera 浏览器终止在了 12.17，此后所更新的 Opera 版本号不再是原来那个 Opera。

说好的 Presto Forever 呢？

# 关于移动端

------

移动端的浏览器内核主要说的是系统内置浏览器的内核。

目前移动设备浏览器上常用的内核有 Webkit，Blink，Trident，Gecko 等，其中 iPhone 和 iPad 等苹果 iOS 平台主要是 WebKit，Android 4.4 之前的 Android 系统浏览器内核是 WebKit，Android4.4 系统浏览器切换到了Chromium，内核是 Webkit 的分支 Blink，Windows Phone 8 系统浏览器内核是 Trident。

# 总结

------

浏览器内核主要指的是浏览器的渲染引擎，2013 年以前，代表有 Trident（IE），Gecko（firefox），Webkit（Safari chrome 等）以及 Presto（opera)。2013 年，谷歌开始研发 blink 引擎，chrome 28 以后开始使用，而 opera 则放弃了自主研发的 Presto 引擎，投入谷歌怀抱，和谷歌一起研发 blink 引擎，国内各种 chrome系的浏览器（360、UC、QQ、2345 等等）也纷纷放弃 webkit，投入 blink 的怀抱。

还有一点文章里没有说的很明白，就是 Webkit 其实是 KHTML 的分支，这里的 KHTML 指渲染引擎，Webkit 其实就泛指了 Webkit 的渲染引擎 WebCore，而 Webkit 引擎的 Javascript 引擎 JSCore 则是 KJS 的分支。而 chrome 则搭载了自己的 Javascript 引擎 V8。引用 [各主流浏览器内核介绍](http://www.cnblogs.com/vajoy/p/3735553.html) 里的一段话：

> 我们上面提到 Chrome 是基于 WebKit 的分支，而 WebKit 又由渲染引擎 “WebCore” 和 JS 解释引擎 “JSCore” 组成，可能会让你搞不清 V8 和 JSCore 的关系。你可以这样理解—— WebKit 是一块主板，JSCore 是一块可拆卸的内存条，谷歌实际上认为 Webkit 中的 JSCore 不够好，才自己搞了一个 V8 JS 引擎，这就是 Chrome 比 Safari 在某些 JS 测试中效率更高的原因。

如果说 chromium 还不足以脱离 Webkit 的 “帽子”，Blink 的出现，代表着 chrome 将自主研发渲染引擎（Blink）以及 Javascript 引擎（V8）。可以期待在不久的将来，人们谈起 chrome 想到的不是 Webkit 而是 Blink。