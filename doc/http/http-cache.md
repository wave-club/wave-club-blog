#前端性能毫秒必争方案（二）HTTP缓存
    web最好的体验是不需要与服务器通信

**响**应消除所有的网络延迟，并避免数据传输的数据开销。
**为**了实现这一目标，HTTP规范允许服务器返回多个不同的缓存控制指令来控制如何，以及多长时间可以通过浏览器和其他中间缓存缓存单个响应。


![](http://upload-images.jianshu.io/upload_images/1899643-245bb64ca4de2be4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####好在每个现代浏览器都自带了 HTTP 缓存实现功能。
**您**只需要确保每个服务器响应都提供正确的 HTTP 标头指令，以指示浏览器何时可以缓存响应以及可以缓存多久。

####作为开发者，怎么利用HTTP Cache？
**浏**览器会替我们完成所有工作，它会自动检测之前是否指定了验证令牌，它会将验证令牌追加到发出的请求上，并且它会根据从服务器接收的响应在必要时更新缓存时间戳。
____
####唯一要做的
**就**是确保服务器提供必要的 ETag 令牌。检查您的服务器文档中有无必要的配置标志。**

####送上Ngix 实战配置，不玩虚的
____

    # 为JS 文件添加长时间缓存
    location ~* \.js$ {
    	add_header "section" "long expire"; #  仅供说明
    	add_header Cache-Control "max-age=31536000";
    }
    
    # 或者为JS文件删除ETags
    location ~* \.js$ {
  	add_header "section" "no etags"; #  仅供说明
  	etag off;
    }

      location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
        error_page 404 = /index.php;
    	expires 1M;
    	access_log off;
    }
    //HTTP/1.1 200 OK
    //Server: nginx
    //Date: Thu, 23 Oct 2014 09:58:47 GMT
    //Content-Type: application/javascript; charset=utf-8
    //Content-Length: 1
    //Last-Modified: Tue, 29 Oct 2013 15:17:17 GMT
    //Connection: keep-alive
    //ETag: "526fd17d-1"
    //Cache-Control: max-age=31536000
    //section: long expire
    //Accept-Ranges: bytes
____

####慎！后面很长
____

HTTP 1.1 缓存校验
######Last-Modified:根据最后修改时间匹配
Last-Modified 不是特别好，因为如果在服务器上，一个资源被修改了，但其实际内容根本没发送改变，会因为Last-Modified时间匹配不上而返回了整个实体给客户端 （即使客户端缓存里有个一模一样的资源） 。也有可能服务器时间喝客户端时间不一致也会出现问题

浏览器请求会加上

If-Modified-Since: Last-Modified-value  
或者 If-Unmodified-Since: Last-Modified-value

If-Modified-Since该请求首部告诉服务器如果客户端传来的最后修改时间与服务器上的一致，则直接回送304 和响应报头即可

If-Unmodified-Since告诉服务器，若Last-Modified没有匹配上 （资源在服务端的最后更新时间改变了） ，则应当返回412(Precondition Failed) 状态码给客户端

######ETag:根据资源标识符匹配
为了解决上述Last-Modified可能存在的不准确的问题，Http1.1还推出了 ETag 实体首部字段。
服务器会通过某种算法，给资源计算得出一个唯一标志符（比如md5标志），服务器只需要比较客户端传来的ETag跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。

如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源 （当然也包括了新的ETag） 发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。

浏览器请求会加上
If-None-Match: ETag-value 或者
If-Match: ETag-value


####如果 Last-Modified 和 ETag 同时被使用，则要求它们的验证都必须通过才会返回304，若其中某个验证没通过，则服务器会按常规返回资源实体及200状态码。

较新的 nginx 上默认是同时开启了这两个功能的 ，是不是感觉本文白看了。

![](http://upload-images.jianshu.io/upload_images/1899643-de830687a955440a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

____

**当**服务器返回响应时
  HtppResponseHeader会发出一组 HTTP 标头，用于描述响应的内容类型、长度、缓存指令、验证令牌等。

例如，在下图的交互中，服务器返回一个 Gzip 压缩过的 ，过时时间Expires 为（Sat, 03 Jun 2017 08:45:24 GMT），现在是2017年5月27日。



![HtppResponseHeader](http://upload-images.jianshu.io/upload_images/1899643-18af074af7ad0a43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![开启GZIP 减轻了近50%的数据请求](http://upload-images.jianshu.io/upload_images/1899643-a80e54e47a3a4737.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####通过 ETag 验证缓存的响应
**服**务器使用 ETag HTTP 标头传递验证令牌。
**验**证令牌可实现高效的资源更新检查：资源未发生变化时不会传送任何数据。


首次获取资源 200 秒后，浏览器又对该资源发起了新的请求

浏览器会检查本地缓存并找到之前的响应。

遗憾的是，该响应现已过期，浏览器无法使用。

此时，浏览器可以直接发出新的请求并获取新的完整响应。
不过，这样做效率较低，因为如果资源未发生变化，那么下载与缓存中已有的完全相同的信息就毫无道理可言！

这正是验证令牌（ ETag 标头）旨在解决的问题。
服务器生成并返回的随机令牌通常是文件内容的哈希值或某个其他指纹。客户端不需要了解指纹是如何生成的，只需在下一次请求时将其发送至服务器。如果指纹仍然相同，则表示资源未发生变化，您就可以跳过下载。


![If-None-Match 标头 是浏览器自己自带的默认行为](http://upload-images.jianshu.io/upload_images/1899643-cda3a66fdc2bdd31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


在上图中，客户端自动在“If-None-Match” HTTP 请求标头内提供 ETag 令牌。服务器根据当前资源核对令牌。如果它未发生变化，服务器将返回“304 Not Modified”响应，告知浏览器缓存中的响应未发生变化，可以再延用 200 秒。请注意，您不必再次下载响应，这节约了时间和带宽。





####Cache-Control
**1.每个资源都可通过 Cache-Control HTTP 标头定义其缓存策略
**
**2.Cache-Control 指令控制谁在什么条件下可以缓存响应以及可以缓存多久。**

####注：
Cache-Control 标头是在 HTTP/1.1 规范中定义的，取代了之前用来定义响应缓存策略的标头（例如 Expires）。所有现代浏览器都支持 Cache-Control，因此，使用它就够了。




####max-age
指令指定从请求的时间开始，允许获取的响应被重用的最长时间（单位：秒）。例如，“max-age=60”表示可在接下来的 60 秒缓存和重用响应。
####no-cache

“no-cache”表示必须先与服务器确认返回的响应是否发生了变化，然后才能使用该响应来满足后续对同一网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，但如果资源未发生变化，则可避免下载。

####no-store
“no-store”则要简单得多。它直接禁止浏览器以及所有中间缓存存储任何版本的返回响应，例如，包含个人隐私数据或银行业务数据的响应。每次用户请求该资产时，都会向服务器发送请求，并下载完整的响应。


####public
如果响应被标记为“public”，浏览器和任何中继缓存均可以将响应缓存下来，“public”不是必需的，因为明确的缓存信息（例如“max-age”）已表示响应是可以缓存的。

####private

浏览器可以缓存“private”响应。不过，这些响应通常只为单个用户缓存，因此不允许任何中间缓存对其进行缓存。例如，用户的浏览器可以缓存包含用户私人信息的 HTML 网页，但 CDN 却不能缓存。



####如何更新缓存的响应

浏览器发出的所有 HTTP 请求会首先路由到浏览器缓存，以确认是否缓存了可用于满足请求的有效响应。如果有匹配的响应，则从缓存中读取响应，这样就避免了网络延迟和传送产生的流量费用。

1.在资源“过期”之前，将一直使用本地缓存的响应。
2.您可以通过在网址中嵌入文件内容指纹，强制客户端更新到新版本的响应。


####实战篇

假定您已告诉访问者将某个 CSS 样式表缓存长达 24 小时 (max-age=86400)，但设计人员刚刚提交了一个您希望所有用户都能使用的更新。您该如何通知拥有现在“已过时”的 CSS 缓存副本的所有访问者更新其缓存？

######在不更改资源网址的情况下，做不到。这就涉及部署的问题。

只能缓存的版本将一直使用到过期或者用户清除了浏览器缓存

####部署之缓存套路

您可以在资源内容发生变化时更改它的网址，强制用户下载新响应。通常情况下，可以通过在文件名中嵌入文件的指纹或版本号来实现
，这其实就是涉及到网站部署的问题。我们可以采用非覆盖式发布。


![名字+Hash值, 这些构建工具都能实现，比如webpack ](http://upload-images.jianshu.io/upload_images/1899643-6d91c47b1d5dbc38.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样不但可以控制每个响应的缓存时间，还可以控制访问者看到新版本的速度。

HTML 被标记为“no-cache”，这意味着浏览器在每次请求时都始终会重新验证文档，并在内容变化时获取最新版本。这样内嵌的资源发生改变都会重新请求。

CSS 设置为 1 年后到期。请注意，您可以放心地使用 1 年的“远期过期”，因为您在文件名中嵌入了文件的指纹：CSS 更新时网址也会随之变化。

JavaScript 同样设置为 1 年后到期，但标记为 private，这或许是因为它包含的某些用户私人数据是 CDN 不应缓存的。

图像缓存时不包含版本或唯一指纹，并设置为 1 天后到期。

您可以组合使用 ETag、Cache-Control 和唯一网址来实现一举多得：较长的过期时间、控制可以缓存响应的位置以及随需更新。



本文部分借鉴
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn