# 门户低代码

## 一、数据流
所有关于组件的数据都保存在store的componentData中，组件数据的更新也是通过派发相应的action进行数据的修改，从而更新整个页面。
componentData是嵌套的树状数据结构，如下所示：
```javascript
componentData = [
  {
    id: "123123123",
    componentName: "freedom-conatiner",
    label: "自由容器",
    style: {
      position: "relative"
    },
    children: [
      {
        id: "2323232323"
        componentName: "text-widget",
        label: "文本组件",
        style: {
          position: "absolute",
          top: "100px",
          left: "40px"
        },
      },
      ...
    ]
  }
]
```
## 二、组件分类

### 容器组件

1. 自由容器 FreedomContainer 容器内元素遵循绝对定位的布局方式。
2. Flex容器 FlexContainer 容器内元素遵循flex的布局方式。
3. Main容器 MainContainer，默认只存在于最外层，有最大宽度的限制。
4. Section容器 SectionConatiner，撑满整个所在父元素，容器内元素遵循普通文档流的布局方式。

### Widget组件
1. 文字组件
2. 按钮组件
3. 图片组件
4. 文章列表组件（业务组件，待定）
5. 文章轮播 （业务组件，待定）
6. 轮播图
7. 导航栏组件
8. Tab组件

## 三、截止到8月20日需要完成的功能点

1. 编辑器。 ✔
2. 渲染器。✔
3. 容器组件FreedomContainer支持拖拽高度的功能。 ✔
4. ImageWidget、TextWidget组件支持拖拽自身修改自身的高度，宽度。✔
5. 容器组件FreedomContainer内部元素的拖拽支持对齐。✔
6. ImageWidget组件支持图片上传。❌
7. 抽象一个组件用于上移、下移、设置、删除、调整大小的功能。 ✔
8. 工具箱支持自由拖拽到任意位置。❌
9. 撤销、恢复操作。✔
10. 容器内排版规则，不允许拖拽元素边缘超越容器边缘。❌
11. z-index容器内元素从1开始计算。❌

## 四、更改记录

### 2023-08-23 更新
1. 拖拽效果不再依靠drop和dragover等WebAPI的实现，改用自定义程度更高的mousedown和mouseup事件。

### 2023-08-24 更新
1. 优化updateComponentStyle方法，可以一次性修改多个属性值。
2. 修改改变widget元素大小，样式错乱的问题。

### 2023-08-28 更新
1. 实现容器内元素的吸附对齐问题。
2. 优化容器内z-index的计算方法问题。
3. 确认并区分Main容器和Freedom容器的功能点。
4. 修改拖拽元素宽高，元素位置发生偏移的问题。

### 2023-09-05 更新
1. 实现并优化容器内元素的吸附对齐问题。
2. 渲染器的初步实现。

### 2023-09-06 更新
1. 撤销和恢复功能开发。
2. 预览功能优化。