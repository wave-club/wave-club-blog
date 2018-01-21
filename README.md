# PrototypeExtend 原型扩展


### 项目目录结构
-----------------

|--Date.js （时间处理方法）<br />
|&emsp;&emsp;|-------  Date.prototype.format  <br />
|&emsp;&emsp;|-------  Number.prototype.toDateFormat  <br />
|&emsp;&emsp;|-------  Number.prototype.toDistanceNow  <br />





### 使用展示

##### Date.prototype.format

    /**
     * @class Date 时间格式转换
     * @descrption
     * **使用方式 new Date().format('yyyy-MM-dd  HH:mm:ss w')
     * **返回值 "2018-01-06  13:51:36 星期六"
     **/


##### Number.prototype.toDateFormat

    /**
    * @class Number 时间戳格式转换
    * @descrption  依赖于 Date.prototype.format
    * **使用方式 Number(1514764800).toDateFormat('yyyy-MM-dd HH:mm:ss w')
    * **返回值 "2018-01-01 08:00:00 星期一"
     **/

##### Number.prototype.toDistanceNow

    /**
     * @class Number
     * @descrption 时间戳格式转换成距离现在多久 几 "年","天","小时","分钟","秒钟" 前
     * **使用方式  Number(1514764800).toDistanceNow()
     * **返回值  "5天前"
     **/
     
     
     
#面试题
[专题系列](zt.md)
         - [如何实现一个 Git Diff 解析器](./Front-end interview/zt/zt-diff.md)
         - [react-redux 之 connect 方法详解](./zt/js-redux.md)
         - [细说 webpack 之流程篇](./zt/zt-webpack.md)
         - [JavaScript 中的错误隔离](./zt/js-error.md)
         - [学习ES2015](./zt/js-er2015.md)
         - [webpack 常见问题](./zt/zt-webpack-qa.md)
         - [webpack打包原理解析](./zt/zt-webpack-origin.md)
         - [WangEditor点击按钮直接弹出选择文件窗口，不显示下拉框的插件开发](./zt/js-wangeditor.md)
         - [webpack 代码分离](./zt/webpack-code-spliting.md)
         - [前端面试必备——十大经典排序算法](./zt/js-suanfa.md)
     * [HTTP系列](README-JAVASCRIPT.md)
         - [99%的人理解错 HTTP 中 GET 与 POST 的区别](./http/http-post-get.md)
         - [HTTP 深入详解](./http/HTTP-analysis.md)
         - [HTTP AJAX 介绍](./http/http-ajax.md)
         - [Ajax 解决浏览器缓存问题](./http/http-ajax-delete-cache.md)
         - [性能优化之路——性能指标体系](./http/http-meituan.md)
         - [一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么](./http/http-render.md)
         - [监控平台前端SDK开发实践](./http/http-watch.md)
         - [首屏、白屏时间如何计算](./http/http-white.md)
         - [Http POST 提交数据的四种方式解析](./http/http-post-urlcode.md)
         - [html全局属性有哪些](./http/html-global.md)
         - [前端性能毫秒必争方案(-) HTTP请求](./http/http-http.md)
         - [前端性能毫秒必争方案(二) HTTP缓存](./http/http-cache.md)
         - [前端性能毫秒必争综合方案](./http/http-01.md)
         - [HTTP METHOD 介绍](./http/http-method.md)
         - [http状态码有那些？分别代表是什么意思](./http/http-status.md)
     * [HTML系列](README-JAVASCRIPT.md)
         - [DOCTYPE的作用](./html/DOCTYPE.md)
         - [浏览器渲染原理](./html/html-reflow-repaint.md)
         - [前端SEO](./html/seo.md)
         - [web开发中会话跟踪的方法](./html/web-talk.md)
     * [CSS系列](README-JAVASCRIPT.md)
         - [行内块级元素有哪些](./css/block-inline.md)
         - [居中div有哪些方式](./css/css-center.md)
         - [层叠顺序（stacking level）与堆栈上下文（stacking context）知多少？](./css/css-zindex.md)
         - [巧妙地制作背景色渐变动画](./css/css-animation-background.md)
         - [块级格式化上下文bfc](./css/css-bfc.md)
         - [纯CSS绘制三角形](./css/css-triangle.md)
         - [css定义的权重](./css/css-qz.md)
         - [position的值relative和absolute定位原点是](./css/css-position-relative.md)
         - [css 清除浮动](./css/css-clear-float.md)
         - [如何清理浮动（2）](./css/css-clear.md)
         - [CSS 继承](./css/css-extend.md)
         - [CSS3有哪些新特性](./css/css-new.md)
         - [css单位有哪些](./css/css-pixel.md)
         - [css选择符](./css/css-selected.md)
         - [link和import的区别](./css/link-import.md)
         - [Sass Less SCSS 的抉择](./css/sass-less-scss.md)
         - [单行居中显示文字，多行居左显示，最多两行超过用省略号结尾](./css/css-text-overflow.md)
     * [JAVASCRIPT系列](README-JAVASCRIPT.md)
         - [主流浏览器内核介绍和历史](./javascript/js-brower-history.md)
         - [浏览器内核和JavaScript单线程](./javascript/js-webkit.md)
         - [浏览器进程？线程？傻傻分不清楚！](./javascript/js-webkit-thred.md)
         - [js箭头函数](./javascript/js-arr-func.md)
         - [Object.assign 详细使用](./javascript/js-assign.md)
         - [容易混淆的DOM元素尺寸client-*、scroll-*、 offset-*](./javascript/js-offset-clinet-scroll.md)
         - [通过简单的懒加载了解节流和去抖](./javascript/js-throttle.md)
         - [arguments 详解](./javascript/js-arguments.md)
         - [DOM事件类](./javascript/js-dom.md)
         - [js箭头函数](./javascript/js-arr-func.md)
         - [javascripts 浅拷贝和深拷贝](./javascript/js-copy.md)
         - [一个通用的事件侦听器函数](./javascript/js-addevent.md)
         - [什么是闭包（closure）](./javascript/js-clourse.md)
         - [js数组详解](./javascript/js-array.md)
         - [js字符串详解](./javascript/js-string.md)
         - [浅谈javascript的函数节流](./javascript/js-function.md)
         - [图片懒加载](./javascript/js-img-load.md)
         - [什么是Cookie 隔离](./javascript/js-cookie.md)
         - [js对象的深度克隆](./javascript/js-deepcopy.md)
         - [一个contextmenu的插件](./javascript/js-contextmenu.md)
         - [js数组去重](./javascript/js-duplicate.md)
         - [XSS 和 CSRF 两种跨站攻击](./javascript/js-xss-csrf.md)
         - [web端cookie的设置和获取方法](./javascript/js-cookie-getset.md)
         - [面试问题](./javascript/js-interview.md)
         - [如何实现数组的随机排序](./javascript/js-sort-random.md)
         - [["1", "2", "3"].map(parseInt) 答案是多少？](./javascript/js-parseint-map.md)
         - [如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』](./javascript/js-dot.md)
         - [clientX,offsetX,screenX,pageX](./javascript/clientX-offsetX-screenX-pageX.md)
         - [defer 与 async](./javascript/defer-async.md)
         - [ES6 的 Promise实践](./javascript/es6-promise.md)
         - [Highcharts 江湖就这样](./javascript/highcharts-introduce.md)
         - [HTML5无刷新改变当前url](./javascript/html5-history.md)
         - [HTML5 video 详解](./javascript/html5-video.md)
         - [IE-OLD IE 提示](./javascript/ie-old.md)
         - [Js 连线支持随意拖](./javascript/js-canvas-drag.md)
         - [Js 跨域之李代桃僵](./javascript/js-crossorigin.md)
         - [Js 保证产品质量](./javascript/js-error.md)
         - [Markdown的江湖之自定义 （扩展）](./javascript/markdown-extend.md)
         - [通用正则200](./javascript/regexp-common.md)
         - [typeof 的用法](./javascript/typeof.md)
         - [undefined与null的区别](./javascript/undefined-null.md)
         - [var、let、const 区别](./javascript/var-let-const.md)
         - [webServer SSO 原理及实现](./javascript/web-sso.md)
         - [Yun.js 常用封装](./javascript/Yun.js.md)
     * [REACT系列](README-JAVASCRIPT.md)
         - [前端路由实现与 react-router 源码分析](./react/js-react-router.md)
         - [如何选择Redux的store和React的state](./react/react-redux-state.md)
         - [React 综合事件 SyntheticEvent](./react/React-SyntheticEvent.md)
         - [React 错误记录](./react/react-error-1.md)
         - [es6的class写法与es5的createClass都有哪些区别？](./react/react-class-createClass.md)
         - [react 扩展运算符](./react/react....md)
         - [react 虚拟DOM](./react/react-dom.md)
         - [react 生命周期](./react/react-life.md)
         - [react 中event 的处理方式](./react/react-event.md)
         - [函数组件 和 类组件的区别](./react/react-function-class.md)
         - [react key 的理解](./react/react-key.md)
         - [这段代码有什么问题](./react/react-question.md)
         - [React 中的ref 介绍， 为什么他们很重要](./react/react-ref.md)
         - [调用setState时会发生什么？](./react/react-setstate.md)
         - [setState 第二个参数](./react/react-setstate-args.md)
         - [在哪个生命周期事件中，你会做出AJAX请求，为什么？](./react/react-ajax.md)
         - [React.Children 和 this.props.children](./react/react-children.md)
         - [受控组件与不受控制的组件有什么区别](./react/react-controller.md)
         - [react 从使用 看定义](./react/react-define.md)
         - [什么是虚拟DOM？](./react/react-dom.md)
         - [Redux从设计到源码](./react/react-redux.md)
         - [React Elements vs React Components](./react/react-elements-components.md)
     * [WEB 移动端](README-mobile.md)
         - [viewport详解](./mobile/mb-viewport.md)
     * [PYTHON](README-mobile.md)
         - [列表、字典、集合中根据条件筛选数据](./python/python-1.md)
         - [为元组中的每个元素命名](./python/python-2.md)
         - [统计序列中元素的出现频度](./python/python-3.md)
         - [对字典中的项根据其值的大小进行排序](./python/python-4.md)
         - [为Mac 设置Python多版本开发环境](./python/pyenv-mac.md)
     * [NODEJS系列](README-JAVASCRIPT.md)
     * [SWIFT系列](README-JAVASCRIPT.md)
         - [iOS 微信 QQ 登陆 分享](./swift/swift-share.md)
         - [元芳，iOS 四大邪术之一，你怎么看？](./swift/swift-base-animation.md)
         - [IOS APP 侧边栏滑动](./swift/swift-app.md)
     * [SPRING-BOOT系列](README-SPRINT-BOOT.md)
         - [Spring MVC注解篇](./spring-boot/sp-jianshu.md)
     * [TOOLS系列](README-JAVASCRIPT.md)
         - [Nginx 经典美文](./tools/nginx.md)
         - [EsLint规则与配置](./tools/eslint-rules.md)
         - [mac osx下环境变量以及加载顺序](./tools/mac-path.md)
         - [Mac自带 SVN 命令简洁操作](./tools/mac-svn.md)
     * [数据库](README-JAVASCRIPT.md)
     