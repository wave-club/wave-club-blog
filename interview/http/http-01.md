## 前端性能毫秒必争综合方案

1.减少http请求次数

2.避免页面重定像

当客户端收到服务器的跳转回复时，客户端再次根据服务器回复中的location指定的地址再次发送请求，例如以下跳转回复。

      HTTP/1.1 301 Moved Permanently
      Location: http://example.com/newuri
      Content-Type: text/html

当客户端遇到这种回复的时候，用户只能等待客户端再次发送请求，有的网站甚至会一直跳n次，跳到他想带你去的地方…当然在这个时候用户看不到任何页面内容，只有浏览器的进度条一直在刷新。
3.缓存http请求