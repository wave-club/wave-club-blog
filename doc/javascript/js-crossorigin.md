## Js 跨域之李代桃僵

![找替死鬼.png](http://upload-images.jianshu.io/upload_images/1899643-70e4f0ef2061ae40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###跨域的方法大致有七计
<br />

javascript的同源策略

**同源策略是指协议，主机和端口 相同，就是为同源，不管后面在跟什么参数,否则都是跨域**


#####个人觉得服务器上设置代理页面 或者设置跨域头cros最方便
<br />

>锦囊一

在服务器上设置代理页面 ，如果是有类似nginx 服务的话，可以配置nginx 反向代理，因为跨域只针对浏览器.

比如nginx.conf 

    server {
    listen	80;
    server_name localhost;
    
    location / {
    	root   /usr/share/nginx/html;
    	index  index.html index.htm;
    }
    
    location /mesos/ {
    	rewrite ^/mesos(/.*)$ $1 break;
    	proxy_pass http://node1:5050;
    }
    
    location /marathon/ {
    	rewrite ^/marathon(/.*)$ $1 break;
    	proxy_pass http://node1:8080;
    }
    
    error_page	404	/404.html;
    
    error_page	500 502 503 504	/50x.html;
    location = /50x.html {
    	root	/usr/share/nginx/html;
    }
    }


>锦囊二


设置跨域头。
在responseHeader 里面设置 Access-Control-Allow-Origin: *
Access - Control -Allow - credentials (请求的时候会带上cookie)
Access-Control-Allow-Methods: POST, GET, OPTIONS,PUT, DELETE

######比如node下定义个中间件

    module.exports.crossOrigin = function( req, res, next ) {

    res.header( "Access-Control-Allow-Origin", "*" );

    next();

    };



>锦囊三

Jsonp 是在客户端生成1个callback回调，之后通过script标签把这个名称发到服务器端。服务器端以javascript 语法的方式包装一下json数据，生成1个函数调用，函数名称是callback,客户端解析script，并且执行返回的javascript文档。



![jsonp.png](http://upload-images.jianshu.io/upload_images/1899643-731f29db5e5c7572.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


>锦囊四

post+动态生成iframe是可以达到post跨域的目的、 form 表单提交是会刷新当前页面的。我们可以设置form 的target 属性，1个隐藏的ifram，当post提交数据后，我们能在iframe中得到返回的结果，并且在iframe 操作js，其实幕后推手是iframe



>锦囊五



通过修改document.domain来跨子域
将子域和主域的document.domain设为同一个主域.前提条件：这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致，否则无法利用document.domain进行跨域

主域相同的使用document.domain

需要基础域名相同
比如 a.baidu.com 和 b.baidu.com
document.domain=‘baidu.com’ 就可以跨域了。




![domain.jpg](http://upload-images.jianshu.io/upload_images/1899643-4f8381301a26aa9b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





>锦囊六

使用window.name来进行跨域


window
对象有个name
属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name
的，
每个页面对window.name
都有读写的权限，window.name
是持久存在一个窗口载入过的所有页面中的

######window.name局限在于只能通过window.name 传值，并且也是get 方式



![window_name.jpg](http://upload-images.jianshu.io/upload_images/1899643-7c96d75b9981264f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


<br />

>锦囊七

使用HTML5中新引进的window.postMessage方法来跨域传送数据