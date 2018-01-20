# 调用**setState**时会发生什么？

当调用setState时，React会做的第一件事是将传递给setState的对象合并到组件的当前状态。



这将启动一个称为和解的过程。和解的最终目标是以最有效的方式，根据这个新的状态更新UI。

为此，React将构建一个React元素的新树（您可以将其视为UI的对象表示）。

一旦有了这棵树，为了弄清UI如何响应新的状态而改变，React会将这个新树与之前的元素树相比较。

通过这样做，React将会知道发生的确切变化，并通过了解发生什么变化，只有在绝对必要的情况下进行更新才能最大限度地减少UI的占用空间。



翻译自 https://tylermcginnis.com/react-interview-questions/