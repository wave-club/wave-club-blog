# [Safari] Unexpected keyword 'const'. Const declarations are not supported in strict mode.



不支持safari 内核的浏览器

解决办法是：



![](../assets/webpack-dev-server-error.png)





<https://github.com/webpack/webpack-dev-server#caveats>

- Version 2.8.0 introduced a change which included ES6 keywords const and let
- Those wishing to support oldIE should stick with version 2.7.1



解决办法是 运行如下命令， 是版本不兼容导致的



cnpm i webpack-dev-server@2.7.1 --save