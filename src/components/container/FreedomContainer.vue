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
      mouseInEleX: 0,
      mouseInEleY: 0,
    };
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault();
    },
    handleDragStart(e, widgetItem) {
      e.stopPropagation();
      // 记录当前拖动元素的鼠标在元素内的位置
      this.mouseInEleX = e.pageX - e.currentTarget.getBoundingClientRect().x;
      this.mouseInEleY = e.pageY - e.currentTarget.getBoundingClientRect().y;
      console.log(this.mouseInEleX, this.mouseInEleY);
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", widgetItem.componentName);
      const data = {
        componentName: widgetItem.componentName,
        id: widgetItem.id + widgetItem.componentName,
      };
      e.dataTransfer.setData("application/json", JSON.stringify(data));
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const transferData = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      const hasExist = this.componentData.some(
        (item) => item.id === transferData.id
      );
      if (!hasExist) {
        const component = this.$store.state.widgets.find(
          (item) => item.componentName === transferData.componentName
        );
        if (component) {
          const componentOpt = _.cloneDeep(component);
          componentOpt.id = `${componentOpt.id}-${
            componentOpt.componentName
          }-${new Date().getTime()}`;
          // 重新定义拖拽元素在容器内释放的位置
          console.log(
            "this.$refs.freedomContainer.offsetLeft: " +
              this.$refs.freedomContainer.getBoundingClientRect().x
          );
          const positionX =
            e.pageX -
            this.$refs.freedomContainer.getBoundingClientRect().x -
            this.mouseInEleX;
          const positionY =
            e.pageY -
            this.$refs.freedomContainer.getBoundingClientRect().y -
            this.mouseInEleY;
          componentOpt.style = {
            ...component.style,
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
        const positionX =
          e.pageX - this.$refs.freedomContainer.offsetLeft - this.mouseInEleX;
        const positionY =
          e.pageY - this.$refs.freedomContainer.offsetTop - this.mouseInEleY;
        const component = this.componentData.find(
          (item) => item.id === transferData.id
        );
        component.style = {
          ...component.style,
          position: "absolute",
          top: `${positionY}px`,
          left: `${positionX}px`,
        };
      }
    },
  },
};
</script>
<style lang="scss">
.freedom-container {
  width: 100%;
  height: 350px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
