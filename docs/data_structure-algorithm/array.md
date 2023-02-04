# 数组

几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构。JavaScript 里也有数组类型，尽管它的第一个版本并没有支持数组。

数组存储一系列同一种数据类型的值，虽然在 JavaScript 里，也可以在数组中保存不同类型的值，但我们还是要遵守最佳实践，避免这个做。

## 创建数组

用 JavaScript 声明、创建和初始化数组很简单，就像下面这样：

```javascript
let days = new Array() // {1}
days = new Array(3) // {2}
days = new Array('yesterday', 'today', 'tomorrow') // {3}
```

使用 `new` 关键字，就能简单的声明并初始化一个数组（行{1}）。用这种方式，也可以创建一个指定长度的数组（行{2}）。另外我们也可以直接将数组元素作为参数传递给它的构造器（行{3}）。

然而，用 `new` 创建数组并不是最好的方式。如果想在 JavaScript 中创建一个数组， 只用中括号 `[]` 的形式就可以了，如下所示：

```javascript
let days = [] // 同上述 {1}
days = ['yesterday', 'today', 'tomorrow'] // 同上述 {3}
```

在 ES6 中，Array 构造函数还有两个用于创建数组的静态方法：`from()` 和 `of()`。

- `Array.from()` 用于将类数组结构转换为数组实例。
- `Array.of()` 用于将一组参数转换为数组实例。

```js
const letters = Array.from('Fang.Xx')
console.log(letters) // ['F', 'a', 'n', 'g', '.', 'X', 'x']
const numbers = Array.of(1, 2, 3, 4)
console.log(numbers) // [1, 2, 3, 4]
```

## 数组索引

要取得或者设置数组的值，需要使用中括号 `[]` 并提供相应值的数字索引，如下所示：

```js
const days = ['yesterday', 'today', 'tomorrow']
console.log(days[0]) // 获取第 1 项的值
console.log(days[3]) // 索引超出数组最大索引，返回 undefined
days[1] = 'Today' // 修改第 2 项的值
days[3] = 'the day after tomorrow' // 添加第 4 项
```

数组中元素的数量保存在 `length` 属性中，这个属性始终返回 0 或大于 0 的数，如下图所示：

```js
const numbers = [1, 2, 3, 4, 5]
const names = []

console.log(numbers.length) // 5
console.log(names.length) // 0
```

数组 `length` 属性的独特之处在于，它不是只读的，即我们可以设置它的值。通过修改 `length` 的值，可以对数组内的元素进行操作。

```js
const numbers = [1, 2, 3, 4, 5]
numbers.length = 3
console.log(numbers) // [1, 2, 3]
numbers.length = 4
console.log(numbers) // [1, 2, 3, undefined]
// 通过 length 属性我们可以很方便的为数组末尾添加元素
numbers[numbers.length] = 5
numbers[numbers.length] = 6
console.log(numbers) // [1, 2, 3, undefined, 5, 6]
```

## 元素的增与删

在数组中添加和删除元素也很容易，但又是也会很棘手。假设我们有一个数组 numbers，初始化成了 0 到 9：

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 末尾

如果想要给数组的末尾添加或者删除一个元素，我们可以通过 `length` 属性很容易的实现。

```js
numbers[numbers.length] = 10 // 在数组末尾添加了一个元素 10
numbers.length-- // 删除了数组末尾的元素 10
```

除了上述的方法外，ECMAScript 还为我们提供了两个方法：`push()` 和 `pop()`。

- `push()` 方法接收任意数量的参数，并将它们添加到数组末尾，并返回添加后的数组长度。
- `pop()` 方法用于删除数组的最后一项，并返回被删除的值。

```js
numbers.push(10, 11, 12) // 在数组末尾添加了 10, 11, 12
numbers.pop() // 删除了元素 12
```

### 开头

想要给数组开头添加或者删除一个元素，并不是看起来那么容易，因为在数组开头操作元素涉及到了其他位置元素的左移或右移。

```js
// 在数组开头添加一个元素
for (let i = numbers.length; i > 0; i--) {
  numbers[i] = numbers[i - 1]
}
numbers[0] = -1
// 在数组开头删除一个元素
for (let i = 0; i < numbers.length - 1; i++) {
  numbers[i] = numbers[i + 1]
}
numbers.length--
```

如果每次我们想要操作数组头部的元素，都需要执行上述的操作的话，就会显得太繁琐、冗余。我们也可以将其封装成方法并且绑定到 Array 的原型上。

但是 ECMAScript 已经为我们提供了两个方法：`shift()` 和 `unshift()`。

- `shift()` 方法用于移除数组的第一项，并返回被移除的值。
- `unshift()` 方法接收任意数量的参数，并将它们添加到数组开头，并返回添加后的数组长度。

```js
numbers.unshift(-2, -1, 0) // 在数组开头添加了元素 -2 -1 0
numbers.shift() // 删除了元荤 -2
```

### 任意位置

上述我们了解了如何在数组头部和尾部添加或删除元素，接下来我们来看一下如何在数组的任意位置上添加或删除元素呢？

我们可以像之前一样，通过循环来实现，但不得不说这样操作起来确实麻烦。在这里就不得不提到一个很强大的数组方法了，它就是 `splice()` 方法。

`splice` 方法主要的目的是向数组中插入元素，但有 3 种不同的方式来使用这个方法。

1. **删除**。需要给 `splice()` 传入两个参数：要删除的第一个元素的位置，以及删除的数量。
2. **插入**。需要给 `splice()` 传入三个及以上参数：开始位置、0（要删除的元素数量）和要插入的元素。
3. **替换**。需要给 `splice()` 传入三个及以上参数：开始位置、删除元素个数和要插入的元素。

```js
let numbers = [1, 2, 3, 4, 5]
// 删除
const result1 = numbers.splice(0, 1)
console.log(result1) // [1]
console.log(numbers) // [2, 3, 4, 5]
// 插入
const result2 = numbers.splice(1, 0, 0, 1)
console.log(result2) // []
console.log(numbers) // [0, 1, 2, 3, 4, 5]
// 替换
const result3 = numbers.splice(0, 3, 5, 4)
console.log(result3) // [0, 1, 2]
console.log(numbers) // [5, 4, 3, 4, 5]
```

## 数组方法参考

### 检测数组

ECMAScript 提供了 `Array.isArray()` 方法，这个方法的目的就是确定一个值是否为数组。

```js
console.log(Array.isArray([])) // true
console.log(Array.isArray({})) // false
```

### 迭代器方法

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的三个方法：`keys()`、`values()` 和 `entries()` 方法。

- `key()` 返回数组索引的迭代器。
- `values()` 返回数组元素的迭代器。
- `entries()` 返回索引/值对的迭代器。

> 因为这些方法都返回迭代器，所以可以将它们的内容通过 `Array.from()` 直接转换为数组。

```js
const numbers = [1, 2, 3, 4]
const aKeys = Array.from(numbers.keys())
const aValues = Array.from(numbers.values())
const aEntries = Array.from(numbers.entries())

console.log(aKeys) // [0, 1, 2, 3]
console.log(aValues) // [1, 2, 3, 4]
console.log(aEntries) // [[0, 1], [1, 2], [2, 3], [3, 4]]
```

### 迭代方法

ECMAScript 为数组定义了 5 个迭代方法。每个方法接收两个参数：以每一项为参数运行的函数，以及可选的作为函数运行上下文的作用域对象（影响函数中的 this 的值）。传给每个方法的函数接收 3 个参数：数组元素、元素索引和数组本身。

数组的 5 个迭代方法如下：

- `filter()`：对数组的每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
- `forEach()`：对数组的每一项都运行传入的函数，没有返回值。
- `map()`：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
- `every()`: 对数组的每一项都运行传入的函数， 如果对每一项函数都返回 true，则这个方法 true。
- `some()`：对数组每一项都运行的函数，如果有一项返回 true，则这个方法就会中断运行并返回 true。

```js
const numbers = [1, 2, 3, 4]
const aFilter = numbers.filter(item => item % 2)
const aMap = numbers.map(item => item * 2)
const aEvery = numbers.every(item => item % 2)
const aSome = numbers.some(item => item % 2)
const aForEach = numbers.forEach(item => item * 2)

console.log(aFilter) // [1, 3]
console.log(aMap) // [2, 4, 6, 8]
console.log(aEvery) // false
console.log(aSome) // true
console.log(aForEach) // undefined
```

### 归并方法

ECMAScript 为数组提供了两个归并方法：`reduce()` 和 `reduceRight()`。这两个方法都会迭代数组的所有选项，并在此基础上构建一个最终返回值。

- `reduce()` 方法从数组第一项开始遍历到最后一项。
- `reduceRight()` 方法从数组最后一项开始遍历到第一项。

这两个方法都接收两个参数：对每一项都会运行的归并函数，以及可选的以之为归并起点的初始值。

- 传递给 `reduce()` 和 `reduceRight()` 的函数接收 4 个参数：
  - `prevValue`、`currentItem`、`currentIndex`和`Array`。
- 初始值是可选的。
  - 传入，`prevValue` 将使用该初始值，`currentItem` 将使用数组的第一个元素；
  - 未传入，`prevValue` 将使用数组的第一个元素，而 `currentItem` 将使用数组的第二个元素。

```js
const numbers = [1, 2, 3, 4, 5]
const result1 = numbers.reduce((prev, item) => prev + item)
const result2 = numbers.reduceRight((prev, item) => prev + item, '')

console.log(result1) // 15
console.log(result2) // '54321'
```

### 排序方法

数组中提供了两种方法可以用来对数组内元素的顺序进行调整：`reverse()` 和 `sort()`。

`reverse()` 方法就是将数组元素方向排列。

```js
const arr = ['html', 'css', 'javascript']
const reverseArr = arr.reverse()
console.log(reverseArr) // ['javascript', 'css', 'html']
```

`sort()` 方法默认会按照升序重新排列数组内元素，它可以接收一个可选的**比较函数**，用于判断哪个值在前面。

- 未传入。`sort()` 会在每一项上调用 `String()` 转型函数，然后比较字符串来决定顺序。即使数组的元素都是数值，也会先把数值转换成字符串再比较、排序。
- 传入。比较函数接收两个参数，如果第一个参数应该排在第二个参数前面，就返回负值；如果两个参数相等，就返回 0；如果第一个参数应该排在第二个参数后面，就返回正值。

```js
// 未传入比较函数
const numbers1 = [0, 1, 5, 10, 15]
numbers1.sort()
console.log(numbers1) // 0, 1, 10, 15, 5

// 传入比较函数
const numbers2 = [0, 1, 5, 10, 15]
numbers2.sort((a, b) => b - a)
console.log(numbers2) // [15, 10, 5, 1, 0]
```

### 搜索方法

ECMAScript 提供两类搜索数组的方法：按严格相等搜索和断言函数搜索。

- 严格相等的搜索方法：`indexOf()`、`lastIndexOf()` 和 `includes()`。
  - `indexOf()` 和 `lastInedxOf()` 都返回要查找的元素在数组中的位置，如果没找到则返回 `-1`。
  - `includes()` 返回布尔值，表示是否至少找到一个与指定元素匹配的项。
  - 这三个参数都可以接收两个参数：要查找的元素和一个可选的起始搜索位置。

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
console.log(numbers.indexOf(4)) // 3
console.log(numbers.lastIndexOf(4)) // 5
console.log(numbers.includes(4)) // true
console.log(numbers.indexOf(4, 4)) // 5
console.log(numbers.lastIndexOf(4, 4)) // 3
console.log(numbers.includes(4, 7)) // false

const person = { name: 'Fang.Xx' }
const people1 = [{ name: 'Fang.Xx' }]
const people2 = [person]
console.log(people1.indexOf(person)) // -1
console.log(people2.indexOf(person)) // 0
console.log(people1.includes(person)) // false
console.log(people2.includes(person)) // true
```

- 断言函数的搜索方法：`find()` 和 `findIndex()`。
  - 断言函数接收 3 个参数：元素、索引和数组本身。其中元素是数组中当前搜索的元素、索引是当前元素的索引，而数组就是正在搜索的数组。断言函数返回真值，表示是否匹配。
  - 这两个方法都从数组的最小索引开始。`find()` 返回第一个匹配的元素， `findIndex()` 返回第一个匹配元素的索引。这两个方法都可以接收第二个参数用于指定断言函数内部 this 的值。
  - 找到匹配项后，这两个方法都不再继续搜索。

```js
const perple = [
  { name: 'Fang.Xx', age: 23 },
  { name: 'Max.X', age: 24 },
]
// { name: 'Fang.Xx', age: 23 }
console.log(people.find((item, index, array) => item.age < 24))
// 0
console.log(people.findIndex((item, index, array) => item.age < 24))
```

### 操作方法

`concat()` 方法可以在现有数组全部元素基础上创建一个新数组。它首先会创建一个当前数组的副本，然后再把它的参数添加到数组末尾，最后返回这个新构建的数组。

- 如果传入一个或多个数组，则 `concat()` 会把这些数组的每一项元素都添加到结果数组中。
- 如果没有传入数组，则直接把他们添加到结果数组末尾。

```js
const numbers = [1, 2, 3]
const newNumbers = numbers.concat(4, [5, 6])
console.log(newNumbers) // [1, 2, 3, 4, 5, 6]

// 打平参数行为是可以重写的，通过修改 Symbol.isConcatSpreadable 的值。
// - true 打平
// - false 不打平
const concatNumbers1 = [4, 5]
const concatNumbers2 = {
  [Symbol.isConcatSpreadable]: false,
  length: 2,
  0: 6,
  1: 7,
}
const newNumbers2 = numbers.concat(concatNumbers1, concatNumbers2)
console.log(newNumbers2) // [1, 2, 3, 4, 5, [6, 7]]
```

`slice()` 方法用于创建一个包含原有数组中一个或多个元素的新数组。他可以接收一个或两个参数：返回元素的开始索引和结束索引。

- 一个参数：返回该索引到数组末尾的所有元素。
- 两个参数：返回从开始索引和结束索引对应的所有元素，不包含结束索引对应的元素。

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.slice(2)) // [3, 4, 5]
console.log(numbers.slice(2, 4)) // [3, 4]
```

`join()` 方法接受一个参数，即字符串分隔符，返回包含所有元素的字符串。

- 如果不给 `join()` 传递参数，或者传入 `undefined`，则仍然使用 `,` 作为分隔符。

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.join()) // 1, 2, 3, 4, 5
console.log(numbers.join('|')) // 1|2|3|4|5
```

### 填充和复制方法

ES6 新增了两个方法：填充数组方法 `fill()` 以及批量复制方法 `copyWithin()`。

使用 `fill()` 方法可以向一个已有的数组中插入全部或部分的值。开始索引用于指定开始填充的位置，它是可选的。如果不提供结束索引，则一直填充到数组末尾。

```js
const numbers = [0, 0, 0, 0, 0]
const reset = () => (numbers = [0, 0, 0, 0, 0])

// 用 5 填充整个数组
numbers.fill(5) // [5, 5, 5, 5, 5]
reset()
// 用 6 填充索引大于等于 3 的元素
numbers.fill(6, 3) // [0, 0, 0, 6, 6]
reset()
// 用 7 填充索引大于等于 1 且小于 3 的元素
numbers.fill(7, 1, 3) // [0, 7, 7, 0, 0]
reset()
// 支持负值索引
// [-3 + numbers.length = 2]
// [-1 + numbers.length = 4]
// 用 8 填充索引大于等于 2 且小于 4 的元素
numbers.fill(8, -3, -1) // [0, 0, 8, 8, 0]
```

与 `fill()` 不同，`copyWithin()` 会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。开始索引和结束索引则与 `fill()` 使用同样的计算方法。

```js
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const reset = () => (numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

// 从 numbers 复制索引 0 开始的内容插入到索引 5 开始的位置
numbers.copyWithin(5) // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset()
// 从 numbers 复制索引 5 开始的内容插入到索引 0 开始的位置
numbers.copyWithin(5, 0) // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset()
// 从 numbers 复制索引 0 开始到索引 3 结束的内容插入到索引 4 开始的位置
numbers.copyWithin(4, 0, 3) // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
reset()
// 支持负值索引
// [-4 + numbers.length = 6]
// [-7 + numbers.length = 3]
// [-3 + numbers.length = 7]
// 从 numbers 复制索引 3 开始到索引 7 结束的内容插入到索引 6 开始的位置
numbers.copyWithin(-4, -7, -3) // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
```

> 需要注意的是，这两个方法静默忽略超出数组边界、零长度及方向相反的索引范围。

## 数组方法分类

上述这些数组的方法可以按照**是否影响原数组**分为两类：

- 影响原数组：`push()`、`pop()`、`shift()`、`unshift()`、`sort()`、`reverse()`、`splice()`；
- 不影响原数组：`map()`、`forEach()`、`filter()`、`every()`、`some()`、`reduce()`、`reduceRight()`、`concat()`、`slice()`、`join()`

## 类型数组

与 C 和 Java 等其他语言不同， JavaScript 数组不是强类型的，因此它可以存储任意类型的数据。

类型数组则用于存储单一类型的数据。它的语法是 `const array = new TypedArray(length)`，其中 `TypedArray` 需要替换成下表所列之一：

| 类型数组            | 数据类型            |
| ------------------- | ------------------- |
| `Int8Array`         | 8 位二进制补码整数  |
| `Uint8Array`        | 8 位无符号整数      |
| `Uint8ClampedArray` | 8 位无符号整数      |
| `Int16Array`        | 16 位二进制补码整数 |
| `Uint16Array`       | 16 位无符号整数     |
| `Int32Array`        | 32 位二进制补码整数 |
| `Uint32Array`       | 32 位无符号整数     |
| `Float32Array`      | 32 位 IEEE 浮点数   |
| `Float64Array`      | 64 位 IEEE 浮点数   |

```js
const length = 5
const int16 = new Int16Array(length)
console.log(int16) // Int16Array(5) [ 0, 0, 0, 0, 0 ]

for (let i = 0; i < length; i++) {
  int16[i] = i + 1
}
console.log(int16) // Int16Array(5) [ 1, 2, 3, 4, 5 ]
```

使用 WebGL API、进行位操作、处理文件和图像时，类型数组可以大展拳脚，它用起来和普通数组毫无二致，上述的数组方法和功能同样适用于类型数组。

> <https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/> 是一个很好的教程，讲解了如何使用类型数组处理二进制数据，以及它在实际项目中的应用。
