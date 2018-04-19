## 深入理解chmod xxxx 四位数字



通常我们如果修改一个文件的权限，使用`chmod`命令。一般的用法是：

```
$ chmod 0755 FILENAME
```

在这里必须提及到一个知识点：
也就是文件的权限，分别为`r`,`w`,`x`。
对用的数字分别为：
r---->4
w---->2
x---->1

如果一个文件需要全部的权限，也就是`rwx`，则数字为`4+2+1`,也就是`7`.

那么`0755`分别代表什么意思呢？
在这里，先忽略`0`(后面解释).

剩下的三位分别对应：
文件属主(ower,u), 文件组(group,g), 其他(others,o).

因此`chmod 755 FILENAME`代表的意思就是，属主具备读写执行权限，同一组的用户具备读执行权限，其他用户具备读执行权限.

回到之前的`0`数字这里，四位数字中的第一位数字具备什么含义呢？

在这里说明一下`chmod`权限选项：
`4000` Sets user ID on execution
`2000` Sets group ID on execution
`1000` Sets the link permission to directoires or sets the save-text attribute for files.
(详细参考《mstering unix shell scripting》- Part1 - File permissons (54 of 1035))

所以当`chmod 4755 my_program`的时候，无论谁执行了这个文件，都相当于属主执行。



