# 如何实现一个 Git Diff 解析器



![如何实现一个 Git Diff 解析器](https://gw.alicdn.com/tfs/TB1_6wnRXXXXXbwXFXXXXXXXXXX-900-500.jpg)

代码审阅中一个重要功能是对两个 commit 进行 diff 并展示到页面中，这篇文章将尝试总结其实现过程。

## 解析 Git Diff

想要展示 diff，首先需要将 Git 提供的 diff 格式解析成结构化数据（比如：JSON）。

### 基本格式

一个基本的 Git Diff 格式如下：

```html
diff --git a/f1 b/f1
index 6f8a38c..449b072 100644
--- a/f1
+++ b/f1
@@ -1,7 +1,7 @@
 1
 2
 3
-a
+b
 5
 6
 7
```

第一行是 Git Diff 的 header，进行比较的是 a 版本的 f1（变动前）和 b 版本的 f1（变动后）。

第二行是两个版本的 hash 值以及文件模式（100644 表示是文本文件）。

第三、四行表示进行比较的两个文件，`---` 表示变动前的版本，`+++` 表示变动后的版本。

第五行是一个 thunk header（可能会有多个），提供变动的”上下文“（context），`-1,7`表示接下来展示变动前文件第一至第七行，`+1,7` 表示接下来展示变动后文件第一至第七行。

接下来的几行就是具体的变动内容。它将两个文件的上下文合并显示在一起，每一行前面是一个标志位，`''`（空）表示无变化（是一个上下文行）、`-` 表示变动前文件删除的行、`+`表示变动后文件新增的行。可以看出此次变动，文件 f1 的第 4 行内容从 `a` 变为了 `b`。

### 扩展 header

在第一行 header 之后有可能包含如下的几种扩展 header：

```jsx
old mode <mode>
new mode <mode>

deleted file mode <mode>
new file mode <mode>

copy from <path>
copy to <path>

rename from <path>
rename to <path>

similarity index <number>
dissimilarity index <number>
index <hash>..<hash> <mode>
```

### 新增、删除、复制、重命名

新增、删除、复制、重命名文件的 Git Diff 格式有些不同，解析时需要特别注意。

新增：

```jsx
diff --git a/file b/file
new file mode 100644
index 0000000..53bffd7
--- /dev/null
+++ b/file
```

删除：

```jsx
diff --git a/file b/file
deleted file mode 100644
index 53bffd7..0000000
--- a/file
+++ /dev/null
```

复制：

```jsx
diff --git a/a b/b
copy from a
copy to b
--- a/a
+++ b/b
```

重命名：

```jsx
diff --git a/a b/b
rename from a
rename to b
--- a/a
+++ b/b
```

在新增和删除时，`diff --git` header 中的两个文件名是一样的，我们需要查看 `---` 和 `+++` 中的信息，新增或者删除的文件会使用 `/dev/null` 来表示。

### 二进制

在 Git Diff 中的二进制文件并不会给出细节（也没法给），而是使用下面的格式来进行表示：

```jsx
diff --git a/img.png b/img.png
index 268373a..f07dd4c 100644
Binary files a/img.png and b/img.png differ
```

### 解析

了解了 Git Diff 格式以后，对其进行解析就比较简单了。我们只需要一行一行的进行解析，做些正则匹配、抽取的工作即可。

```js
for (let i = 0, len = lines.length; i < len; i++) {
  const line = lines[i];
  let values;

  if (values = /^diff --git "?(.+)"? "?(.+)"?/.exec(line)) {
    startFile();
    file.fromName = parseFile(values[1]);
    file.toName = parseFile(values[2]);
    continue;
  }

  if (line.indexOf('--- ') == 0) {
    if (!file.oldName) {
      file.oldName = parseFile(line.slice(4));
    }
    continue;
  }
  if (line.indexOf('+++ ') == 0) {
    if (!file.newName) {
      file.newName = parseFile(line.slice(4));
    }
    continue;
  }

  // hunk header
  if (values = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@.*/.exec(line)) {
    startBlock(line, +values[1], +values[2]);
    continue;
  }

  if (line.indexOf('+') == 0 || line.indexOf('-') == 0 || line.indexOf(' ') == 0) {
    createLine(line);
    continue;
  }

  if (values = /^old mode (\d{6})/.exec(line)) {
    file.oldMode = +values[1];
  } else if (values = /^new mode (\d{6})/.exec(line)) {
    file.newMode = +values[1];
  } else if (values = /^deleted file mode (\d{6})/.exec(line)) {
    file.deletedFileMode = +values[1];
    file.isDeleted = true;
  } else if (values = /^new file mode (\d{6})/.exec(line)) {
    file.newFileMode = + values[1];
    file.isNew = true;
  } else if (values = /^copy from "?(.+)"?/.exec(line)) {
    if (!file.oldName) {
      file.oldName = values[1];
    }
    file.isCopy = true;
  } else if (values = /^copy to "?(.+)"?/.exec(line)) {
    if (!file.newName) {
      file.newName = values[1];
    }
    file.isCopy = true;
  } else if (values = /^rename from "?(.+)"?/.exec(line)) {
    if (!file.oldName) {
      file.oldName = values[1];
    }
    file.isRename = true;
  } else if (values = /^rename to "?(.+)"?/.exec(line)) {
    if (!file.newName) {
      file.newName = values[1];
    }
    file.isRename = true;
  } else if (values = /^index ([0-9a-z]+)\.\.([0-9a-z]+)\s*(\d{6})?/.exec(line)) {
    file.checksumBefore = values[1];
    file.checksumAfter = values[2];
    if (values[3]) {
      file.mode = +values[3];
    }
  } else if (values = /^similarity index (\d+)%/.exec(line)) {
    file.unchangedPercentage = values[1];
  } else if (values = /^dissimilarity index (\d+)%/.exec(line)) {
    file.changedPercentage = values[1];
  } else if (values = /^Binary files (.*) and (.*) differ/.exec(line)) {
    file.isBinary = true;
    file.oldName = parseFile(values[1]);
    file.newName = parseFile(values[2]);
    startBlock('Binary file');
  } else if (values = /^GIT binary patch/.exec(line)) {
    file.isBinary = true;
    startBlock(line);
  } else {
    if (values = /^index ([0-9a-z]+),([0-9a-z]+)\.\.([0-9a-z]+)/.exec(line)) {
      file.checksumBefore = [values[2], values[3]];
      file.checksumAfter = values[1];
    } else if (values = /^mode (\d{6}),(\d{6})\.\.(\d{6})/.exec(line)) {
      file.oldMode = [values[2], values[3]];
      file.newMode = values[1];
    } else if (values = /^new file mode (\d{6})/.exec(line)) {
      file.newFileMode = +values[1];
      file.isNew = true;
    } else if (values = /^deleted file mode (\d{6}),(\d{6})/.exec(line)) {
      file.deletedFileMode = +values[1];
      file.isDeleted = true;
    }
  }
}
saveBlock();
saveFile();
```

对最开始的 Git Diff 进行解析：

```js
diff --git a/f1 b/f1
index 6f8a38c..449b072 100644
--- a/f1
+++ b/f1
@@ -1,7 +1,7 @@
 1
 2
 3
-a
+b
 5
 6
 7
```

可以得到如下的 JSON 结构（省略了一些字段）：

```js
[ 
  { 
    type: 'changed',
    oldName: 'f1',
    newName: 'f1',
    checksumBefore: '6f8a38c',
    checksumAfter: '449b072',
    mode: 100644,
    isBinary: false,
    blocks: [ 
      { 
        header: '@@ -1,7 +1,7 @@',
        lnOld: 8,
        lnNew: 8,
        lines: [ 
          { type: 'cntx', prefix: ' ', content: '1', newLn: 1, oldLn: 1 },
          { type: 'cntx', prefix: ' ', content: '2', newLn: 2, oldLn: 2 },
          { type: 'cntx', prefix: ' ', content: '3', newLn: 3, oldLn: 3 },
          { type: 'del',  prefix: '-', content: 'a', newLn: 0, oldLn: 4 },
          { type: 'ins',  prefix: '+', content: 'b', newLn: 4, oldLn: 0 },
          { type: 'cntx', prefix: ' ', content: '5', newLn: 5, oldLn: 5 },
          { type: 'cntx', prefix: ' ', content: '6', newLn: 6, oldLn: 6 },
          { type: 'cntx', prefix: ' ', content: '7', newLn: 7, oldLn: 7 } 
        ] 
      } 
    ] 
  } 
]
```

## 对行进行 Diff

得到上面的 JSON 后，实际上我们已经可以将改动渲染为 HTML 了。但是，我们还想对其进行一个优化，那就是我们希望对行与行进行一个 Diff 并进行高亮，从而可以让用户更详细的知道相关的行与行之间的变更点，像下面这样的效果：

![Diff效果](https://img.alicdn.com/tfs/TB1RielRXXXXXbKXVXXXXXXXXXX-1152-368.png)

### 决定哪些行需要 Diff

我们想要比较的是那些”修改“过的行，所以，删除的行、新增的行应该保持原样。整个过程如下所示：

```js
blocks = blocks.map(block => {
  let lines = [];
  let oldLines = [];
  let newLines = [];

  block.lines.forEach(line => {
    if (line.type != TYPES.added && (newLines.length > 0 || (line.type != TYPES.deleted && oldLines.length > 0))) {
      diffLine();
    }

    if (line.type == TYPES.normal) {
      lines.push(line);
    } else if (line.type == TYPES.added && oldLines.length == 0) {
      lines.push(line);
    } else if (line.type == TYPES.deleted) {
      oldLines.push(line);
    } else if (line.type == TYPES.added && oldLines.length != 0) {
      newLines.push(line);
    } else {
      diffLine();
    }
  });
  diffLine();

  block.lines = lines;

  return block;
});
function diffLine() {
  const common = Math.min(oldLines.length, newLines.length);
  for (let i = 0; i < common; i += 1) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    const diff = diffMatchPatch.diff_main(oldLine.content, newLine.content);
    if (diff && diff.length) {
      oldLine.diff = [];
      newLine.diff = [];

      diff.forEach(item => {
        if (item[0] == DiffMatchPatch.DIFF_INSERT) {
          newLine.diff.push({'tag': TYPES.added, 'content': item[1]});
        } else if (item[0] == DiffMatchPatch.DIFF_DELETE) {
          oldLine.diff.push({'tag': TYPES.deleted, 'content': item[1]});
        } else {
          oldLine.diff.push({'tag': '', 'content': item[1]});
          newLine.diff.push({'tag': '', 'content': item[1]});
        }
      });
    }
    lines.push(oldLine);
    lines.push(newLine);
  }
  lines = lines.concat(oldLines.slice(common));
  lines = lines.concat(newLines.slice(common));

  oldLines = [];
  newLines = [];
}
```

我们还是使用最开始的 Git Diff，在进行行之间的 Diff 后，会得到这样的 JSON 结构：

```js
[ 
  { 
    type: 'changed',
    oldName: 'f1',
    newName: 'f1',
    checksumBefore: '6f8a38c',
    checksumAfter: '449b072',
    mode: 100644,
    isBinary: false,
    blocks: [ 
      { 
        header: '@@ -1,7 +1,7 @@',
        lnOld: 8,
        lnNew: 8,
        lines: [ 
          { type: 'cntx', prefix: ' ', content: '1', newLn: 1, oldLn: 1 },
          { type: 'cntx', prefix: ' ', content: '2', newLn: 2, oldLn: 2 },
          { type: 'cntx', prefix: ' ', content: '3', newLn: 3, oldLn: 3 },
          { type: 'del',  prefix: '-', content: 'a', newLn: 0, oldLn: 4, diff: [{tag: 'del', content: 'a'}] },
          { type: 'ins',  prefix: '+', content: 'b', newLn: 4, oldLn: 0, diff: [{tag: 'ins', content: 'b'}] },
          { type: 'cntx', prefix: ' ', content: '5', newLn: 5, oldLn: 5 },
          { type: 'cntx', prefix: ' ', content: '6', newLn: 6, oldLn: 6 },
          { type: 'cntx', prefix: ' ', content: '7', newLn: 7, oldLn: 7 } 
        ] 
      } 
    ] 
  } 
]
```

比较过的行会拥有 `diff` 字段，表示 Diff 的详细信息。

### Diff 算法

上面过程的关键是 `diffMatchPatch.diff_main` 方法，这个方法会比较两个字符串，生成 Diff 信息。

比如：`diffMatchPatch.diff_main('Apples are a fruit', 'Bananas are also fruit')` 会得到如下结果：

```js
/* -1 表示删除
 *  1 表示插入
 *  0 表示相等
 */
[ 
  [ -1, 'Apple' ], 
  [ 1, 'Banana' ],
  [ 0, 's are a' ], 
  [ 1, 'lso' ],
  [ 0, ' fruit' ] 
]
```

Diff 的本质实际上是一个 LCS（Longest Common Subsequece）问题，最基本的算法具有 `O(MxN)` 的复杂度（M、N 分别是两个字符串的长度），可以参考：<https://en.wikipedia.org/wiki/Longest_common_subsequence_problem>

原始算法在遇到超长字符串时就会特别慢。比如：Diff 到构建后的代码、写到 HTML 中的一行内嵌脚本，这些代码基本都是一行很长的代码，在进行 Diff 时需要运行很长时间，经常发生超时然后无法 Diff 问题。

### 优化

当然，我们是有办法来进行优化的。这篇文章：<https://neil.fraser.name/writing/diff/>总结的非常完整。这里我简单进行介绍，大家感兴趣可以直接阅读原文。

#### 相等判断

如果两个字符串相等，直接就不需要再 Diff 了，这个应该是很清楚的：

```js
if (text1 == text2) return null;
```

#### 相同前缀、后缀判断

在比较两个字符串时，有很多时候会有相同的前缀、后缀，先将这些前缀、后缀找到，会缩短最后实际需要 Diff 的内容。

比如下面的两个字符串：

```jsx
Text 1: The cat in the hat.
Text 2: The dog in the hat.
```

在进行前缀、后缀判断后，可以缩短到对下面的字符串进行 Diff：

```jsx
Text 1: cat
Text 2: dog
```

在搜索前缀、后缀时我们可以使用二分查找来进一步加速，可以有 `O(log n)` 的复杂度。

#### 单纯的插入、删除

仅仅做了插入或者删除是变更中很常见的情况。比如下面的文本：

```jsx
Text 1: The cat in the hat.          |  Text 1: The cat in the hat.
Text 2: The furry cat in the hat.    |  Text 2: The cat.
```

剔除前缀、后缀后得到：

```jsx
Text 1:                              |  Text 1:  in the hat
Text 2: furry                        |  Text 2:
```

在 `Text 1` 中的空字符串表示 `Text 2` 中的内容就是一个插入，插入后可以得到 `Text 2`。

在 `Text 2` 中的空字符串表示 `Text 1` 中的内容就是一个删除，删除后可以得到 `Text 2`。

#### 子串包含

考虑下面的文本：

```jsx
Text 1: The cat in the hat.
Text 2: The happy cat in the black hat.
```

剔除前缀、后缀后得到：

```jsx
Text 1: cat in the
Text 2: happy cat in the black
```

这时如果 `Text 1` 是 `Text 2` 的子串，不进行 Diff 算法，我们就已经知道 Diff 信息了，必然是在子串的前、后插入了内容。

#### Diff 优化

在进行上面的一些前置操作后，就可以进行实际的 Diff 了。

基本的算法会比较耗时，实际上有一篇论文专门提出了优化过的算法，算法过程比较复杂，还有各种数学证明，这里就不详细说明了，感兴趣的可以参考：<http://www.xmailserver.org/diff2.pdf>

### 更好的方法

实际上进行了这种种的优化，我们再回到最初的需求：想让用户能更好的 Diff 代码。

但是，那些一行非常长的代码是真正的代码吗？实际中遇到有内嵌在 HTML 中的一行脚本有一万多个字符。。

当一行代码超过 80 个字符已经是超长了（而且应该已经违反团队的编码规范），对于这种超长代码实际上我们完全可以跳过行 Diff：

```jsx
const threshold = 80;
const len = Math.max(oldLine.content.length, newLine.content.length);
if (len <= threshold) {
  const diff = diffMatchPatch.diff_main(oldLine.content, newLine.content);
  // ...
}
```

**所以，在仔细分析、理解需求后，很多事情，其实根本不用去做**

## 参考资料

- <https://git-scm.com/docs/git-diff>
- <https://en.wikipedia.org/wiki/Longest_common_subsequence_problem>
- <https://neil.fraser.name/writing/diff/>
- <http://www.xmailserver.org/diff2.pdf>
- <https://github.com/GerHobbelt/google-diff-match-patch>

> 题图：<https://unsplash.com/photos/pi_Ju6KoQIc> By @Tran Mau Tri Tam