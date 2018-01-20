# 什么是Cookie 隔离？

或者说：请求资源的时候不要让它带cookie怎么做



```javascript
  如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
  所以不如隔离开。

  因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
  这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

  同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
  提高了webserver的http请求的解析速度。
```