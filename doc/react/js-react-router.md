# 前端路由实现与 react-router 源码分析



在单页应用上，前端路由并不陌生。很多前端框架也会有独立开发或推荐配套使用的路由系统。那么，当我们在谈前端路由的时候，还可以谈些什么？本文将简要分析并实现一个的前端路由，并对 react-router 进行分析。

## 一个极简前端路由实现

说一下前端路由实现的简要原理，以 hash 形式（也可以使用 History API 来处理）为例，当 url 的 hash 发生变化时，触发 hashchange 注册的回调，回调中去进行不同的操作，进行不同的内容的展示。直接看代码或许更直观。

```js
function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function(){};
};
Router.prototype.refresh = function() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();
```

上面路由系统 Router 对象实现，主要提供三个方法

- init 监听浏览器 url hash 更新事件
- route 存储路由更新时的回调到回调数组routes中，回调函数将负责对页面的更新
- refresh 执行当前url对应的回调函数，更新页面

Router 调用方式以及呈现效果如下：点击触发 url 的 hash 改变，并对应地更新内容（这里为 body 背景色）

```js
<ul> 
    <li><a href="#/">turn white</a></li> 
    <li><a href="#/blue">turn blue</a></li> 
    <li><a href="#/green">turn green</a></li> 
</ul> 
```

```js
var content = document.querySelector('body');
// change Page anything
function changeBgColor(color) {
    content.style.backgroundColor = color;
}
Router.route('/', function() {
    changeBgColor('white');
});
Router.route('/blue', function() {
    changeBgColor('blue');
});
Router.route('/green', function() {
    changeBgColor('green');
});
```

[![20160513_150041](https://cloud.githubusercontent.com/assets/10385585/15266370/156436f6-19d5-11e6-8c90-c24f6d8cc24e.gif)](https://cloud.githubusercontent.com/assets/10385585/15266370/156436f6-19d5-11e6-8c90-c24f6d8cc24e.gif)
以上为一个前端路由的简单实现，[点击查看完整代码](https://github.com/joeyguo/blog/blob/master/lab/2016/router/simple-router.html)，虽然简单，但实际上很多路由系统的根基都立于此，其他路由系统主要是对自身使用的框架机制的进行配套及优化，如与 react 配套的 react-router。

## react-router 分析

### react-router 与 history 结合形式

react-router 是基于 history 模块提供的 api 进行开发的，结合的形式本文记为 **包装方式**。所以在开始对其分析之前，先举一个简单的例子来说明如何进行对象的包装。

```js
// 原对象
var historyModule = {
    listener: [],
    listen: function (listener) {
        this.listener.push(listener);
        console.log('historyModule listen..')
    },
    updateLocation: function(){
        this.listener.forEach(function(listener){
            listener('new localtion');
        })
    }
}
// Router 将使用 historyModule 对象，并对其包装
var Router = {
    source: {},
    init: function(source){
        this.source = source;
    },
    // 对 historyModule的listen进行了一层包装
    listen: function(listener) {
        return this.source.listen(function(location){
            console.log('Router listen tirgger.');
            listener(location);
        })
    }
}
// 将 historyModule 注入进 Router 中
Router.init(historyModule);
// Router 注册监听
Router.listen(function(location){
    console.log(location + '-> Router setState.');
})
// historyModule 触发回调
historyModule.updateLocation();
```

返回：
[![22](https://cloud.githubusercontent.com/assets/10385585/15266368/fd76c04a-19d4-11e6-9e9f-817f71eaab09.png)](https://cloud.githubusercontent.com/assets/10385585/15266368/fd76c04a-19d4-11e6-9e9f-817f71eaab09.png)

可看到 historyModule 中含有机制：historyModule.updateLocation() -> listener( )，Router 通过对其进行包装开发，针对 historyModule 的机制对 Router 也起到了作用，即historyModule.updateLocation() 将触发 Router.listen 中的回调函数 。[点击查看完整代码](https://github.com/joeyguo/blog/blob/master/lab/2016/router/package-style.html)
这种包装形式能够充分利用原对象（historyModule ）的内部机制，减少开发成本，也更好的分离包装函数（Router）的逻辑，减少对原对象的影响。

### react-router 使用方式

react-router 以 react component 的组件方式提供 API， 包含 Router，Route，Redirect，Link 等等，这样能够充分利用 react component 提供的生命周期特性，同时也让定义路由跟写 react component 达到统一，如下

```js
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)
```

就这样，声明了一份含有 path to component 的各个映射的路由表。
react-router 还提供的 Link 组件（如下），作为提供更新 url 的途径，触发 Link 后最终将通过如上面定义的路由表进行匹配，并拿到对应的 component 及 state 进行 render 渲染页面。

```js
<Link to={`/user/89757`}>'joey'</Link>
```

这里不细讲 react-router 的使用，详情可见：<https://github.com/reactjs/react-router>

## 从点击 Link 到 render 对应 component ，路由中发生了什么

### 为何能够触发 render component ？

主要是因为触发了 react setState 的方法从而能够触发 render component。
从顶层组件 Router 出发（下面代码从 react-router/Router 中摘取），可看到 Router 在 react component 生命周期之组件被挂载前 componentWillMount 中使用 this.history.listen 去注册了 url 更新的回调函数。回调函数将在 url 更新时触发，回调中的 setState 起到 render 了新的 component 的作用。

```js
Router.prototype.componentWillMount = function componentWillMount() {
    // .. 省略其他
    var createHistory = this.props.history;

    this.history = _useRoutes2['default'](createHistory)({
      routes: _RouteUtils.createRoutes(routes || children),
      parseQueryString: parseQueryString,
      stringifyQuery: stringifyQuery
    });

    this._unlisten = this.history.listen(function (error, state) {
        _this.setState(state, _this.props.onUpdate);
    });
  };
```

上面的 _useRoutes2 对 history 操作便是对其做一层包装，所以调用的 this.history 实际为包装以后的对象，该对象含有 _useRoutes2 中的 listen 方法，如下

```js
function listen(listener) {
      return history.listen(function (location) {
          // .. 省略其他
          match(location, function (error, redirectLocation, nextState) {
            listener(null, nextState);
          });
      });
}
```

可看到，上面代码中，主要分为两部分

1. 使用了 history 模块的 listen 注册了一个含有 setState 的回调函数（这样就能使用 history 模块中的机制）
2. 回调中的 match 方法为 react-router 所特有，match 函数根据当前 location 以及前面写的 Route 路由表匹配出对应的路由子集得到新的路由状态值 state，具体实现可见 react-router/matchRoutes ，再根据 state 得到对应的 component ，最终执行了 match 中的回调 listener(null, nextState) ，即执行了 Router 中的监听回调（setState），从而更新了展示。

以上，为起始注册的监听，及回调的作用。

### 如何触发监听的回调函数的执行？

这里还得从如何更新 url 说起。一般来说，url 更新主要有两种方式：简单的 hash 更新或使用 history api 进行地址更新。在 react-router 中，其提供了 Link 组件，该组件能在 render 中使用，最终会表现为 a 标签，并将 Link 中的各个参数组合放它的 href 属性中。可以从 react-router/ Link 中看到，对该组件的点击事件进行了阻止了浏览器的默认跳转行为，而改用 history 模块的 pushState 方法去触发 url 更新。

```js
Link.prototype.render = function render() {
    // .. 省略其他
    props.onClick = function (e) {
      return _this.handleClick(e);
    };
    if (history) {
     // .. 省略其他
      props.href = history.createHref(to, query);
    }
    return _react2['default'].createElement('a', props);
};

Link.prototype.handleClick = function handleClick(event) {
    // .. 省略其他
    event.preventDefault();
    this.context.history.pushState(this.props.state, this.props.to, this.props.query);
};
```

对 history 模块的 pushState 方法对 url 的更新形式，同样分为两种，分别在 history/createBrowserHistory 及 history/createHashHistory 各自的 finishTransition 中，如 history/createBrowserHistory 中使用的是 window.history.replaceState(historyState, null, path); 而 history/createHashHistory 则使用 window.location.hash = url，调用哪个是根据我们一开始创建 history 的方式。

更新 url 的显示是一部分，另一部分是根据 url 去更新展示，也就是触发前面的监听。这是在前面 finishTransition 更新 url 之后实现的，调用的是 history/createHistory 中的 updateLocation 方法，changeListeners 中为 history/createHistory 中的 listen 中所添加的，如下

```js
function updateLocation(newLocation) {
   // 示意代码
    location = newLocation;
    changeListeners.forEach(function (listener) {
      listener(location);
    });
}
function listen(listener) {
     // 示意代码
    changeListeners.push(listener);
}
```

## 总结

可以将以上 react-router 的整个包装闭环总结为

1. 回调函数：含有能够更新 react UI 的 react setState 方法。
2. 注册回调：在 Router componentWillMount 中使用 history.listen 注册的回调函数，最终放在 history 模块的 回调函数数组 changeListeners 中。
3. 触发回调：Link 点击触发 history 中回调函数数组 changeListeners 的执行，从而触发原来 listen 中的 setState 方法，更新了页面

至于前进与后退的实现，是通过监听 popstate 以及 hashchange 的事件，当前进或后退 url 更新时，触发这两个事件的回调函数，回调的执行方式 Link 大致相同，最终同样更新了 UI ，这里就不再说明。

react-router 主要是利用底层 history 模块的机制，通过结合 react 的架构机制做一层包装，实际自身的内容并不多，但其包装的思想笔者认为很值得学习，有兴趣的建议阅读下源码，相信会有其他收获。







# 前端路由的两种实现原理



![img](https://segmentfault.com/img/remote/1460000007239002?w=2000&h=767)

早期的路由都是后端实现的，直接根据 url 来 reload 页面，页面变得越来越复杂服务器端压力变大，随着 ajax 的出现，页面实现非 reload 就能刷新数据，也给前端路由的出现奠定了基础。我们可以通过记录 url 来记录 ajax 的变化，从而实现前端路由。

本文主要讲两种主流方式实现前端路由。

## History API

这里不细说每一个 API 的用法，大家可以看 MDN 的文档：[https://developer.mozilla.org...](https://developer.mozilla.org/en-US/docs/Web/API/History)

重点说其中的两个新增的API `history.pushState` 和 `history.replaceState`

这两个 API 都接收三个参数，分别是

- **状态对象（state object）** — 一个JavaScript对象，与用pushState()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，popstate事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。
- **标题（title）** — FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。
- **地址（URL）** — 新的历史记录条目的地址。浏览器不会在调用pushState()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

相同之处是两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。

不同之处在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。

我们拿大百度的控制台举例子（具体说是我的浏览器在百度首页打开控制台。。。）

我们在控制台输入

```js
window.history.pushState(null, null, "https://www.baidu.com/?name=orange");
```

好，我们观察此时的 url 变成了这样

![img](https://segmentfault.com/img/remote/1460000007239003?w=1216&h=132)

我们这里不一一测试，直接给出其它用法，大家自行尝试

```js
window.history.pushState(null, null, "https://www.baidu.com/name/orange");
//url: https://www.baidu.com/name/orange

window.history.pushState(null, null, "?name=orange");
//url: https://www.baidu.com?name=orange

window.history.pushState(null, null, "name=orange");
//url: https://www.baidu.com/name=orange

window.history.pushState(null, null, "/name/orange");
//url: https://www.baidu.com/name/orange

window.history.pushState(null, null, "name/orange");
//url: https://www.baidu.com/name/orange
```

> 注意:这里的 url 不支持跨域，当我们把 `www.baidu.com` 换成 `baidu.com` 时就会报错。

```js
Uncaught DOMException: Failed to execute 'pushState' on 'History': A history state object with URL 'https://baidu.com/?name=orange' cannot be created in a document with origin 'https://www.baidu.com'and URL 'https://www.baidu.com/?name=orange'.
```

回到上面例子中，每次改变 url 页面并没有刷新，同样根据上文所述，浏览器会产生历史记录

![img](https://segmentfault.com/img/remote/1460000007239004?w=1760&h=124)

这就是实现页面无刷新情况下改变 url 的前提，下面我们说下第一个参数 **状态对象**

如果运行 `history.pushState()` 方法，历史栈对应的纪录就会存入 **状态对象**，我们可以随时主动调用历史条目

此处引用 mozilla 的例子

```js
<!DOCTYPE HTML>
<!-- this starts off as http://example.com/line?x=5 -->
<title>Line Game - 5</title>
<p>You are at coordinate <span id="coord">5</span> on the line.</p>
<p>
 <a href="?x=6" onclick="go(1); return false;">Advance to 6</a> or
 <a href="?x=4" onclick="go(-1); return false;">retreat to 4</a>?
</p>
<script>
 var currentPage = 5; // prefilled by server！！！！
 function go(d) {
     setupPage(currentPage + d);
     history.pushState(currentPage, document.title, '?x=' + currentPage);
 }
 onpopstate = function(event) {
     setupPage(event.state);
 }
 function setupPage(page) {
     currentPage = page;
     document.title = 'Line Game - ' + currentPage;
     document.getElementById('coord').textContent = currentPage;
     document.links[0].href = '?x=' + (currentPage+1);
     document.links[0].textContent = 'Advance to ' + (currentPage+1);
     document.links[1].href = '?x=' + (currentPage-1);
     document.links[1].textContent = 'retreat to ' + (currentPage-1);
 }
</script>
```

我们点击 `Advance to ？` 对应的 url 与模版都会 +1，反之点击 `retreat to ？` 就会都 -1，这就满足了 url 与模版视图同时变化的需求

实际当中我们不需要去模拟 onpopstate 事件，官方文档提供了 popstate 事件，当我们在历史记录中切换时就会产生 popstate 事件。对于触发 popstate 事件的方式，各浏览器实现也有差异，我们可以根据不同浏览器做兼容处理。

## hash

我们经常在 url 中看到 #，这个 # 有两种情况，一个是我们所谓的锚点，比如典型的回到顶部按钮原理、Github 上各个标题之间的跳转等，路由里的 # 不叫锚点，我们称之为 hash，大型框架的路由系统大多都是哈希实现的。

同样我们需要一个根据监听哈希变化触发的事件 —— hashchange 事件

我们用 `window.location` 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。

 

http://codepen.io/orangexc/pe...

hashchange 在低版本 IE 需要通过轮询监听 url 变化来实现，我们可以模拟如下

```js
(function(window) {

  // 如果浏览器不支持原生实现的事件，则开始模拟，否则退出。
  if ( "onhashchange" in window.document.body ) { return; }

  var location = window.location,
  oldURL = location.href,
  oldHash = location.hash;

  // 每隔100ms检查hash是否发生变化
  setInterval(function() {
    var newURL = location.href,
    newHash = location.hash;

    // hash发生变化且全局注册有onhashchange方法（这个名字是为了和模拟的事件名保持统一）；
    if ( newHash != oldHash && typeof window.onhashchange === "function"  ) {
      // 执行方法
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);
})(window);
```

大型框架的路由当然不会这么简单，angular 1.x 的路由对哈希、模版、处理器进行关联，大致如下

```js
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
 $routeProvider
 .when('/article', {
   templateUrl: '/article.html',
   controller: 'ArticleController'
 }).otherwise({
   redirectTo: '/index'
 });
 $locationProvider.html5Mode(true);
}])
```

这套路由方案默认是以 # 开头的哈希方式，如果不考虑低版本浏览器，就可以直接调用 `$locationProvider.html5Mode(true)` 利用 H5 的方案而不用哈希方案。

## 总结

两种方案我推荐 hash 方案，因为照顾到低级浏览器，就是不美观（多了一个 #），两者兼顾也不是不可，只能判断浏览器给出对应方案啦，不过也只支持 IE8+，更低版本兼容见上文！

这个链接的 demo 含有判断方法：[http://sandbox.runjs.cn/show/...](http://sandbox.runjs.cn/show/dxi5lgcx) 。同时给出 Github 仓库地址: [minrouter](https://github.com/cheft/minrouter)，推荐大家读下源码，仅仅 117 行，精辟！

如果在上面链接测试时你的 url 里多了一个 #，说明你的浏览器该更新啦。

> 文章出自 orange 的 个人博客 <http://orangexc.xyz/>





