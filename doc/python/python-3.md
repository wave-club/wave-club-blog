# 统计序列中元素的出现频度

## 常规解法：迭代

该问题的实际场景主要有两种，一是单纯的统计序列中元素的出现的次数，二是统计某篇文章中出现频度最高的英语单词等。

```python
# 首先先来使用列表解析创建一个随机的序列
from random import randint

# 生成一个含有30个元素范围为0-20的随机序列
data = [randint(0, 20) for _ in xrange(30)]

# 统计结果是一个字典，其中data中的元素为键，0为初始值
c = dict.fromkeys(data, 0)

# 迭代
for x in data:
  c[x] += 1

print c

```

如此一来，就得到了序列中每个元素的出现次数。如果实际需求是找频度最高的前几个元素，可以对字典进行排序。（详见[1.1 在列表、字典、集合中根据条件筛选数据](https://github.com/airingursb/python-plus/blob/master/1-1.md)，这里不再赘述。）

可见，步骤虽然简单，但仍然是比较繁琐的。那么，有没有什么优雅的解决方案呢？

## Python 中优雅的解决方案

使用 `collections` 下的 `Counter` 对象，具体步骤：

- 将序列传入 `Counter` 的构造器，得到 `Counter` 对象是元素频度的字典。
- `Counter.most_common(n)`方法得到频度最高的n个元素的列表。

```python
from random import randint
from collections import Counter

data = [randint(0, 20) for _ in xrange(30)]

c2 = Counter(data)

# 获取所有元素的出现频度的字典
print c2

# 获取出现频度最高的3个元素
print c2.most_common(3) # 返回一个列表，如[(5,4),(10,3),(20,3)]

```

### 对英语文章进行词频统计

由于本人是考研党，所以这里，我直接使用了2015年考研英语1的第4篇阅读的文本为例，获取其出现频度最高的10个单词。

```
    Two years ago, Rupert Murdoch's daughter,Elisabeth, spoke of the "unsettling dearth of integrity across so many of our institutions" Integrity had collapsed, she argued, because of a collective acceptance that the only "sorting mechanism" in society should be profit and the market. But "it's us, human beings, we the people who create the society we want, not profit".

    Driving her point home, she continued: "It's increasingly apparent that the absence of purpose, of a moral language within government, media or business could become one of the most dangerous foals for capitalism and freedom." This same absence of moral purpose was wounding companies such as News International, shield thought, making it more likely that it would lose its way as it had with widespread illegal telephone hacking.

    As the hacking trial concludes-finding guilty ones-editor of the News of the World, Andy Coulson, for conspiring to hack phones, and finding his predecessor, Rebekah Brooks, innocent of the same charge-the winder issue of dearth of integrity still standstill, Journalists are known to have hacked the phones of up to 5500 people. This is hacking on an industrial scale, as was acknowledged by Glenn Mulcaire, the man hired by the News of the World in 2001 to be the point person for phone hacking. Others await trial. This long story still unfolds.

    In many respects, the dearth of moral purpose frames not only the fact of such widespread phone hacking but the terms on which the trial took place .One of the astonishing revelations was how little Rebekah Brooks knew of what went on in her newsroom, wow little she thought to ask and the fact that she never inquired wow the stories arrived. The core of her successful defence was that she knew nothing.

    In today's world, title has become normal that well-paid executives should not be accountable for what happens in the organizations that they run perhaps we should not be so surprised. For a generation, the collective doctrine has been that the sorting mechanism of society should be profit. The words that have mattered are efficiency, flexibility, shareholder value, business-friendly, wealth generation, sales, impact and, in newspapers, circulation. Words degraded to the margin have been justice fairness, tolerance, proportionality and accountability.

    The purpose of editing the News of the World was not to promote reader understanding to be fair in what was written or to betray any common humanity. It was to ruin lives in the quest for circulation and impact. Ms Brooks may or may not have had suspicions about how her journalists got their stories, but she asked no questions, gave no instructions-nor received traceable, recorded answers.

```

我已将上述文件传到七牛云中：<http://airing.ursb.me/python/text.txt>，因此待会的代码中直接使用`urllib2`读取网络文件。

```python
from collections import Counter
import re
import urllib2

# 读取网络文件并赋值于 txt 中
req = urllib2.Request('http://airing.ursb.me/python/text.txt')
response = urllib2.urlopen(req)
txt = response.read()

# 使用正则表达式分割 txt 中的单词存于序列中
# 再使用 Counter 进行频度统计返回字典
c3 = Counter(re.split('\W+', txt))

print c3.most_common(10)

# 打印结果为：[('the', 31), ('of', 23), ('to', 10), ('that', 9), ('was', 7), ('and', 7), ('in', 7), ('not', 6), ('she', 6), ('be', 6)]

```

如此，便完成了一个简单的词频统计。