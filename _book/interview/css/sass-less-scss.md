## Sass Less SCSS 的抉择



#### 有2个CSS预处理器可供选择：

1.Less [http://lesscss.org/](http://lesscss.org/)

2.Sass [http://sass-lang.com/](http://sass-lang.com/)

他们都已经存在了好几年了。我们要使用**Sass**。



#### Sass 和 Scss 的区别

Sass有两种**语法**可用

sass 本身 后缀是`.sass`的文件

scss `.scss`，这是正常CSS和Sass之间的一部分



#### 记住：

- Sass是预处理器的名称
- SCSS更容易学习
- 互联网上的所有资源（如[Sass Way](http://thesassway.com/)）都提到Sass，而不是SCSS
- 所有功能都可用于两种语法
- SCSS中的所有内容都可在Sass中找到

我们实际上要写**SCSS，**但仍称之为**Sass**。



#### 为什么选择SCSS

我们要使用**SCSS**有几个原因：

- **可读性**：语法与CSS非常相似
- **学习曲线**：它仅在CSS之上增加了一些附加功能
- **兼容性** ; CSS文件是一个有效的SCSS文件
- **资源**：大量的在线文章阅读和开源库使用
- **可扩展性**：从SCSS到Sass很容易



#### 特点

- **变量**：而不是重复`#fce473`整个CSS文件，只需设置`$yellow: #fce473`一次
- **嵌套**：CSS规则可以彼此嵌套
- **mixins**：可以接受参数的自定义函数，并且将防止无用的重复
- **扩展名**：一种简单的方法来继承另一个选择器的相同属性
- **运算符**：添加/减法/乘法/除法，如`960px / 4`或`$space * 2`



#### 安装Sass

前往[http://sass-lang.com/install](http://sass-lang.com/install)，在您的计算机上安装Sass。

