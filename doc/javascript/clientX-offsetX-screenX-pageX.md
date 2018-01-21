# event中的[clientX,offsetX,screenX,pageX]

### clientX clientY

###### event.clientX

###### event.clientY

client直译就是客户端，客户端的窗口就是指游览器的显示页面内容的窗口大小（不包含工具栏、导航栏等等）。

event.clientX、event.clientY就是用来获取鼠标距游览器显示窗口的长度。

![](./assets/client.png)

client范围

兼容性：IE和主流游览器都支持。

#### offsetX offsetY



event.offsetX
event.offsetY

offset意为偏移量，是被点击的元素距左上角为参考原点的长度，而IE、FF和Chrome的参考点有所差异。

Chrome下，offsetX offsetY是包含边框的，如图所示。



![](./assets/offset1.png)





chrome下的offset参考点

而IE、FF是不包含边框的，如果鼠标进入到border区域，为返回负值，如图所示。

![](./assets/offset2.png)

IE、FF下的offset参考点

兼容性：IE9+,chrome,FF都支持此属性。

#### screenX screenY

event.screenX
event.sreenY

screen顾名思义是屏幕，是用来获取鼠标点击位置到屏幕显示器的距离，距离的最大值需根据屏幕分辨率的尺寸来计算。

如果是分屏 或者 多屏幕的话。 event.screenX 和 event.sreenY 都会叠加



比如screen1 screen2 按顺序排列， 在screen1 上 1280 。 在screen2 上的宽度  等于screen1 + screen2.screenX 

兼容性：所有游览器都支持此属性。

#### pageX pageY

event.pageX
event.pageY

page为页面的意思，页面的高度一般情况**client游览器**显示区域装不下，所以会出现垂直滚动条。

鼠标距离页面初始page原点的长度。

![img](./assets/page.png)

在IE中没有pageX、pageY取而代之的是event.x、evnet.y。x和y在webkit内核下也实现了，所以火狐不支持x，y。

兼容性：IE不支持，其他高级游览器支持。

- offsetWidth/offsetHeight返回值包含**content + padding + border**，效果与e.getBoundingClientRect()相同
- clientWidth/clientHeight返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
- scrollWidth/scrollHeight返回值包含**content + padding + 溢出内容的尺寸 **