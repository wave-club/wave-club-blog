## IE-OLD IE 提示



####[IE-OLD](https://github.com/976500133/IE-OLD)  网站开发必备，收藏好

在开发网站的过程中，不管是优雅降级和渐进增强，总有1款IE 不适合你，然而为了更好的用户体验，你肯定需要一款面对我不兼容浏览器脚本的提示，已提交网站的健硕和友好的交互，由此你应该用的到[IE-OLD](https://github.com/976500133/IE-OLD)

这是通用的一个在低版本浏览器上以全屏形式友好提示用户
更换浏览器的小脚本，展示效果如下：

####IE-OLD效果图


![IE-FBI-WARNing.png](http://upload-images.jianshu.io/upload_images/1899643-12e8df2d8c6232de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![react use.png](http://upload-images.jianshu.io/upload_images/1899643-bc3fe2d4caed6746.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####优点

1.使用方便，只需加几行 IE-only 的条件注释代码，对现代浏览器不会产生任何影响
2.大小：整站才45Kb(包含图片，第1种方式无需再任何浏览器加载)
3.醒目，目前多数的网站做法只是在顶部很窄的位置提示一句话，达不到鼓励用户更换浏览器的目的。而本身是否完全放弃 IE 也是网站自己的选择。此脚本明显地告知用户，之后遇到样式和功能不正常是因为你已经落伍了。


#### Install 安装

```
$ npm install --save ieold
```

####使用方式用3种

第一种使用方式(推荐)


####Method 1
```javascript
<!--[if lt IE 10]>
<script> 
// 如果推荐语使用默认值，可以删除此 script 标签
</script>

<script type="text/javascript" src="index.src.js"></script>

<![endif]-->
```

#### Method 2 
不推荐，只有支持react, 才能使用此方法
```js
//=> react
//需要被正确识别

import ieold from 'ieold'
// @param version
// version <=  (6-11)
//
ieold(9)

```


####Method 3


```js
//=> common
//
const ieold = require('ieold');
ieold(9)

```



由于 IE 10 不支持条件注释了，如果要对 IE10 也显示，则需要在条件注释后面再添加：

```javascript
<script>
if (navigator.userAgent.match(/Trident\/6/)) {
    document.write('<script src="index.src.js"><'+'/script>');
}
</script>
```

####浏览器选择


####不推荐某些热门浏览器的原因

* 其他浏览器本身就是个流氓，各种插件



####授权
作者 MIT 协议开源