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

想要给数组开头添加或者删除一个元素，并不是看起来那么容易，添加的话

### 任意位置
