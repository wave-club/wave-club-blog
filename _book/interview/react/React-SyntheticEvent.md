# React 综合事件 SyntheticEvent



本参考指南记录了`SyntheticEvent`构成React事件系统一部分的包装器。请参阅[处理事件](https://reactjs.org/docs/handling-events.html)指南了解更多信息。

## 概观

您的事件处理程序将被传递`SyntheticEvent`给浏览器本地事件的一个跨浏览器包装的实例。它具有与浏览器的本地事件相同的界面，包括`stopPropagation()`和`preventDefault()`除了所有浏览器上的事件相同。

如果您发现由于某种原因需要底层的浏览器事件，只需使用该`nativeEvent`属性即可获取。每个`SyntheticEvent`对象都有以下属性：

```java
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> 注意：
>
> 从v0.14开始，`false`从事件处理程序返回将不再停止事件传播。相反，`e.stopPropagation()`或者`e.preventDefault()`应该手动触发。

### 事件池

将`SyntheticEvent`被合并。这意味着该`SyntheticEvent`对象将被重用，并且在调用事件回调之后，所有的属性将被取消。这是出于性能原因。因此，您不能以异步方式访问该事件。

```jsx
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> 注意：
>
> 如果要以异步方式访问事件属性，则应调用`event.persist()`该事件，该事件将从池中移除合成事件，并允许用户代码保留对事件的引用。

## 支持的事件

React使事件标准化，以便它们在不同浏览器中具有一致的属性。

下面的事件处理程序由冒泡阶段的事件触发。要为捕获阶段注册事件处理程序，请附加`Capture`到事件名称; 例如，而不是使用`onClick`，您将使用`onClickCapture`处理捕获阶段中的点击事件。

- [剪贴板事件](https://reactjs.org/docs/events.html#clipboard-events)
- [作曲活动](https://reactjs.org/docs/events.html#composition-events)
- [键盘事件](https://reactjs.org/docs/events.html#keyboard-events)
- [焦点事件](https://reactjs.org/docs/events.html#focus-events)
- [表格事件](https://reactjs.org/docs/events.html#form-events)
- [鼠标事件](https://reactjs.org/docs/events.html#mouse-events)
- [选择事件](https://reactjs.org/docs/events.html#selection-events)
- [触摸事件](https://reactjs.org/docs/events.html#touch-events)
- [UI事件](https://reactjs.org/docs/events.html#ui-events)
- [车轮事件](https://reactjs.org/docs/events.html#wheel-events)
- [媒体活动](https://reactjs.org/docs/events.html#media-events)
- [图像事件](https://reactjs.org/docs/events.html#image-events)
- [动画事件](https://reactjs.org/docs/events.html#animation-events)
- [过渡事件](https://reactjs.org/docs/events.html#transition-events)
- [其他事件](https://reactjs.org/docs/events.html#other-events)

------

## 参考

### 剪贴板事件

活动名称：

```json
onCopy onCut onPaste
```

属性：

```
DOMDataTransfer clipboardData

```

------

### 作曲活动

活动名称：

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

属性：

```
string data

```

------

### 键盘事件

活动名称：

```
onKeyDown onKeyPress onKeyUp
```

属性：

```java
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

该`key`属性可以采用[DOM Level 3 Events规范中](https://www.w3.org/TR/uievents-key/#named-key-attribute-values)记录的任何值。

------

### 焦点事件

活动名称：

```
onFocus onBlur
```

这些关注事件适用于React DOM中的所有元素，而不仅仅是表单元素。

属性：

```
DOMEventTarget relatedTarget

```

------

### 表格事件

活动名称：

```
onChange onInput onInvalid onSubmit
```

有关onChange事件的更多信息，请参见[表单](https://reactjs.org/docs/forms.html)。

------

### 鼠标事件

活动名称：

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

在`onMouseEnter`与`onMouseLeave`从元件事件被传播到左侧被输入，而不是普通的鼓泡之一，没有捕捉阶段。

属性：

```
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey

```

------

### 选择事件

活动名称：

```
onSelect
```

------

### 触摸事件

活动名称：

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

属性：

```
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches

```

------

### UI事件

活动名称：

```
onScroll
```

属性：

```
number detail
DOMAbstractView view

```

------

### 车轮事件

活动名称：

```
onWheel
```

属性：

```
number deltaMode
number deltaX
number deltaY
number deltaZ

```

------

### 媒体活动

活动名称：

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

------

### 图像事件

活动名称：

```
onLoad onError
```

------

### 动画事件

活动名称：

```
onAnimationStart onAnimationEnd onAnimationIteration
```

属性：

```
string animationName
string pseudoElement
float elapsedTime

```

------

### 过渡事件

活动名称：

```
onTransitionEnd
```

属性：

```
string propertyName
string pseudoElement
float elapsedTime
```

------

### 其他事件

活动名称：

```
onToggle
```