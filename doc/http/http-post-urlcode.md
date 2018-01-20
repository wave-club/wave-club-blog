## Http POST 提交数据的四种方式解析



![http.jpg](http://upload-images.jianshu.io/upload_images/1899643-993b378365c5db86.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>我们知道，HTTP 协议是以 ASCII 码传输，建立在 TCP/IP 协议之上的应用层规范。HTTP 协议规定的 HTTP 请求方法有 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT 这几种。其中 POST 一般用来向服务端提交数据，本文主要讨论 POST 提交数据的几种方式。




协议规定 POST 提交的数据必须放在消息主体（entity-body）中，但协议并没有规定数据必须使用什么编码方式。但是，数据发送出去，还要服务端解析成功才有意义。


服务端通常是根据请求头（headers）中的 Content-Type 字段来获知请求中的消息主体是用何种方式编码，再对主体进行解析。


 POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。下面就正式开始介绍它们。




>在服务器端判断request来自Ajax请求(异步)还是传统请求(同步)： 
>![xmlHttpRequest.png](http://upload-images.jianshu.io/upload_images/1899643-75654c4a0574005b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




###application/x-www-form-urlencoded （默认常用的）

这应该是最常见的 POST 提交数据的方式了。浏览器的原生 <form> 表单，如果不设置 enctype
 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。


Content-Type 被指定为 application/x-www-form-urlencoded；其次，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。例如 PHP 中，$_POST['title'] 可以获取到 title 的值，$_POST['sub'] 可以得到 sub 数组。


![x-www-form-urlencoded.png](http://upload-images.jianshu.io/upload_images/1899643-d1a1cb64a55b01c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





###multipart/form-data  

这又是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 <form> 表单的 enctyped
 等于 multipart/form-data。直接来看一个请求示例：

>提示 input type=file 浏览器处于安全考虑 ，  必须操作赋值，不能直接改value, 
>比如canvas 直接生成图片之后上传 就不能使用 input type=file。可以直接把得到的图片转换成 base64 上传

![multipart/form-data.png](http://upload-images.jianshu.io/upload_images/1899643-06cfa10cc462d31e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


>boundary 文件分割线


###application/json



application/json  这种方案，可以方便的提交复杂的结构化数据， 这个 Content-Type 作为响应头大家肯定不陌生。现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。

 由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。

 JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用 AngularJS 中的 Ajax 功能，默认就是提交 JSON 字符串。例如下面这段代码：

    var data = {'title':'test', 'sub' : [1,2,3]};
    $http.post(url, data).success(function(result) {
        ...
    });


最终发送的请求是：


    Content-Type: application/json;charset=utf-8
     {"title":"test","sub":[1,2,3]}


![application/json.png](http://upload-images.jianshu.io/upload_images/1899643-e9b109683f62e8e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


>JSON.parse()和JSON.stringify()




![JSON.png](http://upload-images.jianshu.io/upload_images/1899643-76c668dc4840ffab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



###text/xml



现在几乎不用





######默认情况下，标准的跨域请求是不会发送cookie等用户认证凭据的，XMLHttpRequest 2的一个重要改进就是提供了对授信请求访问的支持。



    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://www.xxx.com/api');
    xhr.withCredentials = true;
    xhr.onload = onLoadHandler;
    xhr.send();



Access-Control-Allow-Credentials: true


![Access-Control-Allow-Credentials.png](http://upload-images.jianshu.io/upload_images/1899643-79a2a6b4c9faeef0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)