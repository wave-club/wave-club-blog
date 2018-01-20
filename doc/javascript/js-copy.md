# javascripts 浅拷贝和深拷贝

### 浅拷贝

拷贝就是把父对象的属性,全部拷贝给子对象

下面这个函数,就是在做拷贝:

```js
var Chinese = {
    nation: '中国'
}
var Doctor = {
    career: '医生'
}
function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
    return c;
}
```

使用的时候,这样写:

```js
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
console.log(Doctor.nation);
```

但是,这样的拷贝有一个问题.那就是,如果父对象的属性等于数组或另一个对象,那么实际上,子对象获得的只是一个内存地址,而不是真正拷贝,因此存在父对象被篡改的可能.

现在给Chinese添加一个"出生地"属性,它的值是一个数组

```js
Chinese.birthPlaces = ['北京','上海','香港'];
```

通过extendCopy()函数,Doctor继承了Chinese.

```js
var Doctor = extendCopy(Chinese);
```

然后,我们为Doctor的"出生地"添加一个城市:

```js
Doctor.birthPlace.push('厦门');
```

看一下打印结果:

```js
console.log(Chinese.birthPlaces);  //  ["北京", "上海", "香港", "厦门"]
console.log(Doctor.birthPlaces);  //  ["北京", "上海", "香港", "厦门"]
```

结果是两个的出生地都被改了

所以,extendCopy()只是拷贝了基本类型的数据,我们把这种拷贝叫做'浅拷贝'

### 深拷贝

因为浅拷贝有如此弊端,所以我们接下来看一下深拷贝.要实现深拷贝有很多方法,有最简单的JSON.parse()方法,也有常用的递归拷贝方法,和ESS中的Object.create()方法

#### 使用JSON.parse()方法

要实现深拷贝有很多方法,比如最简单的办法是使用JSON.parse();

深拷贝:

```js
function deepClone(initalObj) {
    return JSON.parse(JSON.stringify(initalObj));
}
```

客户端调用:

```js
var obj = {
    a: {
        a: 'world',
        b: 21
    }
}
var cloneObj = deepClone(obj);
cloneObj.a = 'changed';
console.log(JSON.stringify(obj)); // {"a":{"a":"world","b":21}}
console.log(JSON.stringify(cloneObj));  // {"a":"changed"}
```

这种方法简单易用.

但是这种方法也有不少坏处,比如它会抛弃对象的constructor.也就是深拷贝之后,不管这个对象原来的构造函数是什么,在深拷贝之后都会变成Object

这种方法能正确处理的对象只有Number,String,Boolean,Array,扁平对象,即那些能够被json直接表示的数据结构.RegExp对象是无法通过这种方式深拷贝

#### 递归拷贝

所谓'深拷贝',就是能够实现真正意义上的数组和对象的拷贝.它的实现并不难,只要递归调用'浅拷贝'就行了

```js
function deepCopy(p,c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            arguments.callee(p[i], c[i]);
        }else {
            c[i] = p[i];
        }
    }
    return c;
}
```

使用方法:

```js
var Doctor = deepCopy(Chinese);
```

现在,给父对象加一个属性,值为数组.然后,在子对象上修改这个属性:

```js
var Doctor = deepCopy(Chinese);
Doctor.career = '医生';
Doctor.birthPlaces.push('厦门');
console.log(Chinese.birthPlaces);  //  ["北京", "上海", "香港"]
console.log(Doctor.birthPlaces);  //  ["北京", "上海", "香港", "厦门"]
```

上述代码确实可以实现深拷贝.但是当遇到两个互相引用的对象,会出现死循环的情况.

为了避免相互引用的对象导致死循环的情况,则应该在遍历的时候判断是否相互引用对象,如果是则退出循环

改进版代码如下:

```js
function deepCopy(p,c) {
    var c = c || {};
    for (var i in p) {
        var prop = p[i];
        // 避免相互引用对象导致死循环,如p[i].a = p[i];的情况
        if(typeof prop === 'object') {
            continue;
        }
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            arguments.callee(p[i], c[i]);
        }else {
            c[i] = p[i];
        }
    }
    return c;
}
```

#### 使用Object.create()方法

直接使用var newObj = Object.create(oldObj);可以达到深拷贝的效果

```js
function deepClone(initalObj, finalObj) {
    var obj = finalObj | {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        if (prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
```

#### $.extend()

jquery中$.extend()如同

```js
$.extend( [deep ], target, object1 [, objectN ] )
```

参数如下:

1. deep

- 类型:Boolean
- 如果为true,合并成为递归(又叫做深拷贝),默认值为false

1. target

- 类型:Object
- 对象扩展:这将接收新的属性

1. object1

- 类型:Object
- 包含额外的属性合并到第一个参数

1. objectN

- 类型:Object
- 包含额外的属性合并到第一个参数

当我们提供两个或多个对象给$.extend(),对象的所有属性都添加到目标对象(target参数)

如果只有一个参数提供给$.extend(),这意味着目标参数被忽略.在这种情况下,jquery对象本身被默认为目标对象.这样,我们可以在jquery的命名空间下添加新的功能.这对于插件开发者希望jquery中添加新函数时是很有用的

请记住,目标对象(第一个参数)将被修改,并且将通过$.extend()返回.然而,如果我们想保留原对象,我们可以通过传递一个空对象作为目标对象

```js
var object = $.extend({},object1,object2);
```

在默认情况下,通过$.extend()合并操作不是递归的;如果第一个对象的属性本身是一个对象或数组,那么它将完全用第二个对象相同的key重写一个属性.这些值不会被合并.可以通过检查下面例子中banana的值,就可以了解这一点.然而,如果将true作为该函数的第一个参数,那么会在对象上进行递归的合并.

警告:不支持第一个参数传递false

> 实例

1. 合并两个对象,并修改第一个对象

   ```js
    // 合并两个对象,并修改第一个对象
    var object1 = {
        apple: 0,
        banana: {
            price: 200
        },
        cherry: 97
    };
    var object2 = {
        banana: {
            weight: 52,
            price: 100
        },
        duration: 100
    };
    // merge object2 into object1,recursively
    $.extend(object1, object2);

    // assuming JSON.stringify - not avalable in IE<8
    console.log(JSON.stringify(object1));
    // {"apple":0,"banana":{"weight":52,"price":100},"cherry":97,"duration":100}
   ```

2. 采用递归方式合并两个对象,并修改第一个对象

   ```js
    // 合并两个对象,并修改第一个对象
    var object1 = {
        apple: 0,
        banana: {
            weight: 52,
            price: 100
        },
        cherry: 97
    };
    var object2 = {
        banana: {
            price: 200
        },
        duration: 100
    };
    // merge object2 into object1,recursively
    $.extend(true, object1, object2);

    // assuming JSON.stringify - not avalable in IE<8
    console.log(JSON.stringify(object1));
    // {"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"duration":100}
   ```

3. 合并defaults 和 options对象,并且不修改defaults对象.这是常用的插件开发模式

   ```js
    var defaults = {
        validate: false,
        limit: 5,
        name: 'foo'
    };
    var options = {
        validate: true,
        name: 'bar0'
    };
    // merge default and options,without modifying defaults
    var settings = $.extend({}, defaults, options);
    console.log(JSON.stringify(defaults)); // {"validate":false,"limit":5,"name":"foo"}
    console.log(JSON.stringify(options)); // {"validate":true,"name":"bar0"}
    console.log(JSON.stringify(settings)); // {"validate":true,"limit":5,"name":"bar0"}
   ```

#### javascript判断对象是否相等

在javascript中相等运算包括'==','==='.那么如何判断两个对象是否相等?你可能会认为,如果两个对象有相同的属性,以及她们的属性有相同的值,那么这两个对象就相等.那么下面通过一个实例来论证下:

```js
var obj1 = {
    name: 'Betty',
    sex: 'male'
};
var obj2 = {
    name: 'Betty',
    sex: 'male'
};
var obj3 = obj1;
console.log(obj1 == obj3); // true
console.log(obj1 === obj3); // true
console.log(obj2 == obj3); // false
console.log(obj2 === obj3); // false
```

上例返回true,是因为obj1和obj3的指针指向了内存中的同一地址.和面向对象的语言(java/c++)中值传递和引用传递的概念相似.因为,如果你想判断两个对象是否相等,你必须清楚,你想判断两个对象的属性相同,还是属性对应的值是否相同,还是怎样?

```js
function Person (name) {
    this.name = name;
}
var p1 = new Person("p1");
var p2 = new Person("p2");
console.log(p1 == p2); // false
Person.prototype.sayHi = function () {
    // do sayHi here
}
console.log(p1.sayHi() == p2.sayHi()); // true
console.log(p1.sayHi() === p2.sayHi()); // true
```

### 数组的拷贝

#### js的slice函数

Array对象的slice函数,返回一组数组我的一段(仍为数组)

```js
arrayobj.slice(start,end);
```

参数:

1. arrayobj:必选项,一个array对象
2. start:必选项,arrayobj中所指定的部分的开始元素是从零开始计算的下标
3. end:可选项.arrayobj中所指定的部分的结束元素是从零开始计算的下标

说明:

1. slice方法返回一个Array对象,其中包含了arrayobj的指定部分
2. slice方法一致复制到end所指定的元素,但是不包括该元素.如果start为负,将它作为length+start处理,如果end为负,就将它作为length+end处理,此处length为数组的长度.如果省略end,那么slice方法将一直复制到arrayobj的结尾.如果end出现在start之前,不复制任何元素到新数组中

代码如下:

```js
var arr = ['one', 'two', 'three'];
var arrtoo = arr.slice(0);
arrtoo[1] = 'set Map';
console.log("arr:"+arr); // arr:one,two,three
console.log("arrtoo:"+arrtoo); // arrtoo:one,set Map,three
```

#### js的concat方法

concat()方法用于连接两个或多个数组,该方法不会改变现有的数组,而仅仅会返回被连接数组的一个副本

语法:

```js
arrayObject.concat(arrayX,arrayX,......,arrayX)
```

说明:返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。

代码如下:

```js
var arr = ['one', 'two', 'three'];
var arrtoo = arr.concat();
arrtoo[1] = 'set map';
console.log("arr:"+arr); // arr:one,two,three
console.log("arrtoo:"+arrtoo); // arrtoo:one,set map,three
```