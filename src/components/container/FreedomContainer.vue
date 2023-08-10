<template>
  <div
    class="freedom-container"
    ref="freedomContainer"
    @dragover="handleDragOver"
    @dragstart="$listeners.dragstart"
    @drop="handleDrop"
  >
    <component
      v-for="el in componentData"
      :componentData="el.children"
      :class="['drag-element']"
      draggable="true"
      @dragstart="(e) => handleDragStart(e, el)"
      :uniqueKey="el.id"
      :key="el.id"
      :is="el.componentName"
      :style="el.style"
    ></component>
  </div>
</template>

<script>
import _ from "lodash";
import getWidgetInitAttr from "@/config/widgetInitAttr.js";
export default {
  name: "FreedomConatiner",
  props: {
    uniqueKey: {
      type: String || Number,
      required: true,
    },
    componentData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mouseInDragEndEleX: 0,
      mouseInDragEndEleY: 0,
    };
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleDragStart(e, widgetItem) {
      e.stopPropagation();
      // 记录当前拖动元素的鼠标在元素内的位置
      this.mouseInDragEndEleX = this.$store.state.coordinate.mouseInEleX;
      this.mouseInDragEndEleY = this.$store.state.coordinate.mouseInEleY;
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", widgetItem.componentName);
      let data;
      if (!widgetItem.id) {
        data = {
          componentName: widgetItem.componentName,
          id: widgetItem.id + widgetItem.componentName,
        };
      } else {
        data = {
          componentName: widgetItem.componentName,
          id: widgetItem.id,
        };
      }
      e.dataTransfer.setData("application/json", JSON.stringify(data));
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const transferData = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      const hasExistComponent = this.componentData.find(
        (item) => item.id === transferData.id
      );
      console.log("hasExistComponent", hasExistComponent);
      const widget = this.$store.state.widgets.find(
        (item) => item.componentName === transferData.componentName
      );
      if (!hasExistComponent) {
        if (widget) {
          const componentOpt = _.cloneDeep(widget);
          componentOpt.id = `${componentOpt.id}-${
            componentOpt.componentName
          }-${new Date().getTime()}`;
          // 重新定义拖拽元素在容器内释放的位置
          // 这里的元素宽高需要给每一个组件一个初始值，放在widget属性里面
          const { initWidth, initHeight } =
            getWidgetInitAttr()[componentOpt.componentName];
          const positionX =
            e.pageX -
            this.$refs.freedomContainer.getBoundingClientRect().x -
            this.$store.state.coordinate.mouseInEleX * parseInt(initWidth);
          const positionY =
            e.pageY -
            this.$refs.freedomContainer.getBoundingClientRect().y -
            this.$store.state.coordinate.mouseInEleY * parseInt(initHeight);
          componentOpt.style = {
            ...widget.style,
            position: "absolute",
            top: `${positionY}px`,
            left: `${positionX}px`,
          };
          this.$store.dispatch("addComponent", {
            id: this.uniqueKey,
            component: componentOpt,
          });
        }
      } else {
        // 重新定义拖拽元素在容器内释放的位置
        // 这里的元素宽高需要给每一个组件一个初始值，放在widget属性里面
        const { initWidth, initHeight } =
          getWidgetInitAttr()[hasExistComponent.componentName];
        const positionX =
          e.pageX -
          this.$refs.freedomContainer.getBoundingClientRect().x -
          this.$store.state.coordinate.mouseInEleX * parseInt(initWidth);
        const positionY =
          e.pageY -
          this.$refs.freedomContainer.getBoundingClientRect().y -
          this.$store.state.coordinate.mouseInEleY * parseInt(initHeight);
        hasExistComponent.style = {
          ...widget.style,
          position: "absolute",
          top: `${positionY}px`,
          left: `${positionX}px`,
        };
        // 修改组件属性
        this.$store.dispatch("changeComponentAttr", {
          id: hasExistComponent.id,
          component: hasExistComponent,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.freedom-container {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
