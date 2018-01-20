## defer 与 async
![logo.png](http://upload-images.jianshu.io/upload_images/1899643-a22df5924a166333.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####什么是defer 和 async

####众所周知

当解析器遇到 script 标签时，文档的解析将停止，并立即下载并执行脚本，脚本执行完毕后将继续解析文档
然而可是用但是来形容，如果我们把脚本标记为 defer，这样就不会停止文档解析，只有等到文档解析完成才执行脚本，当然也可以将脚本标记为 async，以便由其他线程对脚本进行解析和执行。

______

####先贴代码

    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div>正文正文正文正文</div>

        <script>
            console.log('开始下载脚本' + new Date())
        </script>

        <script  src="https://www.youtube.com/yts/jsbin/player-vfld8zR1S/zh_CN/base.js"></script>

        <script>
            console.log('结束下载脚本'+ new Date())
        </script>

        <style>
            body {
                background-color: red;
            }
        </style>
        <script>
            console.log('执行背景色变红'+ new Date())
        </script>
    </body>
    </html>

####效果图预览
故意弄了个需要翻的js

![normal@2x.png](http://upload-images.jianshu.io/upload_images/1899643-62a8aef1a3983f8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####这说明了
**当**我没有加defer的时候，后面的js 不执行。
____
####defer 推迟
**当**解析器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，待到文档解析完成，脚本才会执行。
通俗的意思是
最后执行，其他文件依赖defer 文件肯定不行
____


####async 异步
____
**当**解析器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，脚本下载完成后开始执行脚本，脚本执行的过程中文档将停止解析，直到脚本执行完毕。
通俗的意思是
啥时候下载完啥时候文档将停止解析，直到脚本执行完毕后，继续执行脚本
____
#### defer 和 async我能用的上？
**扪**心自问，用的少
如果脚本不依赖于任何脚本，并不被任何脚本依赖，那么可以使用 defer。
如果脚本是模块化的，不依赖于任何脚本，那么可以使用 async。


____

####FBI WARNING

**async** 对于内联脚本没有作用。
defer 不应该在内联脚本上使用。
defer 的脚本是按照声明顺序执行的。而 async 的脚本不同，只要脚本下载完成，将会立即执行，未必会按照声明顺序执行。
IE9 及以下版本的浏览器，defer 的脚本也未必会按照声明顺序执行。
如果同时使用 defer 和 async，则会默认使用 async，忽略 defer。

####由此推测，可以用。