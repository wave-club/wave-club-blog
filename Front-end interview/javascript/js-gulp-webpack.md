# 前端构建工具的区别与联系



前端自动化构建工具，我个人将其分为两类：构建工具、模块化工具。但由于模块化工具的功能越来越丰富，两者之间的界限也越来越模糊。
构建工具主要有：Gulp和Grunt
模块化工具主要有：Webpack、Browserify，以及浏览器端的模块化实现SeaJs、RequireJs

- 构建工具
  - Gulp：Gulp的处理过程，可以简化为，以流的形式读入文件 -> 文件流在各个处理函数之间流转处理 -> 输出文件。Gulp可以定义一系列任务，如压缩代码、预编译代码、压缩图片、生成图片雪碧图、CSS自动补全等，只要事先编写好这些任务，每次发布前只需要在命令行敲一行代码就能完成构建。当然，也可以在Gulp使用Webpack和Browserify。
  - Grunt：Grunt与Gulp的功能类似，两者最大的区别就是，Grunt处理过程中会产生多个中间态文件，有多次I/O操作，效率比较低；而Gulp只需要一次I/O操作，中间过程都是文件流在各任务之间流转，效率较高。其他方面，相较于Grunt，Gulp的API设计更加简洁、易学，并且遵从unix的设计哲学，处理过程更加清晰。
- 模块化工具
  - 本地模块化
    1. Webpack：WebPack只是一种模块化的解决方案，但由于其加载器（loaders）的存在，使WebPack可以在打包文件之前，对原始文件做预处理。WebPack的处理过程可以简化为，给定一个入口文件，从该文件开始找到项目的所有依赖，并用loaders处理这些文件，最后打包成浏览器可执行的JavaScript文件。Gulp和WebPack有很多重叠功能，但处理问题的思路差别很大；Gulp更关注过程，明确地先做什么，再做什么，而WebPack更关注模块划分以及模块之间的依赖关系。
    2. Browserify：Browserify与WebPack的功能类似；它也是基于文件流的，更适合与Gulp结合使用；相较于WebPack，Browserify能够对处理过程做更精细的控制，而WebPack相对更加‘黑盒’。还有就是WebPack的生态要比Browserify好得多。
  - 浏览器端模块化
    1. SeaJs：SeaJs定义了define、module、exports、require等函数，使浏览器内可以执行加载模块的语法（本质上是在页面内插入新的script标签，加载模块js）。
    2. RequireJs：RequireJs与SeaJs的功能基本相同，但RequireJs遵从AMD规范，而SeaJs遵从CMD规范；并且两者异步加载的js的执行时机也有差别。