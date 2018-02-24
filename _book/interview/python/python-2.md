# 为元组中的每个元素命名



## 常规场景

先来看一个案例。

学生信息系统中数据为固定格式（姓名，年龄，性别，邮箱地址），学生数据很大为了减小存储开销，对每个学生我们用元组表示。但是，**访问时，我们通常使用索引（index）访问，大量的索引降低了程序的可读性**。

```python
# 现有如下的一些元组
# ('Jim', 16, 'male', 'jim@ursb.me')
# ('Airing', 20, 'male', 'airing@ursb.me')
# ('Lucy', 16, 'female', 'lucy@ursb.me')

student = ('Jim', 16, 'male', 'jim@ursb.me')

# name
print student[0]

# age
print student[1]

# sex
print student[2]

```

可见，程序中将会大量的出现一些纯数字的索引值，非常不利于程序的维护，可读性很差，一眼看不出其含义。

## C 语言中的解决方案

C 语言中，可以使用**宏定义**的方式解决这个问题：

```python
#define NAME 0
#define AGE  1

```

也可以使用**枚举类型**解决：

```python
enum Student{
    NAME,
    AGE,
    SEX,
}
```

## Python 中优雅的解决方案

### 方案1：定义类似C语言中的枚举类型

这种方法，也就是定义一系列的数值常量

```python
NAME  = 0
AGE   = 1
SEX   = 2
EMAIL = 3

# 或者 NAME, AGE, SEX, EMAIL = xrange(4)

student = ('Airing', 20, 'male', 'airing@ursb.me')

# name 
print student[NAME]

# age
print student[AGE]

# sex
print student[SEX]

```

### 方案2：使用标准库中`collections.namedtuple`替代内置`tuple`

```python
from collections import namedtuple

# 相当于类的工厂
Student = namedtuple('Student', ['name', 'age', 'sex', 'email'])

# 相当于实例化类对象
s = Student('Airing', 20, 'male', 'airing@ursb.me')

# 也可以使用关键字传参，但是位置需要对应
s2 = Student(name='Jim', age=16, sex='male', email='jim@ursb.me')

# 访问元素相当于访问对象的属性
s.name
s.age
s.sex

# s也是内置类型 tuple 的子类
isinstance(s, tuple)     # => True

```

是不是优雅方便了许多呢？



