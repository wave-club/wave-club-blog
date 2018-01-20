# 一、什么是虚拟DOM？

render执行的结果得到的并不是真正的DOM节点，结果仅仅是轻量级的JavaScript对象，我们称之为virtual DOM。



 虚拟DOM是React的一大亮点，具有batching(批处理)和高效的Diff算法。这让我们可以无需担心性能问题而”毫无顾忌”的随时“刷新”整个页面，由虚拟 DOM来确保只对界面上真正变化的部分进行实际的DOM操作。



# 二、虚拟DOM VS 直接操作原生DOM？

如果没有 Virtual DOM，简单来说就是直接重置 innerHTML。这样操作，在一个大型列表所有数据都变了的情况下，还算是合理，但是，当只有一行数据发生变化时，它也需要重置整个 innerHTML，这时候显然就造成了大量浪费。

比较innerHTML 和Virtual DOM 的重绘过程如下：

innerHTML: render html string + 重新创建所有 DOM 元素

Virtual DOM: render Virtual DOM + diff** **+ 必要的 DOM 更新

​        和 DOM 操作比起来，js 计算是非常便宜的。Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是，它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。当然，曾有人做过验证说React的性能不如直接操作真实DOM，代码如下：



```javascript
function Raw() {
    var data = _buildData(),
        html = "";
    ...
    for(var i=0; i<data.length; i++) {
        var render = template;
        render = render.replace("{{className}}", "");
        render = render.replace("{{label}}", data[i].label);
        html += render;
    }
    ...
    container.innerHTML = html;
    ...
}
```



​        该测试用例中虽然构造了一个包含1000个Tag的String，并把它添加到DOM树中，但是只做了一次DOM操作。然而，在实际开发过程中，这1000个元素更新可能分布在20个逻辑块中，每个逻辑块中包含50个元素，当页面需要更新时，都会引起DOM树的更新，上述代码就近似变成了如下格式：



```javascript
function Raw() {
    var data = _buildData(), 
        html = ""; 
    ... 
    for(var i=0; i<data.length; i++) { 
        var render = template; 
        render = render.replace("{{className}}", ""); 
        render = render.replace("{{label}}", data[i].label); 
        html += render; 
        if(!(i % 50)) {
            container.innerHTML = html;
        }
    } 
    ... 
}
```

  这样来看，React的性能就远胜于原生DOM操作了。

​        而且，DOM 完全不属于Javascript (也不在Javascript 引擎中存在).。Javascript 其实是一个非常独立的引擎，DOM其实是浏览器引出的一组让Javascript操作HTML文档的API而已。在即时编译的时代，调用DOM的开销是很大的。而Virtual DOM的执行完全都在Javascript 引擎中，完全不会有这个开销。

​        React.js 相对于直接操作原生DOM有很大的性能优势， 很大程度上都要归功于virtual DOM的batching 和diff。batching把所有的DOM操作搜集起来，一次性提交给真实的DOM。diff算法时间复杂度也从[标准的的Diff算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)的O(n^3)降到了O(n)。这里留到下一次博客单独讲。

# 三、虚拟DOM VS MVVM？

 

 相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的 O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

- 脏检查：scope digest** **+ 必要 DOM 更新
- 依赖收集：重新收集依赖 + 必要 DOM 更新

​        可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。
​        MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。
​        Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: [dbmon](http://vuejs.github.io/js-repaint-perfs/) (注意 Angular 默认版本无优化，优化过的在下面）

​        在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

（该段落借鉴了知乎的相关回答）

# 四、对React虚拟DOM的误解？

​        React 从来没有说过 “React 比原生操作 DOM 快”。React给我们的保证是，在不需要手动优化的情况下，它依然可以给我们提供过得去的性能。

​        React掩盖了底层的 DOM 操作，可以用更声明式的方式来描述我们目的，从而让代码更容易维护。下面还是借鉴了知乎上的回答：没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。

##为什么虚拟DOM更胜一筹

注意：虚拟DOM只是实现MVVM的一种方案，或者说是视图更新的一种策略。没有虚拟DOM比MVVM更好一说。

我们回顾传统MVC框架,如backbone,它是将某个模板编译成模板函数,需要更新时,是自己手动将数据整体传入模板函数,得到一个字符串,使用innerHTML刷新某个容器!注意,这里其实可以优化,但由于是手动,是体力活,都是使用很粗放型的innerhTML了事(使用jQuery的html方法性能会更差,不过好处是它处理了IE下的innerHTML BUG及全平台的无法执行内部的script标签的BUG)  由于整体替换,一下子销毁这么多元素(有时还绑着事件,可能导致GC出问题),又要插入这么多元素,再重新绑定事件(这个可以使用事件代理缓解)  因此性能非常差

方案二是使用脏检测的angular,要求对所有作用域对象进行diff,使用通知刷新函数进行视图更新. 页面上的指令越多,需要比较的数据越多(有循环, 需要乘以数组长度或对象键值对个数),可能用于循环时间过长导致页面假死

方案三使用avalon这样的密封舱方案(船底是分成一个个独立的区域,局部受损也不会导致沉船).avalon使用Object.defineProperty及VBS实现属性监控, 这样用户修数据时,就能立即进入。事件总线系统(观察者模式), 然后取得与这属性相关联的订阅者数组(换言之的密封舱,不像ng那样,一个$scope对象就一个$$watcher数组).

而一般情况下,VM中的某个属性在视图中也只会用到几个位置,那么几个位置,就会生成几个绑定对象,都放在相应的订阅者数组中,每个订阅者数组都不会太长.因此同步视图,不会因此遍历的数组过长而假死.因此ng在处理2000个指令的页面时就易出问题 (一个grid,往往有两三重循环,很容就飙到5000个指令),而avalon的密封舱方案是能撑到12000个指令。但avalon需要保存大量的绑定对象,并且将普通属性转换访问器属性,也需要占用内存,这是一个以空间换时间的方案.

不过avalon在处理ms-repeat, ms-with, ms-each这个循环绑定时,也实现得不太好,这其中要生成大量的代理VM,整个页面都在生成销毁VM中拖慢了(即便使用各种池子进行循环再用).

方案四,像knockout那样, 使用时让用户痛苦一些,使用可同步视图的东西用函数(wrapper)包裹起来,刷新视图,就只需要重新调用这个wrapper.现在所有新的MVVM都是从ko那里学到依赖收集.这个wraper会通知其依赖的wrapper,通过极其痛苦晦涩的方式进入事件总线, 执行视图刷新函数. knockout是使用闭包用到极致的库,显然这样做性能也很差.

最后react, 首先使用编译手段(jsx的虚拟DOM转换), 将这部分消耗能提前释放出去,不过将字符串(jsx模板)转换为一个个JS对象,也占不了多少内存. 然后是数据发生变动时,由于数据变动都是需要用setState方法,因此兼容性很好,少了Object.defineProperty或wrapper的消耗,然后对应数据通过render转换成字符串,字符串再转换虚拟DOM树。前后虚拟DOM进行比较, 更新视图.

react是面向组件设计, 一个组件就是一个密封舱, 很少会对所有虚拟DOM进行比较, 由于强制使用单向流动, 减少每次变动需要的diff.  没有绑定对象与wrapper的内存占用高的问题.

react的流行，只是ng太难用了，当ng或其他MVVM改用虚拟DOM进行视图更新，这优势就不需要！

react的问题很明显，库非常大，它基本上离开了jsx换转器就活不成。 这么大的库， 换言之大家能对它改动的地方就越多，每升一个版本就数千改动。作为架构师的我们，需要对其源码进行非常熟悉的了解，要不出了问题无法自己处理，每次等外国人回复就迟了。

react的复杂度，很易触发大家对它的重构，即便占有方有向前兼容的愿望，但能抵得几次诱惑呢，因此经过几个版本会面目全非。如果你坚持不变，那么其他人就会另起山头，
开源的东西很易出现一个更优势的仿品！react的实现很糟糕的，强在设计！

虚拟DOM的难点是如何将一个字符串变成一个模板函数，然后再转换为虚拟DOM。 目前没有简单的HTML parser实现，stackoverflow上说不能使用几行正则就能拆分HTML！
因此这个高门槛，导致react的代替方案难产！github上有许多自称使用了虚拟DOM的框架，不是假的就是超垃圾的实现！更何况react支持自定义标签，因此不单是解析HTML的问题了，需要对自定义标签进行更多的处理！

--摘自2篇文章