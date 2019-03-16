# element

> A Vue.js project

## Build Setup

## 技术点

> $nextTick 的使用
```
1、Vue 实现响应式并不是数据发生变化之后 DOM 立即变化他是一个异步的过程，而是按一定的策略进行 DOM 的更新。
2、$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM

```
> 关于类名的映射222 33

```
1、通过绑定的 class 类名渲染不同的类名
    :class="classMap[item.type]"
2、数据
    this.classMap = ['decrease','discount','guarantee','invoice','special']

```

> 小星星组件的做法

```
 1、定义常量标记
 2、通过计算属性判断出有几个完整的星星，有没有半星，如果长度没有5颗星，要补全没有的星星
 3、把这些都放到数组里面，通过循环遍历给类名，渲染出来

```
> goods页面左右滚动关联的效果

```
 1、引入 better-iscroll
 2、设置 better-iscroll 的初始化绑定 ref 设置的 DOM 元素
```
> ShopCart 组件的做法

```
1、创建一个 selectFoods 的对象，这个对象里面的值是由父组件传值过来的，在这个组件中使用 default 默认值来调试功能
2、配送费 deliveryPrice 和 minPrice 最小金额送餐费是从父组件的 seller 对象里面传过来的值，直接渲染到页面上
3、总价格 totalPrice 是由 selectFoods 里面的 price 和 count 组成 价格和数量相乘使用计算属性 并且要判断如果总价格大于0的话是另外的样式，通过绑定类名去做
4、总数量 totalCount 通过计算属性去添加 父组件传过来的count叠加，再做一个子绝父相，把数组渲染到 购物车图标左上角，并且设置 v-show 要在coun > 0 的情况下再显示这个数字
5、付款 payDesc 有三种可能，一种是没有达到最低配送金额，就显示 ”还差多少钱可以配送“ 第二种是达到配送金额 显示 “结算” 第三种是 金额为 0 显示 “多少钱起送”，三种不同情况对应一种颜色，根据绑定类名，通过计算属性实现

```