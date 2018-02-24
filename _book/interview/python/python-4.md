# 对字典中的项根据其值的大小进行排序



## 常规场景

如某班的成绩以字典的形式存储为：`{'Airing': 100, 'Penny': 70, 'Bili': 50}`，现根据其成绩的高低，对学生进行排名。

## 常规解法：使用zip将字典转成元组

`sorted`是一个内置的排序函数，可对列表进行排序。如：

```python
sorted([3, 4, 66, 6])   # 返回 [3, 4, 6, 66]
```

那么如何对字典进行排序呢？

以下是操作流程：

1. 利用`zip`将字典转化成元组
2. 使用`sorted`函数进行排序

我们还是以场景中的案例为例：

```python
d = {'Airing': 100, 'Penny': 70, 'Bili': 50}

# 如果直接对字典进行排序，会默认按照键进行排序
sorted(d)  # => ['Airing', 'Bili', 'Penny']

# 所以将字典转成元组的列表处理
# 元组值前键后，会优先按照值排序
# 即转成 => [(100, 'Airing'), (70, 'Penny'), (50, 'Bili')]

# 1. 利用`zip`将字典转化成元组
f = zip(d.values(), d.keys()) # => [(100, 'Airing'), (70, 'Penny'), (50, 'Bili')]

# 注：如果字典的项很多的话，建议使用其迭代版本（Python2），可以对内存进行优化
f = zip(d.itervalues(), d.iterkeys()) # 结果相同

# 2. 使用`sorted`函数进行排序
sorted(f) # 成绩由小到大 => [(50, 'Bili'), (70, 'Penny'), (100, 'Airing')]

```

## 使用`sorted`函数的 key 参数

那么 Python 中有没有更加方便的解决方案呢？按照套路来说，是有的。那就是使用`sorted`函数的 key 参数。

```python
d = {'Airing': 100, 'Penny': 70, 'Bili': 50}

d.items()  # => [('Airing', 100), ('Penny', 70), ('Bili', 50)]
# 此时键在前，值在后，没法直接使用 sorted 函数
# 就需要使用 sorted 函数的 key 参数

sorted(d.items(), key=lambda x : x[1]) # 规定按照第1项（0开始）进行排序
# 成绩由小到大 => [(50, 'Bili'), (70, 'Penny'), (100, 'Airing')]
```