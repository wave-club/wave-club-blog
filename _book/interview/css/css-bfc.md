### 块级格式化上下文bfc有什么用



创建规则：

1. 根元素
2. 浮动元素（float不是none）
3. 绝对定位元素（position取值为absolute或fixed）
4. display取值为inline-block,table-cell, table-caption,flex, inline-flex之一的元素
5. overflow不是visible的元素

作用：

1. 可以包含浮动元素
2. 不被浮动元素覆盖
3. 阻止父子元素的margin折叠



**display,float,position的关系**

1. 如果display为none，那么position和float都不起作用，这种情况下元素不产生框
2. 否则，如果position值为absolute或者fixed，框就是绝对定位的，float的计算值为none，display根据下面的表格进行调整。
3. 否则，如果float不是none，框是浮动的，display根据下表进行调整
4. 否则，如果元素是根元素，display根据下表进行调整
5. 其他情况下display的值为指定值 总结起来：**绝对定位、浮动、根元素都需要调整display**

**外边距折叠 ** **(collapsing margins)**

毗邻的两个或多个margin会合并成一个margin，叫做外边距折叠。规则如下：

1. 两个或多个毗邻的普通流中的块元素垂直方向上的margin会折叠
2. 浮动元素/inline-block元素/绝对定位元素的margin不会和垂直方向上的其他元素的margin折叠
3. 创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠
4. 元素自身的margin-bottom和margin-top相邻时也会折叠



**如何确定一个元素的包含块 **(containing block)

1. 根元素的包含块叫做初始包含块，在连续媒体中他的尺寸与viewport相同并且anchored at the canvas origin；对于paged media，它的尺寸等于page area。初始包含块的direction属性与根元素相同。

2. position为relative或者static的元素，它的包含块由最近的块级（display为block,list-item, table）祖先元素的**内容框**组成

3. 如果元素position为fixed。对于连续媒体，它的包含块为viewport；对于paged media，包含块为page area

4. 如果元素position为absolute，它的包含块由祖先元素中最近一个position为relative,absolute或者fixed的元素产生，规则如下：

5. - 如果祖先元素为行内元素，the containing block is the bounding box around the **padding boxes** of the first and the last inline boxes generated for that element.
   - 其他情况下包含块由祖先节点的**padding edge**组成

6. 如果找不到定位的祖先元素，包含块为**初始包含块**



**stacking context,** **布局规则**

z轴上的默认层叠顺序如下（从下到上）：

1. 根元素的边界和背景
2. 常规流中的元素按照html中顺序
3. 浮动块
4. positioned元素按照html中出现顺序

如何创建stacking context：

1. 根元素
2. z-index不为auto的定位元素
3. a flex item with a z-index value other than 'auto'
4. opacity小于1的元素
5. 在移动端webkit和chrome22+，z-index为auto，position: fixed也将创建新的stacking context

