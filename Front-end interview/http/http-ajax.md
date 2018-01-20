## Ajax 深度介绍



#### 发展历程

XMLHttpRequest一开始只是微软浏览器提供的一个接口，后来各大浏览器纷纷效仿也提供了这个接口



后来W3C对它进行了标准化，提出了XMLHttpRequest标准。XMLHttpRequest标准又分为[Level 1](https://www.w3.org/TR/XMLHttpRequest1/)和2008年的[Level 2](https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html)



`XMLHttpRequest Level 1` 主要存在以下缺点：

- 受同源策略的限制，不能发送跨域请求；
- 不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；
- 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；



`XMLHttpRequest Level 2` 中新增了以下功能：

- 可以发送跨域请求，在服务端允许的情况下；
- 支持发送和接收二进制数据；
- 新增formData对象，支持发送表单数据；
- 发送和获取数据时，可以获取进度信息；
- 可以设置请求的超时时间；



#### 编写方式

1. 创建 `XMLHttpRequest` 的实例
2. 指定回调函数处理成功和失败等
3. 调用两个方法 `open()` 与 `send()` 分别用于建立连接和发送数据



#### Leve1的请求方式



```javascript
var xhr = creatXHR();
xhr.onreadystatechange = readyCallback;
xhr.open();
xhr.send();

function creatXHR(){
	if(window.XMLHttpRequest) return new XMLHttpRequest();
	var created = false;
	if(window.ActiveXObject){
		var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
		while(versions.length){
			try{
				var oXhr = new ActiveXObject(versions.shift());
				created = true;
				return xhr;
			}catch(e){}
		}
	}
	if(!created){
		throw new Error('您的浏览器版本过低，无法创建异步对象，请升级您的浏览器')
	}
}
function readyCallback(){
	if(this.readyState === 4){
		if(this.status >= 200 && xhr.status < 300 || xhr.status == 304){
			console.log(this.responseText);
		}else{
			console.log(this.status, this.statusText)
		}
	}
}
```



#### Leve2的请求方式

跨域请求一张图片，并打印进度



```javascript
var xhr = new XMLHttpRequest();
xhr.timeout=3000;
xhr.responseType = 'blob';

xhr.onloadstart = onLoadStart;
xhr.onload = onLoad;
xhr.onloadend = onLoadEnd;
xhr.onerror = onError;
xhr.onabort = onAbort;
xhr.ontimeout = onTimeout;
xhr.onprogress = onProgress;

xhr.open('post','http://7xi480.com1.z0.glb.clouddn.com/ChMkJlbKzE6IPzkoABFpT19gRYgAALI0wOYts8AEWln666.jpg')
xhr.send(data);

function onLoad(e){
	console.log('成功');
	document.getElementById('imgBox').src = URL.createObjectURL(xhr.response);
}
function onError(e){
	console.log('失败:', xhr.statusText)
}
function onAbort(e){
	console.log('异步请求已经取消')
}
function onProgress(e){
	if(e.total>0) console.log(Math.ceil(e.loaded / e.total *100));
}
function onTimeout(){
	console.log('超时');
}
function onLoadStart(e){
	console.log('开始');
}
function onLoadEnd(e){
	console.log('完成');
}
```



#### 同步和异步请求



open的第三个参数async，表示是否是异步请，默认是true
如果aync是false，发送同步请求，那么请求的配置会有一些限制：

- `xhr.timeout` 必须为 `0`
- `xhr.withCredentials` 必须为 `false`
- `xhr.responseType` 必须为`""`（注意置为`"text"`也不允许）
- 若上面任何一个限制不满足，都会抛错，而对于异步请求，则没有这些参数设置上的限制。

页面中应该尽量避免使用sync同步请求:
因为我们无法设置请求超时时间（xhr.timeout为0，即不限时）。在不限制超时的情况下，有可能同步请求一直处于pending状态，服务端迟迟不返回响应，这样整个页面就会一直阻塞，无法响应用户的其他交互。



#### 指定响应的数据类型



`responseType`是xhr level 2新增的属性，用来指定`xhr.response`的数据类型，目前还存在些兼容性问题，可取值如下:

- `""` 如果没有值，默认返回`String`
- `"text"` String字符串
- `"document"` Document对象 希望返回 XML 格式数据时使用
- `"json"` javascript 对象 存在兼容性问题，IE10/IE11不支持
- `"blob"` Blob对象
- `"arrayBuffer"` ArrayBuffer对象



#### 请求状态

`xhr.readyState` 只读属性，用于追踪Ajax请求过程的不同状态，有以下几个取值：

- `0` UNSENT (初始状态，未打开) 此时xhr对象被成功构造，open()方法还未被调用

- `1` OPENED (已打开，未发送) open()方法已被成功调用，send()方法还未被调用。注意：只有xhr处于OPENED状态，才能调用xhr.setRequestHeader()和xhr.send(),否则会报错

- `2` HEADERS_RECEIVED (已获取响应头) send()方法已经被调用, 响应头和响应状态已经返回

- `3` LOADING (正在下载响应体) 响应体`(response entity body)` 正在下载中，此状态下通过xhr.response可能已经有了响应数据

- `4` DONE (整个数据传输过程结束) 整个数据传输过程结束，不管本次请求是成功还是失败

  ```javascript
  xhr.onreadystatechange = function () {
    switch(xhr.readyState){
      case 1: //OPENED
        //do something
            break;
      case 2://HEADERS_RECEIVED
        //do something
        break;
      case 3://LOADING
        //do something
        break;
      case 4://DONE
        //do something
        break;
    }
  ```



#### 发送的数据类型

`xhr.send(data)` 的参数`data`可以是以下几种类型：

- ArrayBuffer
- Blob
- Document
- DOMString
- FormData
- null

xhr.send(data)中data参数的数据类型会影响请求头部content-type的默认值：

- Document 类型，同时也是HTML Document类型，则content-type默认值为`text/html;charset=UTF-8;`否则为`application/xml;charset=UTF-8`；
- DOMString 类型，content-type默认值为`text/plain;charset=UTF-8`；
- FormData 类型，content-type默认值为`multipart/form-data; boundary=[xxx]`
- 其他类型，则不会设置content-type的默认值



#### 获取上传、下载的进度



上传和下载的异步处理事件是不同的：

- 上传触发的是xhr.upload对象的 onprogress事件
- 下载触发的是xhr对象的onprogress事件



#### 事件的触发条件



| 事件                   | 触发条件                                     |
| -------------------- | ---------------------------------------- |
| `onreadystatechange` | 每当 `xhr.readyState` 改变时触发；但xhr.readyState由非0值变为0时不触发。 |
| `onloadstart`        | 调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。 |
| `onprogress`         | xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。 |
| `onload`             | 当请求成功完成时触发，此时xhr.readystate=4            |
| `onloadend`          | 当请求结束（包括请求成功和请求失败）时触发                    |
| `onabort`            | 当调用xhr.abort()后触发                        |
| `ontimeout`          | xhr.timeout不等于0，由请求开始即onloadstart开始算起，当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。 |
| `onerror`            | 在请求过程中，若发生Network error则会触发此事件（若发生Network error时，上传还没有结束，则会先触发xhr.upload.onerror，再触发xhr.onerror；若发生Network error时，上传已经结束，则只会触发xhr.onerror）。注意，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，并不属于Network error，所以不会触发onerror事件，而是会触发onload事件。 |





#### 事件触发顺序

当请求一切正常时，相关的事件触发顺序如下：

1. 触发xhr.onreadystatechange(之后每次readyState变化时，都会触发一次)
2. 触发xhr.onloadstart
   //上传阶段开始：
3. 触发xhr.upload.onloadstart
4. 触发xhr.upload.onprogress
5. 触发xhr.upload.onload
6. 触发xhr.upload.onloadend
   //上传结束，下载阶段开始：
7. 触发xhr.onprogress
8. 触发xhr.onload
9. 触发xhr.onloadend

发生abort/timeout/error异常的处理

在请求的过程中，有可能发生 abort/timeout/error这3种异常。那么一旦发生这些异常，xhr后续会进行哪些处理呢？后续处理如下：

1. 一旦发生abort或timeout或error异常，先立即中止当前请求
2. 将 readystate 置为4，并触发 xhr.onreadystatechange事件
3. 如果上传阶段还没有结束，则依次触发以下事件：
   1. xhr.upload.onprogress
   2. xhr.upload.[onabort或ontimeout或onerror]
   3. xhr.upload.onloadend
4. 触发 xhr.onprogress事件
5. 触发 xhr.[onabort或ontimeout或onerror]事件
6. 触发xhr.onloadend 事件



#### 结合Promise封装Ajax





既然学习了这么多的ajax相关知识，那么是时候学习致用了，我结合之前学过的Promise，封装一个简单的异步请求工具类：

首先我希望这个ajax模块具有以下功能

- 将API资源集中管理，项目中使用api.js来管理整个项目或业务模块的api接口
- 在定义api资源时，可以传递配置参数 `http('xx.json', { options })`
- 各个业务调用api.js，获取相关接口，根据业务去决定调用方法（GET/POST/PUT等）`api.news.get({})`
- 只在业务模块中使用的时候传递请求参数
- 传递配置对象，可以独立使用 `http({data:{}, method:'Post', url:'xx.json'})`

```javascript
// api.js 集中管理api接口
var http = require(./http)

var api = {
	news: http('api/news',{
		cache: false //所有news下的接口都不缓存
	}),
	users: http('api/users')
}

//业务模块调用api.js
var api = require('api.js')

api.news.get({uname:'xxx', pwd:123})
	.then(res=>console.log(res))
	.catch(err=>console.log(err))
	
api.news.post({uname:'xxx', pwd:123})
	.then(res=>console.log(res))
	.catch(err=>console.log(err))

// 类似于jQuery的使用方式
http({
	url:'api/d1.json',
	method: 'post',//不区分大小写
	data: {name:'jack',pwd:123}
	...
}).then().catch()
```

实现

先定义一个HttpAjax类，有一个构造函数`constructor` ，三个方法 `init`、`toSearchParams`、`setHeaders`。

```javascript
class HttpAjax(){
	constructor(){}//1.初始化配置参数 2.判断是注册api资源还是直接调用
	init(){} //返回各种Method对应的方法
	toSearchParams(){} //将传递的json对象转为urlParams
	setHeaders(){} //将配置的请求头对象设置请求头中去
}
```

代码很简单，这里就不详细解释了，这个封装仅用于学习，切勿用于生产环境

```javascript
class HttpAjax{
	constructor(opts, params){
		const optIsString = typeof opts === 'string';
		this.methods = ['GET', 'POST'];
		const _opts = (optIsString ? params : opts) || {};

		this.cache = typeof _opts.cache === undefined ? true : _opts.cache;
		this.method = (_opts.method || 'get').toLowerCase();
		this.url = optIsString ? opts : _opts.url;
		this.data = _opts.data || {};
		this.headers = _opts.headers || {};
		this.timeout = _opts.timeout || 6000;
		this.responseType = _opts.responseType || 'json';
		this.requestBefore = _opts.requestBefore;
		this.requestAfter = _opts.requestAfter;
		this.requestAbort = _opts.requestAbort;
		this.requestProgress = _opts.requestProgress;
		this.ontimeout = _opts.requestTimeout;

		this.init();

		return optIsString ? this : this[this.method](this.data);
	}
	init(){
		this.methods.forEach(method=>{
			this[method.toLowerCase()]= data => {
				return new Promise((resolve, reject) => {
					var xhr = new XMLHttpRequest();
					!this.cache && method ==='GET' && (this.url += ((/\?/).test(this.url) ? "&" : "?") + (new Date()).getTime());
					xhr.open(method, this.url);
					
					this.requestBefore && (xhr.onloadstart = xhr => {
						if(this.requestBefore(xhr)===false){
							xhr.abort();
						}
					})
					xhr.onload = () => resolve(xhr.response);
					xhr.onerror = () => reject(xhr);
					this.requestAbort && ( xhr.onabort = this.requestAbort );
					this.requestAfter && ( xhr.onloadend = this.requestAfter );
					this.requestTimeout && ( xhr.ontimeout = this.requestTimeout );
					this.requestProgress && ( xhr.onprogress = this.requestProgress );

					xhr.timeout = this.timeout;
					xhr.responseType = this.responseType;
					method==='POST' && !this.headers && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					this.headers && this.setHeaders(xhr, this.headers);

					try{
						xhr.send(this.toSearchParams(data));
					}catch(e){
						reject(err);
					}
				})
			}
		})
	}
	toSearchParams(jsonObj){
		var params = [];
		for(var i in jsonObj){
			params.push(`${i}=${jsonObj[i]}`);
		}
		return params.join('&');
	}
	setHeaders(xhr, headers){
		for(var i in headers){
			xhr.setRequestHeader(i, headers[i]);
		}
	}
}
function http(options, params){
	if(!options) return;
	return new HttpAjax(options, params);
}

module.exports.http = http;
```

应用
点击请求一张图片，返回的结果：

```javascript
http({
	method:'POST', 
	url:imgUrl,
	cache:true,
	responseType: 'blob',
	requestBefore: function(e){
		console.log('准备开始请求...')
	},
	requestAfter:function(e){
		console.log('请求完成')
	},
	requestProgress:function(e){
		e.total>0 && console.log('正在接收：'+ Math.ceil(e.loaded/e.total*100));
	}
}).then(res=>{ 
		document.getElementById('imgBox').src = URL.createObjectURL(res);
}).catch(err=>{
		debugger;
		console.log(err);
})
输出：
准备开始请求...
正在接收：2
正在接收：46
正在接收：100
请求完成
```

[![img](http://7xi480.com1.z0.glb.clouddn.com/ajax_promise1.gif)](http://7xi480.com1.z0.glb.clouddn.com/ajax_promise1.gif)





本文非原创，主要来自于 http://coderlt.coding.me/2016/11/20/js-ajax/

