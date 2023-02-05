# 栈

栈是一种遵从**后进先出**（LIFO）原则的有序集合。新添加和待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。

> 在栈里，新元素都靠近栈顶，旧元素都接近栈底。

我们将创建一个类来表示栈：

```js
class Stack {}
```

## 实现 - 基于数组

我们需要一种数据结构来保存栈里的元素，这里我们可以选择数组。数组允许我们在任何位置添加或删除元素。由于栈遵循 LIFO 原则，需要对元素的插入和删除功能进行限制。接下来，要为栈声明一些方法。

```js
constructor() {
  this.items = []
}
```

- `push(element(s))`：添加一个（或几个）新元素到栈顶。
- `pop()`：移除栈顶的元素，同时返回被移除的元素。
- `peek()`：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。
- `isEmpty()`：如果栈里没有任何元素就返回 true，否则返回 false。
- `size()`：返回栈里的元素个数。
- `clear()`：移除栈里的所有元素。

1. 首先我们来实现 `push` 方法。该方法负责往栈里添加新元素，有一点很重要：该方法只添加元素到栈顶，也就是栈的末尾。因为我们是基于数组实现的，因此我们可以使用数组中的 `push` 方法来实现：

```js
push(elements) {
  this.items.push(elements)
}
```

2. 接下来我们来实现 `pop` 方法。该方法主要用来移除栈里的元素。栈遵从 LIFO 原则，因此移出的是最后添加进来的元素。同样我们可以使用数组中的 `pop` 方法来实现：

```js
pop() {
  return this.items.pop()
}
```

3. 现在，为我们的类实现一些额外的辅助方法。如果想知道栈里最后添加的元素是什么，可以用 `peek` 方法。该方法将返回栈顶的元素。

```js
peek() {
  return this.items[this.items.length - 1]
}
```

4. 下一个要实现的方法是 `isEmpty`，如果栈为空的话将返回 `true`，否则就返回 `false`。

```js
isEmpty() {
  return this.items.length === 0
}
```

通过使用 `isEmpty` 方法，我们能简单地判断内部数组的长度是否为 0。

类似于数组的 `length` 属性，我们也能实现栈的 `length`。对于集合，最好用 `size` 代替 `length`。

```js
size() {
  reutrn this.items.length
}
```

5. 最后我们来实现 `clear` 方法。该方法用来移出栈里所有的元素，把栈清空。我们可以用最简单的方法来实现：

```js
clear() {
  this.items = []
}
```

## 实现 - 基于对象

创建一个 Stack 类最简单的方式是使用一个数组来存储元素。在处理大量数据的时候，我们同样需要来评估如何操作数据是最高效的。在使用数组时，大部分方法的时间复杂度是 `O(n)`，其中 `n` 代表数组的长度。

- 如果数组有更多的元素的话，所需的时间会更长。
- 另外，数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。

如果我们能直接获取元素，占用较少的内存空间，并且仍然保证所有元素按照我们的需要排列，那不是更好吗？

- 对于使用 JavaScript 语言实现栈数据结构的场景，我们也可以使用一个 JavaScript 对象来存储所有的栈元素，保证它们的顺序并且遵循 LIFO 原则。

```js
class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }
}
```

同样，我们需要为 Stack 类声明一些方法：`push`、`pop`、`peek`、`isEmpty`、`size`、`clear`、`toString`。

1. 在基于数组的版本中，我们可以同时向 Stack 类中添加多个元素。但是由于我们现在是基于对象实现的，因此每次 `push` 时只允许我们一次插入一个元素。

```js
push(element) {
  this.items[this.count++] = element
}
```

2. 由于我们使用的 JavaScript 对象来存储元素，因此我们需要手动实现移除元素的逻辑。

```js
pop() {
  if (this.isEmpty()) return undefined
  this.count--
  const result = this.items[this.count]
  delete this.items[this.count]
  return result
}
peek() {
  if (this.isEmpty()) return undefined
  return this.items[this.count - 1]
}
```

3. 接下来我们来实现 `isEmpty` 和 `size` 方法。由于我们在初始化时声明了属性 `count` 用来存储栈内元素的数量，因此可以借 `count` 轻松实现这两个方法。

```js
isEmpty() {
  return this.count === 0
}
size() {
  return this.count
}
```

4. 最后我们来实现一下 `clear` 和 `toString` 方法。

- 在数组版本中，我们不需要关心 `toString` 方法的实现，因为数据结构可以直接使用数组已提供的 `toString` 方法。
- 对于对象版本中，我们需要自己创建一个 `toString` 方法来像数组一样打印出栈的内容。

```js
clear() {
  this.items = {}
  this.count = 0
}
toString() {
  if (this.isEmpty()) return ''
  let result = `${this.items[0]}`
  for (let i = 1; i < this.count; i++) {
    result += `,${this.items[i]}`
  }
  return result
}
```

> 除了 `toString` 方法，我们创建的其他方法的复杂度均为 `O(1)`, 代表我们可以直接找到目标元素并对其进行操作（`push`、`pop` 或 `peek`）

## Stack 类的使用

在深入了解栈的应用前， 我们先来学习如何使用 Stack 类。

```js
// 初始化类，并验证栈是否为空
const stack = new Stack()
console.log(stack.isEmpty()) // true
// 向栈里添加一些元素（可以使任意类型的元素）
stack.push(5)
stack.push(8)
// 此时调用 peek 方法，将输出 8，因为它是往栈里添加的最后一个元素。
console.log(stack.peek()) // 8
// 再添加一个元素
stack.push(11)
console.log(stack.size()) // 3
console.log(stack.isEmpty()) // false
stack.push(15)
```

下图绘制了目前为止我们对栈的操作，以及栈的当前状态。

![Stack 类的使用](/data_structure-algorithm/use_example_of_stack.png)

## 用栈解决问题

栈的实际应用非常广泛。在回溯问题中，他可以存储访问过的任务或路径、撤销的操作。

既然我们已经了解了 Stack 类的用法，不妨用它来解决一些计算机科学问题。接下来我们将了解如何解决十进制转二进制问题，以及任意进制转换的算法。

### 从十进制到二进制

现实生活中，我们主要是用十进制。但在计算机科学中，二进制非常重要，因为计算机里的所有内容都是用二进制数字表示的（0 和 1）。没有十进制和二进制相互转化的能力，与计算机交流就很困难。

要把十进制转换成二进制，我们可以将该十进制数除以 2（二进制是满二进一）并对商取整，知道结果是 0 为止。举个例子，把十进制的数 10 转换成二进制的数字，过程大概如下：

![从十进制到二进制](/data_structure-algorithm/from_decimal_to_binary.png)

算法实现如下：

```js
function decimalToBinary(decNumber) {
  const remStack = new Stack()
  let number = decNumber
  let rem
  let binaryString = ''

  // 当除法的结果不为 0 时，继续循环
  while (number > 0) {
    // 将余数放入栈中
    rem = Math.floor(number % 2)
    remStack.push(rem)
    number = Math.floor(number / 2)
  }

  while (!remStack.isEmpty()) {
    // 通过 pop 方法将栈内的元素移除并拼接成字符串
    binaryString += remStack.pop().toString()
  }

  return binaryString
}
```

用刚才写的算法做一些测试，来验证代码是否符合预期。

```js
console.log(decimalToBinary(233)) // 11101001
console.log(decimalToBinary(10)) // 1010
console.log(decimalToBinary(1000)) // 1111101000
```

### 进制转换算法

我们可以修改之前的算法，使之能把十进制转换成基数为 2 ~ 36 的任意进制。除了把十进制数转成二进制数，还可以传入其他任意进制的基数为参数，就像下面这样：

```js
function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let number = decNumber,
    base = initBase
  let rem
  let baseString = ''

  if (base < 2) base = 2
  else if (base > 36) base = 36

  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }

  while (!remStack.isEmpty()) {
    // 从十一进制开始，字母表中的每个字母将表示相应的基数。
    baseString += digits[remStack.pop()]
  }

  return baseString
}
```

用刚才写的算法做一些测试，来验证代码是否符合预期。

```js
console.log(baseConverter(100345, 2)) // 11000011111111001
console.log(baseConverter(100345, 8)) // 303771
console.log(baseConverter(100345, 16)) // 187F9
console.log(baseConverter(100345, 35)) // 2BW0
```

### 匹配圆括号

案例一：给定一个只包括 `(`，`)`，`{`，`}`，`[`，`]`  的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

```js
function isBracketBalanced(str) {
  const leftBracketStack = new Stack()
  const brackets = str.split('')

  while (brackets.length) {
    const bracket = brackets.shift()
    switch (bracket) {
      case '(':
        leftBracketStack.push(')')
        break
      case '[':
        leftBracketStack.push(']')
        break
      case '{':
        leftBracketStack.push('}')
        break
      default:
        const leftBracket = leftBracketStack.pop()
        if (bracket !== leftBracket) return false
        break
    }
  }
  return leftBracketStack.isEmpty()
}
```

案例二：给定一个只包含 `(` 和 `)` 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

```js
function longestValidParentheses(str) {}
```

### 汉诺塔
