<template>
  <div class="freedom-container" ref="freedomContainer">
    <div
      class="content-container"
      ref="contentContainer"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <component
        v-for="el in componentData.children"
        :componentData="el"
        :class="['drag-element']"
        draggable="true"
        @dragstart="(e) => handleDragStart(e, el)"
        :is="el.componentName"
        :key="el.id"
        :style="el.style"
      ></component>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
import getWidgetInitAttr from "@/config/widgetInitAttr.js";
export default {
  name: "FreedomConatiner",
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions(["addComponent", "updateComponentAttr"]),
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleDragStart(e, widgetItem) {
      e.stopPropagation();
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
      const transferData =
        e.dataTransfer.getData("application/json") &&
        JSON.parse(e.dataTransfer.getData("application/json"));
      const hasExistComponent = this.componentData.children.find(
        (item) => item.id === transferData.id
      );
      const widget = this.$store.state.widgets.find(
        (item) => item.componentName === transferData.componentName
      );
      if (!hasExistComponent) {
        if (widget) {
          const componentOpt = _.cloneDeep(widget);
          const { initWidth, initHeight } =
            getWidgetInitAttr()[componentOpt.componentName];
          const positionX =
            e.pageX -
            this.$refs.contentContainer.getBoundingClientRect().x -
            this.$store.state.coordinate.mouseInEleX * parseInt(initWidth);
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const positionY =
            e.pageY -
            this.$refs.contentContainer.getBoundingClientRect().y -
            0.5 * parseInt(initHeight) -
            scrollTop;
          componentOpt.style = {
            ...widget.style,
            position: "absolute",
            top: `${positionY}px`,
            left: `${positionX}px`,
          };
          this.addComponent({
            parentId: this.componentData.id,
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
          this.$refs.contentContainer.getBoundingClientRect().x -
          this.$store.state.coordinate.mouseInEleX * parseInt(initWidth);
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const positionY =
          e.pageY -
          this.$refs.contentContainer.getBoundingClientRect().y -
          0.5 * parseInt(initHeight) -
          scrollTop;
        const hasExistComponentStyle = {
          ...widget.style,
          position: "absolute",
          top: `${positionY}px`,
          left: `${positionX}px`,
        };
        // 修改组件属性
        this.updateComponentAttr({
          id: hasExistComponent.id,
          attrKey: "style",
          attrValue: hasExistComponentStyle,
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
  position: relative;

  &:hover {
    .content-container {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .content-container {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>
