## HTTP 深入详解（HTTP Web 的基础）



![Http](http://upload-images.jianshu.io/upload_images/1899643-e387bbfa1c7bef6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



####HTTP概述：

>HTTP 是超文本传输协议的简称，英文是（Hypertext Tansfer Protocol），是现代全球因特网中的公共语言。


####Web 客户端和服务器


web 客户端最常见的是浏览器，不如Microsoft 的IE ， Netscape 的Firefox 等，web 客户端负责服务器返回数据的展现

####web资源

web服务器是web资源的宿主，web资源是web内容的源头
资源不一定是静态文件，所有能提供web内容的都是web资源

####MIME Type（媒体类型）(多用途的网际邮件扩充协议)
HTTP 对每种数据类型都打上了MIME Typ的标志，最初设计MIME 的目的是为了在不同的电子邮件系统中间搬移报文时候存在的问题。



![mimeType.png](http://upload-images.jianshu.io/upload_images/1899643-f53e95db64fbc236.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


MIME 类型是一种文本标记，表示一种特定的格式类型，使用/来分隔

>HTML 格式是 text/html
>普通的ASCII 格式是 text/plain
>JPEG 是 text/jpeg 
>APPLE 的QuickTime 是video/quicktime
>....


####URI

>统一资源标识符（Uniform Resource  Identifier),有2种表现形式URL（普遍使用） 和URN（目前实验阶段）

####事务（会话）

一个HTTP 事务有1个request（请求命令） 和 response（返回命令）组成。这种通信就叫HTTP 报文（HTTP Message）



####常见的HTTP 方法

> OPTIONS :  获取资源支持的HTTP方法列表，或者ping服务器
> GET  : 获取资源的内容
> HEAD ： 取与GET响应相同的header，但是响应中没有任何body
> POST ： 及其常见 ， 创建新资源，修改资源等，很通用
> PUT ： 更新或替换一个现有资源等
> DELETE ： 删除资源
> TRACE ： 回显服务器接收到的header，支持该方法的服务器可能存在XST安全隐患。


####报文是如何流动的


HTTP报文是HTTP应用程序之间发送的数据块，这些数据块以一些文本形式的元信息（meta-information）开头.这些信息描述了报文的内容和含义，后面跟着可选的数据部分。

HTTP使用属于流入和流出来描述报文的传递方向。HTTP报文会像水一样流动。不管时请求报文还是响应报文，都会向下游流动，所有报文的发送者都在接受者的上游（谁发送谁上游）。下图展示了报文向下游流动的例子。


![Message.png](http://upload-images.jianshu.io/upload_images/1899643-cdeae193bced9090.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



####报文的组成

报文由三个部分组成：

1.对报文进行描述的起始行
2.包含属性的首部块
3.可选的、包含数据的主体部分

如下图

![报文组成.png](http://upload-images.jianshu.io/upload_images/1899643-59594f7063a3ed2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


起始行和首部是由行分隔的ASCII文本。每行都以一个由两个字符（回车符--ASCII码13和换行符--ASCII码10）组成的行终止序列结束。可以写做 **CRLF** 。

实体是一个可选的数据块。与起始行和首部不同的是，主体中可以包含主体或二进制数据，也可以为空（比如仅仅GET一个页面或文件）。


请求报文的语法：

    <method> <request-URL> <version>
    <headers>
    <entity-body>

简要描述
>Request Method ： 方法
>Request URL： 请求url
>Version ： 版本
>Status Code :  状态码  + 原因短语


####常见状态码

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-50764cf8081d3f06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-955a31e323da2d04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####HTTP 连接管理

>世界上几乎所有的HTTP 连接都是由TCP/IP 承载的。TCP/IP是一种分组交换网络分层协议集。客户端可以打开一个TCP/IP连接,一旦建立了连接，在客户端和服务器之间的报文永远不会丢失，受损和无序。
>**TCP 属于可靠的数据管道**

看下图

![TCP/IP](http://upload-images.jianshu.io/upload_images/1899643-eff9045e093511ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### TCP 流是分段的，由IP 分组传送

HTTP要传送一条报文时，会以流的形式将报文数据的内容通过一条打开的TCP连接按序传输 TCP收到数据流之后，会将数据流砍成被称作段的小数据块，并将段封装在ip分组中，通过因特网进行传输。 所有这些操作都有TCP/ip软件来处理，程序员无法看到。

**安全版本HTTPS 其实就是 HTTP 和TCP 之间加了一层 称为TSL 或 SSL 的密码加密层**

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-781a68ee178c9c99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####保持TCP连接的正确运行
 1、在任意时刻，计算机都可以有几条TCP连接处于打开状态，TCP是通过端口号来保持所有这些连接的正确运行 2、端口号和雇员使用的电话分机号很类似。 3、TCP连接通过4个值来识别：<源IP地址、源端口号、目的IP地址、目的端口号>

####TCP 性能考虑


HTTP 事务延迟的以下几种主要原因（部分摘自 《HTTP 权威指南》）

####1.DNS 解析耗时 
如果最近没有对URI 中的主机名进行访问，通过主机名转换成一个IP 地址 可能需要花费十秒的时间


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-45d7034141648792.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####2.HTTP 连接个数 (默认最大连接数 ***16,777,214***)
每条新的TCP 连接建立起来通常最多需要1~2秒。由于TCP 最大连接数的限制，如果有数百个HTTP 事务的话，这个值会很快叠加上去。


浏览器的http 请求限制  ( 浏览器的并发请求数目限制是针对同一域名的。)


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-cf7b5bb5ca1cfd5b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


意即，同一时间针对同一域名下的请求有一定数量限制。超过限制数目的请求会被阻塞，这就是为什么会有     abc.com, api. abc.com     之类域名的原因。
（这是其中一个原因，另一个主要原因是，向 [http://abc.com](http://zhihu.com/) 请求资源会把 [http://abc.com](http://zhihu.com/) 下本地的所有 cookie 发送过去，这是请求图片，js等资源不需要的，会造成很大的浪费）

还要服务器的 http 连接个数 ，不如12306 。双11等。轻松破这个限制。这个时候会使用负载均衡技术



#### 3.数据的大小，
服务器处理请求报文都需要时间，返回HTTP 响应报文的尺寸，客户端和服务器之间的距离，硬件速度，网络和服务器的负载都回产生影响

####HTTP协议是无状态的和Connection: keep-alive


>无状态是指协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。从另一方面讲，打开一个服务器上的网页和你之前打开这个服务器上的网页之间没有任何联系。

从HTTP/1.1起，默认都开启了Keep-Alive，保持连接特性，简单地说，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。

Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。



























 ！！！！！！！！或许是本年度最无意义的分割线！！！！！！！！！

####Requests Header 头部

**Accept / 指定客户端能够接收的内容类型**
Accept: text/plain, text/html

Accept-Charset / 浏览器可以接受的字符编码集。
Accept-Charset: iso-8859-5

Accept-Encoding / 指定浏览器可以支持的web服务器返回内容压缩编码类型。
Accept-Encoding: compress, gzip

Accept-Language / 浏览器可接受的语言
Accept-Language: en,zh

Accept-Ranges / 可以请求网页实体的一个或者多个子范围字段
Accept-Ranges: bytes

**Authorization / HTTP授权的授权证书**
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

Cache-Control / 指定请求和响应遵循的缓存机制
Cache-Control: no-cache

Connection / 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）
Connection: close

**Cookie /HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。**
Cookie: $Version=1; Skin=new;

Content-Length / 请求的内容长度
Content-Length: 348

Content-Type / 请求的与实体对应的MIME信息
Content-Type: application/x-www-form-urlencoded

Date / 请求发送的日期和时间
Date: Tue, 15 Nov 2010 08:12:31 GMT

Expect / 请求的特定的服务器行为
Expect: 100-continue

From / 发出请求的用户的Email
From: user@email.com

**Host / 指定请求的服务器的域名和端口号**
Host: www.zcmhi.com

If-Match / 只有请求内容与实体相匹配才有效
If-Match: “737060cd8c284d8af7ad3082f209582d”

If-Modified-Since / 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码
If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT

If-None-Match / 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变
If-None-Match: “737060cd8c284d8af7ad3082f209582d”

If-Range / 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag
If-Range: “737060cd8c284d8af7ad3082f209582d”

If-Unmodified-Since / 只在实体在指定时间之后未被修改才请求成功
If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT

Max-Forwards / 限制信息通过代理和网关传送的时间
Max-Forwards: 10

Pragma / 用来包含实现特定的指令
Pragma: no-cache

Proxy-Authorization / 连接到代理的授权证书
Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

Range / 只请求实体的一部分，指定范围
Range: bytes=500-999

**Referer / 先前网页的地址，当前请求网页紧随其后,即来路**
Referer: http://www.zcmhi.com/archives/71.html

TE / 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息
TE: trailers,deflate;q=0.5

Upgrade / 向服务器指定某种传输协议以便服务器进行转换（如果支持）
Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11

**User-Agent / User-Agent的内容包含发出请求的用户信息**
User-Agent: Mozilla/5.0 (Linux; X11)

Via / 通知中间网关或代理服务器地址，通信协议
Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)

Warning / 关于消息实体的警告信息
Warn: 199 Miscellaneous warning



>####Responses Header 部分 

**Access -control - Allow - origin : 允许跨域地址**
Access-Control-Allow-Origin:http://admin.hiclass.hilab.net

**Access - Control -Allow - credentials : 请求的时候会带上cookie**
Access-Control-Allow-Credentials:true

Accept-Ranges / 表明服务器是否支持指定范围请求及哪种类型的分段请求
Accept-Ranges: bytes

Age / 从原始服务器到代理缓存形成的估算时间（以秒计，非负）
Age: 12

**Allow / 对某网络资源的有效的请求行为，不允许则返回405**
Allow: GET, HEAD

**Cache-Control / 告诉所有的缓存机制是否可以缓存及哪种类型**
Cache-Control: no-cache

Content-Encoding / web服务器支持的返回内容压缩编码类型。
Content-Encoding: gzip

Content-Language / 响应体的语言
Content-Language: en,zh

Content-Length / 响应体的长度
Content-Length: 348

Content-Location / 请求资源可替代的备用的另一地址
Content-Location: /index.htm

Content-MD5 / 返回资源的MD5校验值
Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==

Content-Range / 在整个返回体中本部分的字节位置
Content-Range: bytes 21010-47021/47022

**Content-Type / 返回内容的MIME类型**
Content-Type: text/html; charset=utf-8

Date / 原始服务器消息发出的时间
Date: Tue, 15 Nov 2010 08:12:31 GMT

**ETag / 请求变量的实体标签的当前值**
ETag: “737060cd8c284d8af7ad3082f209582d”

**Expires / 响应过期的日期和时间**
Expires: Thu, 01 Dec 2010 16:00:00 GMT

Last-Modified / 请求资源的最后修改时间
Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT

**Location / 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源**
Location :  http://xxx.com/a.html

Pragma / 包括实现特定的指令，它可应用到响应链上的任何接收方
Pragma: no-cache

Proxy-Authenticate / 它指出认证方案和可应用到代理的该URL上的参数
Proxy-Authenticate: Basic

**refresh /应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）**
Refresh: 5; url=
http://www.zcmhi.com/archives/94.html

Retry-After / 如果实体暂时不可取，通知客户端在指定时间之后再次尝试
Retry-After: 120

**Server / web服务器软件名称**
Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)

**Set-Cookie / 设置Http Cookie**
Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1

Trailer / 指出头域在分块传输编码的尾部存在
Trailer: Max-Forwards

**Transfer-Encoding / 文件传输编码**
Transfer-Encoding:chunked

Vary / 告诉下游代理是使用缓存响应还是从原始服务器请求
Vary: *

Via / 告知代理客户端响应是通过哪里发送的
Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)

Warning / 警告实体可能存在的问题
Warning: 199 Miscellaneous warning

WWW-Authenticate / 表明客户端请求实体应该使用的授权方案
WWW-Authenticate: Basic