## HTML5之pushstate、popstate操作history，无刷新改变当前url

**TOC**

- [一、认识window.history]()

- - [1、历史记录的前进和后退]()
  - [2、移动到指定历史记录点]()

- [二、修改历史记录点]()

- - [1、存储当前历史记录点]()
  - [2、替换当前历史记录点]()
  - [3、监听历史记录点]()

#### 一、认识window.history

window.history表示window对象的历史记录，是由用户主动产生，并且接受javascript脚本控制的全局对象。window对象通过history对象提供对览器历史记录的访问能力。它暴露了一些非常有用的方法和属性，让你在历史记录中自由前进和后退。

#### 1.历史记录的前进和后退

在历史记录中后退，可以这么做：

```javascript
window.history.back();
```

这就像用户点击浏览器的后退按钮一样。

类似的，你可以前进，就像在浏览器中点击前进按钮，像这样：

```javascript
window.history.forward();
```

#### 移动到指定历史记录点

通过指定一个相对于当前页面位置的数值，你可以使用go()方法从当前会话的历史记录中加载页面（当前页面位置索引值为0，上一页就是-1，下一页为1）。

要后退一页（相当于调用back()）：

```javascript
window.history.go(-1);
```

向前移动一页（相当于调用forward()）：

```javascript
window.history.go(1);
```

类似的，传递参数“2”，你就可以向前移动2个记录点。你可以查看length属性值，了解历史记录栈中一共有多少个记录点：

```javascript
window.history.length;
```

#### 二、修改历史记录点

HTML5的新API扩展了window.history，使历史记录点更加开放了。可以存储当前历史记录点、替换当前历史记录点、监听历史记录点，下面逐一简要说明一下。

#### 1.存储当前历史记录点

存储的方式类似于数组的入栈（Array.push()），在window.history里新增一个历史记录点，例如：

```javascript
// 当前的url为：http://qianduanblog.com/index.html

var json={time:new Date().getTime()};

// @状态对象：记录历史记录点的额外对象，可以为空

// @页面标题：目前所有浏览器都不支持

// @可选的url：浏览器不会检查url是否存在，只改变url，url必须同域，不能跨域

window.history.pushState(json,"","http://qianduanblog.com/post-1.html");<

```

执行了pushState方法后，页面的url地址为http://qianduanblog.com/post-1.html。

#### 2.替换当前历史记录点

window.history.replaceState和window.history.pushState类似，不同之处在于replaceState不会在window.history里新增历史记录点，其效果类似于window.location.replace(url)，都是不会在历史记录点里新增一个记录点的。当你为了响应用户的某些操作，而要更新当前历史记录条目的状态对象或URL时，使用replaceState()方法会特别合适。

#### 3.监听历史记录点

监听历史记录点，直观的可认为是监听URL的变化，但会忽略URL的hash部分，监听URL的hash部分，HTML5有新的API为onhashchange，我的博客里也有说到该方法和跨浏览器的兼容解决方案。可以通过window.onpopstate来监听url的变化，并且可以获取存储在该历史记录点的状态对象，也就是上文说到的json对象，如：

```javascript
// 当前的url为：http://qianduanblog.com/post-1.html

window.onpopstate=function()

{

    // 获得存储在该历史记录点的json对象

    var json=window.history.state;

    // 点击一次回退到：http://qianduanblog.com/index.html

    // 获得的json为null

    // 再点击一次前进到：http://qianduanblog.com/post-1.html

    // 获得json为{time:1369647895656}

}

```



###### 值得注意的是：javascript脚本执行window.history.pushState和window.history.replaceState不会触发onpopstate事件。



还有一点注意的是，谷歌浏览器和火狐浏览器在页面第一次打开的反应是不同的，谷歌浏览器奇怪的是回触发onpopstate事件，而火狐浏览器则不会。