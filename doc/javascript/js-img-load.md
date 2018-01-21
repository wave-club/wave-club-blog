# 图片懒加载

在面试的时候有面试官问我，懒加载这个插件你有没有想到如何去**优化**？又间接问我**函数节流**的问题，嘿嘿，今天就更新下这个插件，顺便应用下函数节流（throttle），先直接上下代码，含解析



```
 1 /*
 2      * 函数功能：函数节流
 3      * fn  需要调用的函数
 4      * delay  函数需要延迟处理的时间
 5      * mustRunDelay  超过该时间，函数一定会执行
 6      * */
 7     var throttle = function (fn, delay, mustRunDelay) {
 8         var timer;  //使用闭包存储timer
 9         var t_start;
10         //闭包返回的函数
11         return function (val) {
12             var args = arguments, t_curr = +new Date();  //使用+new Date() 将字符串转换成数字
13             clearTimeout(timer);
14             if (!t_start) {  // 使用!t_start 如果t_start=undefined或者null 则为true
15                 t_start = t_curr;
16             }
17             if (t_curr - t_start >= mustRunDelay) {
18                 fn.apply(null, args);
19                 t_start = t_curr;
20             } else {
21                 timer = setTimeout(function () {
22                     fn.apply(null, args);
23                 }, delay);
24             }
25         }
26     };
27 
28  /*使用方法*/
29     var throttle1 = throttle(fn, 500, 4000);
30     //在该需要调用的函数内部调用此函数
31     throttle1(val); //此处传人的参数为以上fn需要传人的参数
```



至于函数节流具体的好处，常用的场景，以下文章说得非常清楚，我就不再说啦～

 

好文推荐：

<http://www.alloyteam.com/2012/11/javascript-throttle/#prettyPhoto>

<http://www.cnblogs.com/LuckyWinty/p/5949970.html>

 



 

 

很多网站都会用到‘图片懒加载’这种方式对网站进行优化，即延迟加载图片或符合某些条件才开始加载图片。于是心血来潮，决定自己手动写一下’图片懒加载‘插件。

 

- **使用这个技术有什么显著的优点？**

比如一个页面中有很多图片，如淘宝首页等等，一个页面有100多的图片，如果一上来就发送这么多请求，页面加载就会很漫长，如果js文件都放在了文档的底部，恰巧页面的头部又依赖这个js文件，那就不好办了。用户感觉这个页面就会很卡。

 

- 懒加载原理：**浏览器会自动对页面中的img标签的src属性发送请求并下载图片。通过动态改变img的src属性实现。**

当访问一个页面的时候，先把img元素或是其他元素的背景图片路径替换成loading图片地址（这样就只需请求一次）

等到一定条件（这里是页面滚动到一定区域），用实际存放img地址的laze-load属性的值去替换src属性，即可实现'懒加载'。

//即使img的src值为空，浏览器也会对服务器发送请求。所以平时做项目的时候，如果img没有用到src，就不要出现src这个属性 

 

- **先上三个重要的知识点**

**1.获取屏幕可视窗口大小：**

document.documentElement.clientHeight 标准浏览器及低版本IE标准模式

document.body.clientHeight 低版本混杂模式

**2.****元素相对于文档document顶部**

element.offsetTop

```

```

3.滚动条滚动的距离

document.documentElement.scrollTop   兼容ie低版本的标准模式 

document.body.scrollTop 兼容混杂模式；

 

滚动加载：当图片出现在可视区域时，动态加载该图片。

原理：当图片元素顶部是否在可视区域内，**（图片相对于文档document顶部-滚动条滚动的距离）< 可视窗口大小，改变该img的src属性**

 

实现原理：

1.首先从所有相关元素中找出需要延时加载的元素，放在element_obj数组中。



```
 1  function initElementMap() {
 2       var el = document.getElementsByTagName('img');
 3       for (var j = 0, len2 = el.length; j < len2; j++) {
 4   //判断当前的img是否加载过了，或者有lazy_src标志  [未完成]
 5           if (typeof (el[j].getAttribute("lazy_src"))) {
 6               element_obj.push(el[j]);
 7               download_count++;
 8           }
 9       }
10  }      
```

 

2.判断数组中的img对象，若满足条件，则改变src属性

 

```
 1 function lazy() {
 2     if (!download_count) return;
 3     var innerHeight = getViewport();
 4     for (var i = 0, len = element_obj.length; i < len; i++) {
 5 //得到图片相对document的距上距离
 6         var t_index = getElementViewTop(element_obj[i]);     
 7         if (t_index - getScrollTop() < innerHeight) {
 8             element_obj[i].src = element_obj[i].getAttribute("lazy-src");
 9             delete element_obj[i];
10             download_count--;
11         }
12     }
13 }                    
```

 

3.滚动的时候触发事件，1000毫秒后执行lazy（）方法。

```
1 window.onscroll = window.onload = function () {
2     setTimeout(function () {
3         lazy();
4     }, 1000)
5 }    
```

整部分代码位于闭包自执行函数中。相应的方法放在init中。

 

```
1 var lazyLoad = (function () {  
2     function init() {
3         initElementMap();
4         lazy();
5     };
6     return {
7         init: init    
8     }
9 })();    
```

 

　　

 使用格式 ：src填默认loading图片地址，真实的图片地址填在lazy-src属性里，切记需指定宽高。在外部调用  lazyLoad.init();







```js
/**
	 * @author beidan
	 * @description 图片懒加载
	 */
	;(function () {
	    /*
	     * 函数功能：函数节流
	     * fn  需要调用的函数
	     * delay  函数需要延迟处理的时间
	     * mustRunDelay  超过该时间，函数一定会执行
	     * */
	    var throttle = function (fn, delay, mustRunDelay) {
	        var timer;  //使用闭包存储timer
	        var t_start;
	        //闭包返回的函数
	        return function (val) {
	            var args = arguments, t_curr = +new Date();  //使用+new Date() 将字符串转换成数字
	            clearTimeout(timer);
	            if (!t_start) {  // 使用!t_start 如果t_start=undefined或者null 则为true
	                t_start = t_curr;
	            }
	            if (t_curr - t_start >= mustRunDelay) {
	                fn.apply(null, args);
	                t_start = t_curr;
	            } else {
	                timer = setTimeout(function () {
	                    fn.apply(null, args);
	                }, delay);
	            }
	        }
	    };


	    function LazyLoad() {
	    }


	    var download_count = 0,
	        ele_obj = [];


	    LazyLoad.prototype = {
	        //放一些初始化的方法
	        init: function () {
	            this.initElementMap();
	            this.lazy();
	            this.throttleLoad();
	        },
	        getPosition: {
	            /*
	             获取屏幕可视窗口大小
	             document.documentElement.clientHeight    IE/CH支持
	             document.body.client    低版本混杂模式
	             获取当前元素相对于窗口顶部的距离
	             element.offsetTop
	             滚动条滚动的距离
	             document.documentElement.scrollTop   兼容ie低版本的标准模式
	             document.body.scrollTop 兼容混杂模式；
	             */
	            Viewport: function () {
	                if (document.compatMode == "BackCompat") {
	                    //此时浏览器客户区宽度是document.body.clientWidth；
	                    var Height = document.body.clientHeight;
	                } else {
	                    //浏览器客户区宽度是document.documentElement.clientWidth。
	                    var Height = document.documentElement.clientHeight;
	                }
	                return Height;
	            },
	            ScrollTop: function () {
	                if (document.compatMode == "BackCompat") {
	                    var elementScrollTop = document.body.scrollTop;


	                } else {
	                    var elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;


	                }
	                return elementScrollTop;
	            },
	            ElementViewTop: function (ele) {
	                if (ele) {
	                    var actualTop = ele.offsetTop;
	                    var current = ele.offsetParent;
	                    while (current !== null) {
	                        actualTop += current.offsetTop;
	                        current = current.offsetParent;
	                    }
	                    return actualTop - this.ScrollTop();
	                }
	            }
	        },
	        //从所有相关元素中找出有lazy_src属性的元素
	        initElementMap: function () {
	            var el = document.getElementsByTagName('img');
	            for (var j = 0, len2 = el.length; j < len2; j++) {
	                //查找有lazy_src标签的img
	                if (typeof (el[j].getAttribute("lazy_src"))) {
	                    ele_obj.push(el[j]);
	                    download_count++;
	                }
	            }
	        },
	        //防止多次加载
	        lazy: function () {
	            if (!download_count) return;
	            var innerHeight = LazyLoad.prototype.getPosition.Viewport();
	            for (var i = 0, len = ele_obj.length; i < len; i++) {
	                var t_index = LazyLoad.prototype.getPosition.ElementViewTop(ele_obj[i]); //得到图片相对document的距上距离
	                if (t_index < innerHeight) {
	                    ele_obj[i].src = ele_obj[i].getAttribute("lazy-src");
	                    ele_obj[i].removeAttribute("lazy-src");
	                    delete ele_obj[i];
	                    download_count--;
	                }
	            }
	        },
	        /*使用函数节流优化性能*/
	        throttleLoad: function () {
	            var throttle1 = throttle(LazyLoad.prototype.lazy, 200, 500);
	            window.onscroll = window.onload = function () {
	                throttle1();
	            }
	        },
	    };
	    window.LazyLoad = LazyLoad;
	})()

```







