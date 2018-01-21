## Markdown的江湖之自定义 （扩展）



通关简书，目前没有一篇关键marked 扩展的文章，然而2017年，markdown 已经火的不得了不得了不得了了，连前美利坚总统__傲巴马__都用markdow写文件。

不管客官身处何时何地，如果你想写作，Markdown 无疑是一个既美观又方便的选择。


![江湖的江湖](http://upload-images.jianshu.io/upload_images/1899643-c951099bc798038f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


留文不留种，菊花赵信捅，为杜绝各位客官坟头烧报纸，糊弄鬼的思想， 特娇喘献上（跑步回来想起）marked的下载地址https://github.com/976500133/markedExtend


######很喜欢胡狼视频中的一句话

>人在江湖，身不由己，你不杀我，我便杀你，你看淡人间繁华，但是别人追求荣华富贵，你虽然不挡道，但是你占尽功名利禄，你不死，荣耀便始终缠绕在你身上，别人也便无从享受。

####1.markdown 和 marked 的区别


markdown是一个面向写作的语法引擎，是文本标记语言。 markdown 本身使用的是markdown这个module 的解析器，然而支持的标记不能满足市场的需求，后续对markdown 的解析module层出不穷，最出名的就属marked 。所以 marked 是对markdown标记的解析器。实质是就是多markdown 标记扩展



####2.markdown的扩展

1.首先你需要对marked 源码进行 fork 一份或者clone 一份到本地,代码在lib/marked.js 里面(要先安装git 环境)



![clone.png](http://upload-images.jianshu.io/upload_images/1899643-60db308735ec07f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



我需要自定义ininput 

要使用自定义标签，首先是要匹配到我们自定义的标签，然而正则可以是这样的



![inline.gfm.png](http://upload-images.jianshu.io/upload_images/1899643-4fe17394e3de462b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


    inline.gfm = merge({}, inline.normal, {
      escape: replace(inline.escape)('])', '~|])')(),
      url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
      del: /^~~(?=\S)([\s\S]*?\S)~~/,
      ininput: /^~([A-Za-z0-9_\-\+\u4e00-\u9fa5]+?)~/, //新增匹配
      text: replace(inline.text)
        (']|', '~]|')
        ('|', '|https?://|')
        ()
    });

简述代码高亮真不好看。


marked 对找到的正则匹配到的需要render , 修改<code>Renderer</code>，增加方法





![renderIninput.png](http://upload-images.jianshu.io/upload_images/1899643-18857f12fc603edb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


    Renderer.prototype.ininput = function (ininput) {
        return '<input style="width:' + (ininput.split('-')[0] || '100' ) 
            + 'px" type="text" class="form-control question-input" value="' 
            + (ininput.split('-')[2] || '' ) +'" placeholder=" ' 
            + (ininput.split('-')[1] || '' ) + ' " />';
    };



最后是修改InlineLexer,在匹配到时将其Compiling，还有一个marked.parse ，这里没用到。 




![解析.png](http://upload-images.jianshu.io/upload_images/1899643-db2c286e16fb72fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



        // ininput (gfm)
        if (cap = this.rules.ininput.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.ininput(this.output(cap[1]));
        continue;
      }




好了。以上3处地方替换，你也就扩展了一个markdown 标记。用法是这样的。


>~120-请输入姓名-刘某某~ 

  >其中120代表输入框的宽度 ， 请输入姓名 代表的是placeholder, 某某是真正的值， -某某可以不写
  >可以做填空用，当然你也可以把输入框替换成图片显示，根据输入的不同值显示不同的表情或图片，css 你可以随意
  > ######好了。enjoy it! ( 能否理解成享受IT 带来的便捷 )


![输入预览图.png](http://upload-images.jianshu.io/upload_images/1899643-de273e0672e3cfa2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#发福利拉 





新时代 Txt 轻量级web富文本框 , 使用简单， 所见即所得，增加目录功能，下载既可用，在demo 打开，喜欢就star吧！

https://github.com/976500133/Txt


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-8955bdf8ecefdc50.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)