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
> 这个是创建分支后提交的代码