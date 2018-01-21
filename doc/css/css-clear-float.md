# css 清除浮动

请解释一下为什么需要清除浮动？清除浮动的方式



清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

```css
  1、父级div定义height；
  2、父级div 也一起浮动；
  3、常规的使用一个class；
  	.clearfix::before, .clearfix::after {
  	    content: " ";
  	    display: table;
  	}
  	.clearfix::after {
  	    clear: both;
  	}
  	.clearfix {
  	    *zoom: 1;
  	}

  4、SASS编译的时候，浮动元素的父级div定义伪类:after
  	&::after,&::before{
  	    content: " ";
          visibility: hidden;
          display: block;
          height: 0;
          clear: both;
  	}

  解析原理：
  1) display:block 使生成的元素以块级元素显示,占满剩余空间;
  2) height:0 避免生成内容破坏原有布局的高度。
  3) visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;
  4）通过 content:"."生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,一丝冰凉是不推荐这样做的,firefox直到7.0 content:”" 仍然会产生额外的空隙；
  5）zoom：1 触发IE hasLayout。

  通过分析发现，除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，这也就是其他版本的闭合浮动为什么会有font-size：0，line-height：0。
  
```