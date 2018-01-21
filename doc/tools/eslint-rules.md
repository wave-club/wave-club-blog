# EsLint规则与配置



# 1.EsLint规则

#####     [ESLint Rules](http://eslint.cn/docs/rules/)

​    所有的规则默认都是禁用的。在配置文件中，使用 `"extends": "eslint:recommended"` 来启用推荐的规则，报告一些常见的问题，在下文中这些推荐的规则都带有一个✔️标记。

### Possible Errors

下面的规则指出了你可能犯错误的地方。

- comma-dangle: 要求或禁止末尾逗号
- no-cond-assign: 禁止条件表达式中出现赋值操作符
- no-console: 禁用 console
- no-constant-condition: 禁止在条件中使用常量表达式
- no-control-regex: 禁止在正则表达式中使用控制字符
- no-debugger: 禁用 debugger
- no-dupe-args: 禁止 function 定义中出现重名参数
- no-dupe-keys: 禁止对象字面量中出现重复的 key
- no-duplicate-case: 禁止重复的 case 标签
- no-empty: 禁止空语句块
- no-empty-character-class: 禁止在正则表达式中使用空字符集
- no-ex-assign: 禁止对 catch 子句的参数重新赋值
- no-extra-boolean-cast: 禁止不必要的布尔转换
- no-extra-parens: 禁止不必要的括号
- no-extra-semi: 禁止不必要的分号
- no-func-assign: 禁止对 function 声明重新赋值
- no-inner-declarations: 禁止在嵌套的块中出现 function 或 var 声明
- no-invalid-regexp: 禁止 RegExp 构造函数中无效的正则表达式字符串
- no-irregular-whitespace: 禁止在字符串和注释之外不规则的空白
- no-negated-in-lhs: 禁止在 in 表达式中出现否定的左操作数
- no-obj-calls: 禁止把全局对象 (Math 和 JSON) 作为函数调用
- no-prototype-builtins: 禁止直接使用 Object.prototypes 的内置属性
- no-regex-spaces: 禁止正则表达式字面量中出现多个空格
- no-sparse-arrays: 禁用稀疏数组
- no-unexpected-multiline: 禁止出现令人困惑的多行表达式
- no-unreachable: 禁止在return、throw、continue 和 break语句之后出现不可达代码
- no-unsafe-finally: 禁止在 finally 语句块中出现控制流语句
- use-isnan: 要求使用 isNaN() 检查 NaN
- valid-jsdoc: 强制使用有效的 JSDoc 注释
- valid-typeof: 强制 typeof 表达式与有效的字符串进行比较

### Best Practices

这些规则是关于最佳实践的，帮助你避免一些问题：

- accessor-pairs: 强制 getter 和 setter 在对象中成对出现
- array-callback-return: 强制数组方法的回调函数中有 return 语句
- block-scoped-var: 强制把变量的使用限制在其定义的作用域范围内
- complexity: 指定程序中允许的最大环路复杂度
- consistent-return: 要求 return 语句要么总是指定返回的值，要么不指定
- curly: 强制所有控制语句使用一致的括号风格
- default-case: 要求 switch 语句中有 default 分支
- dot-location: 强制在点号之前和之后一致的换行
- dot-notation: 强制在任何允许的时候使用点号
- eqeqeq: 要求使用 === 和 !==
- guard-for-in: 要求 for-in 循环中有一个 if 语句
- no-alert: 禁用 alert、confirm 和 prompt
- no-caller: 禁用 arguments.caller 或 arguments.callee
- no-case-declarations: 不允许在 case 子句中使用词法声明
- no-div-regex: 禁止除法操作符显式的出现在正则表达式开始的位置
- no-else-return: 禁止 if 语句中有 return 之后有 else
- no-empty-function: 禁止出现空函数
- no-empty-pattern: 禁止使用空解构模式
- no-eq-null: 禁止在没有类型检查操作符的情况下与 null 进行比较
- no-eval: 禁用 eval()
- no-extend-native: 禁止扩展原生类型
- no-extra-bind: 禁止不必要的 .bind() 调用
- no-extra-label: 禁用不必要的标签
- no-fallthrough: 禁止 case 语句落空
- no-floating-decimal: 禁止数字字面量中使用前导和末尾小数点
- no-implicit-coercion: 禁止使用短符号进行类型转换
- no-implicit-globals: 禁止在全局范围内使用 var 和命名的 function 声明
- no-implied-eval: 禁止使用类似 eval() 的方法
- no-invalid-this: 禁止 this 关键字出现在类和类对象之外
- no-iterator: 禁用 **iterator** 属性
- no-labels: 禁用标签语句
- no-lone-blocks: 禁用不必要的嵌套块
- no-loop-func: 禁止在循环中出现 function 声明和表达式
- no-magic-numbers: 禁用魔术数字
- no-multi-spaces: 禁止使用多个空格
- no-multi-str: 禁止使用多行字符串
- no-native-reassign: 禁止对原生对象赋值
- no-new: 禁止在非赋值或条件语句中使用 new 操作符
- no-new-func: 禁止对 Function 对象使用 new 操作符
- no-new-wrappers: 禁止对 String，Number 和 Boolean 使用 new 操作符
- no-octal: 禁用八进制字面量
- no-octal-escape: 禁止在字符串中使用八进制转义序列
- no-param-reassign: 不允许对 function 的参数进行重新赋值
- no-proto: 禁用 **proto** 属性
- no-redeclare: 禁止使用 var 多次声明同一变量
- no-return-assign: 禁止在 return 语句中使用赋值语句
- no-script-url: 禁止使用 javascript: url
- no-self-assign: 禁止自我赋值
- no-self-compare: 禁止自身比较
- no-sequences: 禁用逗号操作符
- no-throw-literal: 禁止抛出非异常字面量
- no-unmodified-loop-condition: 禁用一成不变的循环条件
- no-unused-expressions: 禁止出现未使用过的表达式
- no-unused-labels: 禁用未使用过的标签
- no-useless-call: 禁止不必要的 .call() 和 .apply()
- no-useless-concat: 禁止不必要的字符串字面量或模板字面量的连接
- no-useless-escape: 禁用不必要的转义字符
- no-void: 禁用 void 操作符
- no-warning-comments: 禁止在注释中使用特定的警告术语
- no-with: 禁用 with 语句
- radix: 强制在parseInt()使用基数参数
- vars-on-top: 要求所有的 var 声明出现在它们所在的作用域顶部
- wrap-iife: 要求 IIFE 使用括号括起来
- yoda: 要求或禁止 “Yoda” 条件

### Strict Mode

该规则与使用严格模式和严格模式指令有关：

- strict: 要求或禁止使用严格模式指令

### Variables

这些规则与变量声明有关：

- init-declarations: 要求或禁止 var 声明中的初始化
- no-catch-shadow: 不允许 catch 子句的参数与外层作用域中的变量同名
- no-delete-var: 禁止删除变量
- no-label-var: 不允许标签与变量同名
- no-restricted-globals: 禁用特定的全局变量
- no-shadow: 禁止 var 声明 与外层作用域的变量同名
- no-shadow-restricted-names: 禁止覆盖受限制的标识符
- no-undef: 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
- no-undef-init: 禁止将变量初始化为 undefined
- no-undefined: 禁止将 undefined 作为标识符
- no-unused-vars: 禁止出现未使用过的变量
- no-use-before-define: 不允许在变量定义之前使用它们

### Node.js and CommonJS

这些规则是关于Node.js 或 在浏览器中使用CommonJS 的：

- callback-return: require return statements after callbacks
- global-require: 要求 require() 出现在顶层模块作用域中
- handle-callback-err: 要求回调函数中有容错处理
- no-mixed-requires: 禁止混合常规 var 声明和 require 调用
- no-new-require: 禁止调用 require 时使用 new 操作符
- no-path-concat: 禁止对 __dirname 和 __filename进行字符串连接
- no-process-env: 禁用 process.env
- no-process-exit: 禁用 process.exit()
- no-restricted-modules: 禁用指定的通过 require 加载的模块
- no-sync: 禁用同步方法

### Stylistic Issues

这些规则是关于风格指南的，而且是非常主观的：

- array-bracket-spacing: 强制数组方括号中使用一致的空格
- block-spacing: 强制在单行代码块中使用一致的空格
- brace-style: 强制在代码块中使用一致的大括号风格
- camelcase: 强制使用骆驼拼写法命名约定
- comma-spacing: 强制在逗号前后使用一致的空格
- comma-style: 强制使用一致的逗号风格
- computed-property-spacing: 强制在计算的属性的方括号中使用一致的空格
- consistent-this: 当获取当前执行环境的上下文时，强制使用一致的命名
- eol-last: 强制文件末尾至少保留一行空行
- func-names: 强制使用命名的 function 表达式
- func-style: 强制一致地使用函数声明或函数表达式
- id-blacklist: 禁止使用指定的标识符
- id-length: 强制标识符的最新和最大长度
- id-match: 要求标识符匹配一个指定的正则表达式
- indent: 强制使用一致的缩进
- jsx-quotes: 强制在 JSX 属性中一致地使用双引号或单引号
- key-spacing: 强制在对象字面量的属性中键和值之间使用一致的间距
- keyword-spacing: 强制在关键字前后使用一致的空格
- linebreak-style: 强制使用一致的换行风格
- lines-around-comment: 要求在注释周围有空行
- max-depth: 强制可嵌套的块的最大深度
- max-len: 强制一行的最大长度
- max-lines: 强制最大行数
- max-nested-callbacks: 强制回调函数最大嵌套深度
- max-params: 强制 function 定义中最多允许的参数数量
- max-statements: 强制 function 块最多允许的的语句数量
- max-statements-per-line: 强制每一行中所允许的最大语句数量
- new-cap: 要求构造函数首字母大写
- new-parens: 要求调用无参构造函数时有圆括号
- newline-after-var: 要求或禁止 var 声明语句后有一行空行
- newline-before-return: 要求 return 语句之前有一空行
- newline-per-chained-call: 要求方法链中每个调用都有一个换行符
- no-array-constructor: 禁止使用 Array 构造函数
- no-bitwise: 禁用按位运算符
- no-continue: 禁用 continue 语句
- no-inline-comments: 禁止在代码行后使用内联注释
- no-lonely-if: 禁止 if 作为唯一的语句出现在 else 语句中
- no-mixed-operators: 禁止混合使用不同的操作符
- no-mixed-spaces-and-tabs: 不允许空格和 tab 混合缩进
- no-multiple-empty-lines: 不允许多个空行
- no-negated-condition: 不允许否定的表达式
- no-nested-ternary: 不允许使用嵌套的三元表达式
- no-new-object: 禁止使用 Object 的构造函数
- no-plusplus: 禁止使用一元操作符 ++ 和 –
- no-restricted-syntax: 禁止使用特定的语法
- no-spaced-func: 禁止 function 标识符和括号之间出现空格
- no-ternary: 不允许使用三元操作符
- no-trailing-spaces: 禁用行尾空格
- no-underscore-dangle: 禁止标识符中有悬空下划线
- no-unneeded-ternary: 禁止可以在有更简单的可替代的表达式时使用三元操作符
- no-whitespace-before-property: 禁止属性前有空白
- object-curly-newline: 强制花括号内换行符的一致性
- object-curly-spacing: 强制在花括号中使用一致的空格
- object-property-newline: 强制将对象的属性放在不同的行上
- one-var: 强制函数中的变量要么一起声明要么分开声明
- one-var-declaration-per-line: 要求或禁止在 var 声明周围换行
- operator-assignment: 要求或禁止在可能的情况下要求使用简化的赋值操作符
- operator-linebreak: 强制操作符使用一致的换行符
- padded-blocks: 要求或禁止块内填充
- quote-props: 要求对象字面量属性名称用引号括起来
- quotes: 强制使用一致的反勾号、双引号或单引号
- require-jsdoc: 要求使用 JSDoc 注释
- semi: 要求或禁止使用分号而不是 ASI
- semi-spacing: 强制分号之前和之后使用一致的空格
- sort-vars: 要求同一个声明块中的变量按顺序排列
- space-before-blocks: 强制在块之前使用一致的空格
- space-before-function-paren: 强制在 function的左括号之前使用一致的空格
- space-in-parens: 强制在圆括号内使用一致的空格
- space-infix-ops: 要求操作符周围有空格
- space-unary-ops: 强制在一元操作符前后使用一致的空格
- spaced-comment: 强制在注释中 // 或 /* 使用一致的空格
- unicode-bom: 要求或禁止 Unicode BOM
- wrap-regex: 要求正则表达式被括号括起来

### ECMAScript 6

这些规则只与 ES6 有关, 即通常所说的 ES2015：

- arrow-body-style: 要求箭头函数体使用大括号
- arrow-parens: 要求箭头函数的参数使用圆括号
- arrow-spacing: 强制箭头函数的箭头前后使用一致的空格
- constructor-super: 要求在构造函数中有 super() 的调用
- generator-star-spacing: 强制 generator 函数中 * 号周围使用一致的空格
- no-class-assign: 禁止修改类声明的变量
- no-confusing-arrow: disallow arrow functions where they could be confused with comparisons
- no-const-assign: 禁止修改 const 声明的变量
- no-dupe-class-members: 禁止类成员中出现重复的名称
- no-duplicate-imports: disallow duplicate module imports
- no-new-symbol: disallow new operators with the Symbol object
- no-restricted-imports: disallow specified modules when loaded by import
- no-this-before-super: 禁止在构造函数中，在调用 super() 之前使用 this 或 super
- no-useless-computed-key: disallow unnecessary computed property keys in object literals
- no-useless-constructor: 禁用不必要的构造函数
- no-useless-rename: disallow renaming import, export, and destructured assignments to the same name
- no-var: 要求使用 let 或 const 而不是 var
- object-shorthand: 要求或禁止对象字面量中方法和属性使用简写语法
- prefer-arrow-callback: 要求使用箭头函数作为回调
- prefer-const: 要求使用 const 声明那些声明后不再被修改的变量
- prefer-reflect: 要求在合适的地方使用 Reflect 方法
- prefer-rest-params: require rest parameters instead of arguments
- prefer-spread: 要求使用扩展运算符而非 .apply()
- prefer-template: 要求使用模板字面量而非字符串连接
- require-yield: 要求generator 函数内有 yield
- rest-spread-spacing: enforce spacing between rest and spread operators and their expressions
- sort-imports: 强制模块内的 import 排序
- template-curly-spacing: 要求或禁止模板字符串中的嵌入表达式周围空格的使用
- yield-star-spacing: 强制在 yield* 表达式中 * 周围使用空格

# 2.EsLint配置

## Configuring ESLint(配置ESLint)

​    ESlint 被设计为是完全可配置的，这意味着你可以关闭每一个规则，只运行基本语法验证，或混合和匹配绑定的规则和自定义规则，以让 ESLint 更适合于你的项目。有两种主要的方式来配置 ESLint：

- Configuration Comments: 使用 JavaScript 注释把配置信息直接嵌入到一个文件。
- Configuration Files: 使用 JavaScript、JSON 或者 YAML 文件为整个目录和它的子目录指定配置信息。可以用 .eslintrc.* 文件或者在 package.json 文件里的 eslintConfig 字段这两种方式进行配置，ESLint 会查找和自动读取它们，再者，你可以在命令行指定一个配置文件。

有很多信息可以配置：

- Environment: 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
- Globals: 脚本在执行期间访问的额外的全局变量
- Rules: 启用的规则及各自的错误级别

所有这些选项让你可以细粒度地控制 ESLint 如何对待你的代码。

## Specifying Parser Options(指定解析器选项)

​    ESLint 允许你指定你想要支持的 JavaScript 语言选项。默认情况下，ESLint 支持 ECMAScript 5 语法。你可以通过使用解析器选项让它支持 ECMAScript 6 和 7 以及 JSX。

​    请注意，对 JSX 语法的支持不用于对 React 的支持。React 适用于特定 ESLint 无法识别的 JSX 语法。如果你正在使用 React 和 想要 React 语义，我们推荐你使用 eslint-plugin-react。

​    在 `.eslintrc.*` 文件使用`parserOptions` 属性设置解析器选项。可用的选项有：

- `ecmaVersion` - 设置为 3， 5 (默认)， 6 或 7 指定你想要使用的 ECMAScript 版本。

- `sourceType` - 设置为 `"script"` (默认) 或 `"module"`（如果你的代码是 ECMAScript 模块)。

- ```
  ecmaFeatures
  ```


  \- 这是个对象，表示你想使用的额外的语言特性:

   

  ​

  - `globalReturn` - 允许在全局作用域下使用 return 语句
  - `impliedStrict` - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
  - `jsx` - 启用 JSX
  - `experimentalObjectRestSpread` - 启用对实验性的 `object rest/spread properties` 的支持。(重要：这是一个实验性的功能,在未来可能会改变明显。 建议你写的规则 不要依赖该功能，除非当它发生改变时你愿意承担维护成本。)

​    `.eslintrc.json` 文件示例：

```
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": 2
    }
}
12345678910111213
```

​    设置解析器选项帮助 ESLint 确定什么是解析错误，所有语言选项默认都是 false。

## Specifying Parser(指定解析器)

​    ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器，只要该解析器符合下列要求：

- 它必须是本地安装的一个 npm 模块。
- 它必须有兼容 Esprima 的接口（它必须输出一个 parse() 方法）
- 它必须产出兼容 Esprima 的 AST 和 token 对象。

​    注意，即使满足这些兼容性，也不能保证一个外部解析器可以与 ESLint 正常工作，ESLint 也不会修复与其它解析器不兼容的相关 bug。

​    为了表明使用该 npm 模块作为你的解析器，你需要在你的 .eslintrc 文件里指定 parser 选项。例如，下面的配置指定了 Esprima 作为解析器：

```
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
1234567
```

​    以下解析器与 ESLint 兼容：

- Esprima
- Babel-ESLint - 对Babel解析器的包装使其与 ESLint 兼容。

​    注意，当使用自定义解析器时，为了使 ESLint 在非 ECMAScript 5 特性下正常工作，配置属性 parserOptions 仍然是必须的。解析器被传入 parserOptions，可能会也可能不会使用它们来决定开启哪个特征。

## Specifying Environments(指定的环境)

​    环境定义了预定义的全局变量。可用的环境有：

- `browser` - browser 全局变量。
- `node` - Node.js 全局变量和 Node.js 作用域。
- `commonjs` - CommonJS 全局变量和 CommonJS 作用域 (仅为使用 Browserify/WebPack 写的只支持浏览器的代码)。
- `shared-node-browser` - Node 和 Browser 通用全局变量。
- `es6` - 支持除了modules所有 ECMAScript 6 特性。
- `worker` - web workers 全局变量。
- `amd` - 定义 require() 和 define() 作为像 amd 一样的全局变量。
- `mocha` - 添加所有的 Mocha 测试全局变量。
- `jasmine` - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
- `jest` - Jest 全局变量。
- `phantomjs` - PhantomJS 全局变量。
- `protractor` - Protractor 全局变量。
- `qunit` - QUnit 全局变量。
- `jquery` - jQuery 全局变量。
- `prototypejs` - Prototype.js 全局变量。
- `shelljs` - ShellJS 全局变量。
- `meteor` - Meteor 全局变量。
- `mongo` - MongoDB 全局变量。
- `applescript` - AppleScript 全局变量。
- `nashorn` - Java 8 Nashorn 全局变量。
- `serviceworker` - Service Worker 全局变量。
- `atomtest` - Atom 测试全局变量。
- `embertest` - Ember 测试全局变量。
- `webextensions` - WebExtensions 全局变量。
- `greasemonkey` - GreaseMonkey 全局变量。

​    这些环境并不是相互排斥的，所以你可以一次定义多个。

​    可以在一个文件里，在配置文件中或使用 –env 命令行来指定环境。

​    在你的 JavaScript 文件中使用注释来指定环境，格式如下：

```
/*eslint-env node, mocha */
12
```

该设置启用了 Node.js 和 Mocha 环境。

​    在配置文件里指定环境，使用 env，指定你想启用的环境，设置它们为 true。例如，以下示例启用了 browser 和 Node.js 的环境：

```
{
    "env": {
        "browser": true,
        "node": true
    }
}
1234567
```

或在 package.json 文件中：

```
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
1234567891011
```

在 YAML 文件中：

```
---
    env:
        browser: true
        node: true
12345
```

​    如果你想在一个插件中使用一种环境，确保在`plugins`数组里指定插件名，插件名不带前缀，后跟一个`/`，紧随其后的是环境名称。例如：

```
{
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
1234567
```

或在 `package.json` 文件中

```
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "plugins": ["example"],
        "env": {
            "example/custom": true
        }
    }
}
1234567891011
```

在 YAML 文件中：

```
---
    plugins:
        - example
    env:
        example/custom: true
123456
```

## Specifying Globals(指定全局)

​    当访问未定义的变量时，no-undef 规则将发出警告。如果你想在一个文件里使用全局变量，推荐你定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。

​    在你的 JavaScript 文件中，用注释指定全局变量，格式如下：

```
/* global var1, var2 */
12
```

这里定义了两个全局变量：`var1` 和 `var2`。如果你想指定这些变量不应被重写（只读），你可以将它们设置为 false：

```
/* global var1:false, var2:false */
12
```

​    在配置文件里配置全局变量时，使用`globals`指出你要使用的全局变量。设置每个变量等于`true`允许变量被重写，或 `false`不允许被重写。比如：

```
{
    "globals": {
        "var1": true,
        "var2": false
    }
}
1234567
```

在 YAML 中：

```
---
    globals:
        var1: true
        var2: false
12345
```

这些例子 var1 允许被重写，var2 不允许被重写。

## Configuring Plugins(配置插件)

​    ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。

​    在配置文件里配置插件，要使用`plugins` ，其中包含插件名字的列表。插件名称可以省略 `eslint-plugin-`前缀。

```
{
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
1234567
```

在 YAML 中：

```
---
    plugins:
        - plugin1
        - eslint-plugin-plugin2
12345
```

**注意**：全局安装的 ESLint 只能使用全局安装的插件。本地安装的 ESLint 不仅可以使用本地安装的插件还可以使用全局安装的插件。

## Configuring Rules(配置规则)

​    ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用哪些规则。改变一个规则设置，你必须设置规则 ID 等于这些值之一：

- `"off"` 或 0 - 关闭规则
- `"warn"` 或 1 - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 2 - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

​    为了在文件注释里配置规则，使用以下格式的注释：

```
/* eslint eqeqeq: "off", curly: "error" */
12
```

​    在这个例子里，eqeqeq 规则被关闭，curly 规则被打开，定义为错误级别。你也可以使用对应的数字定义规则严重程度：

```
/* eslint eqeqeq: 0, curly: 2 */
12
```

​    这个例子和上个例子是一样的，只不过它是用的数字而不是字符串。eqeqeq 规则是关闭的，curly 规则被设置为错误级别。

​    如果一个规则有额外的选项，你可以使用数组字面量指定它们，比如：

```
/* eslint quotes: ["error", "double"], curly: 2 */
12
```

​    这条注释为规则 quotes 指定了 “double”选项。数组的第一项总是规则的严重程度（数字或字符串）。

​    使用 rules 连同错误级别和任何你想使用的选项在配置文件中进行规则配置。例如：

```
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"]
    }
}
12345678
```

​    在 YAML 中：

```
---
rules:
    eqeqeq: off
    curly: error
    quotes:
        - error
        - double
12345678
```

​    配置定义在插件中的一个规则的时候，你必须使用 插件名/规则ID 的形式。比如：

```
{
    "plugins": [
        "plugin1"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error"
    }
}
123456789101112
```

​    在 YAML 中：

```
---
plugins:
    - plugin1
rules:
    eqeqeq: 0
    curly: error
    quotes:
        - error
        - "double"
    plugin1/rule1: error
1234567891011
```

​    在这些配置文件中，规则 `plugin1/rule1` 表示来自插件`plugin1` 的`rule1`规则。你也可以使用这种格式的注释去配置，比如：

```
/* eslint "plugin1/rule1": "error" */
12
```

​    **注意**：当指定从插件来的规则时，确保删除`eslint-plugin-` 前缀。ESLint 在内部只使用没有前缀的名称去定位规则。

## Disabling Rules with Inline Comments(禁用规则与内联注释)

​    可以在你的文件中使用以下格式的块注释来临时禁止规则出现警告：

```
/* eslint-disable */

alert('foo');

/* eslint-enable */
123456
```

​    你也可以对指定的规则启用或禁用警告:

```
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
1234567
```

​    如果在整个文件范围内禁止规则出现警告，将 `/* eslint-disable */` 块注释放在文件顶部：

```
/* eslint-disable */

alert('foo');
1234
```

​    你也可以对整个文件启用或禁用警告:

```
/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
alert('foo');
12345
```

​    可以在你的文件中使用以下格式的行注释在某一特定的行上禁用所有规则：

```
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');
12345
```

​    在某一特定的行上禁用某个指定的规则：

```
alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');
12345
```

​    在某个特定的行上禁用多个规则：

```
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');
12345
```

​    **注意**：为文件的某部分禁用警告的注释，告诉 ESLint 不要对禁用的代码报告规则的冲突。ESLint 仍解析整个文件，然而，禁用的代码仍需要是有效的 JavaScript 语法。

## Adding Shared Settings

​    ESLint 支持在配置文件添加共享设置。你可以添加`settings`对象到配置文件，它将提供给每一个将被执行的规则。如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。

​    在 JSON 中：

```
{
    "settings": {
        "sharedData": "Hello"
    }
}
123456
```

​    在 YAML 中：

```
---
    settings:
        sharedData: "Hello"
1234
```

## Using Configuration Files(使用配置文件)

​    有两种方式可以使用配置文件。第一种是将文件保存到你喜欢的地方，然后将它的位置使用 -c 选项传递命令行，比如：

```
eslint -c myconfig.json myfiletotest.js
12
```

​    第二种方式是通过`.eslintrc.*`和`package.json`。ESLint 将自动在要检测的文件目录里寻找它们，紧接着是父级目录，一直到文件系统的根目录。当你想对一个项目的不同部分的使用不同配置，或当你希望别人能够直接使用 ESLint，而无需记住要在配置文件中传递什么，这种方式就很有用。

​    每种情况，配置文件都会覆盖默认设置。

## Configuration File Formats(牵头格式配置)

​    ESLint 支持几种格式的配置文件：

- **JavaScript** - 使用`.eslintrc.js` 然后输出一个配置对象。
- **YAML** - 使用 `.eslintrc.yaml` 或 .eslintrc.yml 去定义配置的结构。
- **JSON** - 使用 `.eslintrc.json`去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
- **Deprecated** - 使用`.eslintrc`，可以使 JSON 也可以是 YAML。
- **package.json** - 在 `package.json` 里创建一个 eslintConfig属性，在那里定义你的配置。

​    如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

- `.eslintrc.js`
- `.eslintrc.yaml`
- `.eslintrc.yml`
- `.eslintrc.json`
- `.eslintrc`
- `package.json`

## Configuration Cascading and Hierarchy(配置层叠和层次结构)

​    当使用 `.eslintrc.*`和 `package.json`文件的配置时，你可以利用配置级联。例如，假如你有以下结构：

```
your-project
├── .eslintrc
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
12345678
```

​    层叠配置使用离要检测的文件最近的 `.eslintrc`文件作为最高优先级，然后才是父目录里的配置文件，等等。当你在这个项目中允许 ESLint 时，lib/ 下面的所有文件将使用项目根目录里的 .eslintrc 文件作为它的配置文件。当 ESLint 遍历到 test/ 目录，`your-project/.eslintrc`之外，它还会用到 `your-project/tests/.eslintrc`。所以`your-project/tests/test.js`是基于它的目录层次结构中的两个`.eslintrc`文件的组合，并且离的最近的一个优先。通过这种方式，你可以有项目级 ESLint 设置，也有覆盖特定目录的 ESLint 设置。

​    同样的，如果在根目录的 package.json 文件中有一个`eslintConfig`字段，其中的配置将使用于所有子目录，但是当`tests` 目录下的`.eslintrc`文件中的规则与之发生冲突时，就会覆盖它。

```
your-project
├── package.json
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
12345678
```

​    如果同一目录下 .eslintrc 和 package.json 同时存在，.eslintrc 优先级高会被使用，package.json 文件将不会被使用。

​    注意：如果在你的主目录下有一个自定义的配置文件 (~/.eslintrc) ，如果没有其它配置文件时它才会被使用。因为个人配置将适用于用户目录下的所有目录和文件，包括第三方的代码，当 ESLint 运行时肯能会导致问题。

​    默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 “root”: true。ESLint 一旦发现配置文件中有 “root”: true，它就会停止在父级目录中寻找。

```
{   
    "root": true
}
1234
```

​    在 YAML 中：

```
---
    root: true
123
```

​    例如，projectA 的主目录下的 .eslintrc 文件中设置了 “root”: true。这种情况下，当检测 main.js 时，lib/ 下的配置将会被使用，projectA/ 下的 .eslintrc 将不会被使用。

```
home
└── user
    ├── .eslintrc <- Always skipped if other configs present
    └── projectA
        ├── .eslintrc  <- Not used
        └── lib
            ├── .eslintrc  <- { "root": true }
            └── main.js
123456789
```

​    完整的配置层次结构，从最高优先级最低的优先级，如下:

1.行内配置

- /*eslint-disable*/ 和 /*eslint-enable*/
- /*global*/
- /*eslint*/
- /*eslint-env*/

2.命令行选项：

- –global
- –rule
- –env
- -c、–config

3.项目级配置： 
\- 与要检测的文件在同一目录下的 `.eslintrc.*` 或 `package.json`文件 
\- 继续在父级目录寻找 .eslintrc 或 package.json文件，直到根目录（包括根目录）或直到发现一个有`"root": true`的配置。 
\- 如果不是（1）到（3）中的任何一种情况，退回到 `~/.eslintrc`中自定义的默认配置。

## Extending Configuration Files(扩展配置文件)

​    一个配置文件可以被基础配置中的已启用的规则继承。

`extends` 属性值可以是：

- 在配置中指定的一个字符串
- 字符串数组：每个配置继承它前面的配置

​    ESLint 递归地进行扩展配置，所以一个基础的配置也可以有一个 extends 属性。

`rules` 属性可以做下面的任何事情以扩展（或覆盖）规则：

- 启用额外的规则
- 覆盖基础配置中的规则的默认选项
- 禁用基础配置中的规则

## Using “eslint:recommended”(使用”eslint:recommended”)

​    值为`"eslint:recommended"`的`extends` 属性启用一系列核心规则，这些规则报告一些常见问题，在 规则页面 中被标记为 。这个推荐的子集只能在 ESLint 主要版本进行更新。

​    如果你的配置集成了推荐的规则：在你升级到 ESLint 新的主版本之后，在你使用命令行的 –fix 选项之前，检查一下报告的问题，这样你就知道一个新的可修复的推荐的规则将更改代码。

​    `eslint --init` 命令可以创建一个配置，这样你就可以继承推荐的规则。

​    JavaScript 格式的一个配置文件的例子：

```
module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
    }
}
123456789101112131415161718
```

## Using a shareable configuration package(使用一个可共享的配置方案)

​    可共享的配置 是一个 npm 包，它输出一个配置对象。要确保这个包安装在 ESLint 能请求到的目录下。

​    extends 属性值可以省略包名的前缀 eslint-config-。

​    eslint –init 命令可以创建一个配置，这样你就可以扩展一个流行的风格指南（比如，eslint-config-standard）。

​    YAML 格式的一个配置文件的例子：

```
extends: standard
rules:
comma-dangle:
    - error
    - always
no-empty: warn
1234567
```

## Using the configuration from a plugin(使用一个插件的配置)

​    插件 是一个`npm`包，通常输出规则。一些插件也可以输出一个或多个命名的 配置。要确保这个包安装在 ESLint 能请求到的目录下。

​    `plugins` 属性值 可以省略包名的前缀`eslint-plugin-`。

​    `extends` 属性值可以由以下组成：

- `plugin`:
- 包名 (省略了前缀，比如，react)
- `/`
- 配置名称 (比如 recommended)

​    JSON 格式的一个配置文件的例子：

```
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
    "no-set-state": "off"
    }
}
12345678910111213
```

## Using a configuration file(使用配置文件)

​    `extends` 属性值可以是基本配置文件的绝对路径或相对路径。

​    ESLint 解析基本配置文件的相对路径相对你你使用的配置文件，除非那个文件在你的主目录或非 ESLint 安装目录的父级目录。在这些情况下，ESLint 解析基本配合文件的相对路径相对于被检测的 项目目录（尤其是当前工作目录）。

​    JSON 格式的一个配置文件的例子：

```
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        "./node_modules/coding-standard/.eslintrc-es6",
        "./node_modules/coding-standard/.eslintrc-jsx"
    ],
    "rules": {
        "eqeqeq": "warn"
    }
}
1234567891011
```

## Using “eslint:all”

​    extends 属性值可以是 “eslint:all”，启用当前安装的 ESLint 中所有的核心规则。这些规则可以在 ESLint 的任何版本进行更改。

​    重要：这些配置 不推荐在产品中使用，因为它随着 ESLint 版本进行更改。使用的话，请自己承担风险。

​    如果你配置 ESLint 升级时自动地启用新规则，当源码没有任何改变时，ESLint 可以报告新问题，因此任何 ESLint 的新的小版本好像有破坏性的更改。

​    当你决定在一个项目上使用的规则和选项，尤其是如果你很少覆盖选项或禁用规则，你可能启用所有核心规则作为一种快捷方式使用。规则的默认选项并不是 ESLint 推荐的（例如，quotes 规则的默认选项并不意味着双引号要比单引号好）。

​    如果你的配置扩展了所有的核心规则：在你升级到一个新的大或小的 ESLint 版本，在你使用命令行的 –fix 选项之前，检查一下报告的问题，这样你就知道一个新的可修复的规则将更改代码。

​    JavaScript 格式的一个配置文件的例子：

```
module.exports = {
    "extends": "eslint:all",
    "rules": {
        // override default options
        "comma-dangle": ["error", "always"],
        "indent": ["error", 2],
        "no-cond-assign": ["error", "always"],

        // disable now, but enable in the future
        "one-var": "off", // ["error", "never"]

        // disable
        "init-declarations": "off",
        "no-console": "off",
        "no-inline-comments": "off",
    }
}
123456789101112131415161718
```

## Comments in Configuration Files(评论在配置文件)

​    JSON 和 YAML 配置文件格式都支持注释 (`package.json`文件不应该包括注释)。你可以在其他类型的文件中使用 JavaScript 风格的注释或使用 YAML 风格的注释，ESLint 会忽略它们。这允许你的配置更加人性化。例如：

```
{
    "env": {
        "browser": true
    },
    "rules": {
        // Override our default settings just for this directory
        "eqeqeq": "warn",
        "strict": "off"
    }
}
1234567891011
```

## Specifying File extensions to Lint(指定文件扩展名的lint)

​    目前，告诉 ESLint 哪个文件扩展名要检测的唯一方法是使用 –ext 命令行选项指定一个逗号分隔的扩展名列表。

## Ignoring Files and Directories(忽略文件和目录)

​    你可以通过在项目根目录创建一个 .eslintignore 文件告诉 ESLint 去忽略特定的文件和目录。.eslintignore 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测。例如，以下将忽略所有的 JavaScript 文件：

```
**/*.js
12
```

​    当 ESLint 运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找一个`.eslintignore`文件。如果发现了这个文件，当遍历目录时，将会应用这些偏好设置。一次只有一个`.eslintignore`文件会被使用，所以，不是当前工作目录下的`.eslintignore`文件将不会被用到。

​    Globs 匹配使用 node-ignore，所以大量可用的特性有：

- 以 # 开头的行被当作注释，不影响忽略模式。
- 路径是相对于 .eslintignore 的位置或当前工作目录。这也会影响通过 –ignore-pattern传递的路径。
- 忽略模式同 .gitignore 规范
- 以 ! 开头的行是否定模式，它将会重新包含一个之前被忽略的模式。

​    除了`.eslintignore`文件中的模式，ESLint总是忽略`/node_modules/*`和`/bower_components/*`中的文件。

​    例如：把下面 .eslintignore 文件放到当前工作目录里，将忽略 node_modules，bower_components 和所有以 .ts.js 或者 .coffee.js 为扩展名的文件以及 build/ 目录下除了 build/index.js 的所有文件。

```
# /node_modules/* and /bower_components/* ignored by default

# Ignore built files except build/index.js
build/*
!build/index.js
123456
```

## Using an Alternate File(使用另一个文件)

​    如果相比于当前工作目录下`.eslintignore`文件，你更想使用一个不同的文件，你可以在命令行使用`--ignore-path`选项指定它。例如，你可以使用`.jshintignore`文件，因为它有相同的格式：

```
eslint --ignore-path .jshintignore file.js
12
```

​    你也可以使用你的`.gitignore`文件：

```
eslint --ignore-path .gitignore file.js
12
```

​    任何文件只要满足标准忽略文件格式都可以用。记住，指定 –ignore-path 意味着任何现有的 .eslintignore 文件将不被使用。请注意，`.eslintignore`中的匹配规则比 `.gitignore`中的更严格。

## Ignored File Warnings(忽略文件警告)

​    当你传递目录给 ESLint，文件和目录是默默被忽略的。如果你传递一个指定的文件给 ESLint，你会看到一个警告，表明该文件被跳过了。例如，假如你有一个像这样的 `.eslintignore`文件：

```
foo.js
12
```

然后你执行：

```
eslint foo.js
12
```

你将会看到这个警告：

```
foo.js
    0:0  warning  File ignored because of your .eslintignore file. Use --no-ignore to override.

✖ 1 problem (0 errors, 1 warning)
12345
```

​    这种消息出现是因为 ESLint 不确定你是否想检测文件。正如这个消息表明的那样，你可以使用 –no-ignore 覆盖忽略的规则。







以下是自己常用的配置



```javascript
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "semi": [
      2,
      "never"
    ],
    "indent": [
      "off",
      4,
      {
        "SwitchCase": 1
      }
    ],
    "no-const-assign": "warn",
    "no-this-before-super": "warn",
    "no-undef": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "constructor-super": "warn",
    "valid-typeof": "warn",
    "no-console": "off",
    "space-before-blocks": "warn",
    "arrow-spacing": "warn",
    "comma-spacing": [
      "warn",
      {
        "before": false,
        "after": true
      }
    ],
    "keyword-spacing": [
      "warn",
      {
        "before": true
      }
    ],
    "key-spacing": [
      "warn",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "no-multi-spaces": [
      "warn",
      {
        "ignoreEOLComments": true
      }
    ],
    "space-infix-ops": [
      "warn",
      {
        "int32Hint": false
      }
    ],
    "no-control-regex": "off",
    "no-empty-character-class": "off",
    "no-regex-spaces": "off",
    "no-div-regex": "off",
    "no-useless-escape":"off",
    // jsx config
    "react/display-name": 0,
    "react/prop-types": "warn",
    // change to error in future when team has time to add prop-types
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}

```