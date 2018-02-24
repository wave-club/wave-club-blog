## webServer SSO 原理及实现



>凡事总须研究，才会明白。古来常做登录，我也还记得，可是不甚清楚。我横竖睡不着，仔细看了半夜。



![sso.png](http://upload-images.jianshu.io/upload_images/1899643-35170d20c87f026a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####begin start login , 先聊下cookie和session

cookie 有个 **http only **告知浏览器，Cookies 的内容不允许被客户端的脚本访问,只用于http,看下图


![httpOnly .png](http://upload-images.jianshu.io/upload_images/1899643-f8c7bb1d4e184ac8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



####Cookie和Session 的关系

就如大众所知，HTTP 协议是无状态的 。要想分辨每次http请求是哪个用户，需要使用Cookie和Session Session 的中文翻译为：「会话」

Set-Cookie
服务器管理状态使用到的字段，用于响应首部一则响应首部的 Set-Cookie 字段：(看第一张图。)

    set-Cookie: status=enable;expires= Tue, 05 Jul 2018 07:26:31 GMT;path=/;domain=.xxxx;HttpOnly 


 ![Cookie-Session.png](http://upload-images.jianshu.io/upload_images/1899643-a1ba28c9a2eff32f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



####普通的登录
 普通的登录，要的就是一个登录页面，输入账号密码，提交Form表单，后端查询数据库对应用户名的密码，匹配正确则把用户记录到Session，不正确则返回错误。
但可能他没有教你的是，密码需要hash加密 。下图的网站没加

![lang.png](http://upload-images.jianshu.io/upload_images/1899643-d4d9dbda7cd2b49e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


>**密码Hash**密码hash，就是存进数据库的密码是一串密文，密文是明文密码通过不可逆算法得出的。在Nodejs中，你可以使用[bcryptjs](https://www.npmjs.com/package/bcryptjs)，它提供了hash
>以及对应的compare
>方法，非常适合用于密码的加密和对比。
>有bcrypt项目使用地址

https://github.com/976500133/codebeauty/blob/d4228005bac6ba85e034e5281bf216a2a008db8e/lib/schemas/user.js


####单点登录的2种方式
单点登录说白了就是在站点A的登录了，那么用户就自动在站点B、站点C、站点E登录了。**这里说的是2个跨域的域名,基础域名不需要单点登录技术，直接通过path ， domain 可以解决**


####1.JSONP的实现方式

用户在父应用中登录后，Cookie会存到客户端中，当用户需要登录子应用的时候，授权应用访问父应用提供的JSONP接口，并在请求中带上父应用域名下的Cookie。


![jsonp.png](http://upload-images.jianshu.io/upload_images/1899643-19d9e913441adca8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这种做法是cookie 的安全性问题。安全问题放在了前端

####2.302 重定向的方式


父应用提供一个GET方式的登录接口，用户通过子应用302重定向连接的方式访问这个接口，如果用户还没有登录，则返回一个的登录页面，用户输入账号密码进行登录。如果用户已经登录了，则告知子应用登录当前用户的状态。并返回相应信息

![302.png](http://upload-images.jianshu.io/upload_images/1899643-c460cf8989ec1c02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



####普通的cookie 识别，只适合不跨域的情况！

最简单的是使用cookie作为媒介，存放用户凭证。用户登录父应用之后，应用返回一个cookie，当用户访问子应用的时候，携带上这个cookie，校验通过则登录当前用户。

![normal.png](http://upload-images.jianshu.io/upload_images/1899643-ddd957e1a20eaeb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


