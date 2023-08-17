<template>
  <div
    class="freedom-container"
    :class="[componentData.selected ? 'selected' : '']"
    ref="freedomContainer"
    @dragstart="$listeners.dragstart"
    @click="handleClick"
  >
    <i
      class="delete-icon"
      v-if="componentData.selected"
      @click="handleDeleteItem"
    >
      删除
    </i>
    <i
      class="top-arrow-icon"
      v-if="componentData.selected"
      @click="handleMoveToTop"
    >
      上移
    </i>
    <i
      class="bottom-arrow-icon"
      v-if="componentData.selected"
      @click="handleMoveToBottom"
    >
      下移
    </i>
    <i class="setting-icon" v-if="componentData.selected">设置</i>
    <i
      class="el-icon-d-caret"
      v-if="componentData.selected"
      @mousedown="startResize"
    ></i>
    <div
      class="content-container"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <component
        v-for="el in componentData.children"
        :componentData="el"
        :class="['drag-element']"
        draggable="true"
        @dragstart="(e) => handleDragStart(e, el)"
        :key="el.id"
        :is="el.componentName"
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
  data() {
    return {
      mouseInDragEndEleX: 0,
      mouseInDragEndEleY: 0,
      isResizing: false,
      startY: 0,
      startHeight: 0,
      newHeight: 0,
    };
  },
  methods: {
    ...mapActions([
      "addComponent",
      "deleteComponent",
      "moveToTop",
      "moveToBottom",
      "updateComponentAttr",
      "updateSelected",
    ]),
    startResize(event) {
      this.isResizing = true;
      this.startY = event.clientY;
      this.startHeight =
        this.$refs.freedomContainer.getBoundingClientRect().height;

      document.addEventListener("mousemove", _.throttle(this.resize, 100));
      document.addEventListener("mouseup", this.stopResize);
    },
    resize(event) {
      if (this.isResizing) {
        const deltaY = event.clientY - this.startY;
        this.newHeight = this.startHeight + deltaY;
        this.$refs.freedomContainer.style.height = `${this.newHeight}px`;
      }
    },
    stopResize(e) {
      e.stopPropagation();
      this.updateComponentAttr({
        id: this.componentData.id,
        attrKey: "height",
        attrValue: `${this.newHeight}px`,
      });
      this.isResizing = false;
      document.removeEventListener("mousemove", this.resize);
      document.removeEventListener("mouseup", this.stopResize);
    },
    handleClick(e) {
      e.stopPropagation();
      this.updateSelected({
        id: this.componentData.id,
        selected: !this.componentData.selected,
      });
    },
    handleDragOver(e) {
      console.log(e);
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleDeleteItem(e) {
      console.log(e);
      e.stopPropagation();
      this.$confirm("确定删除该组件吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.deleteComponent(this.componentData.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleMoveToTop(e) {
      e.stopPropagation();
      this.moveToTop(this.componentData.id);
    },
    handleMoveToBottom(e) {
      e.stopPropagation();
      this.moveToBottom(this.componentData.id);
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
          this.$refs.freedomContainer.getBoundingClientRect().x -
          this.$store.state.coordinate.mouseInEleX * parseInt(initWidth);
        const positionY =
          e.pageY -
          this.$refs.freedomContainer.getBoundingClientRect().y -
          this.$store.state.coordinate.mouseInEleY * parseInt(initHeight);
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
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  &.selected {
    border: 1px dashed #409eff;

    .delete-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 4px 8px;
      font-size: 12px;
      color: #fff;
      background-color: #f56c6c;
      cursor: pointer;
      z-index: 9;
    }

    .setting-icon {
      position: absolute;
      bottom: 0;
      right: 46px;
      padding: 4px 8px;
      font-size: 12px;
      color: #fff;
      background-color: #409eff;
      cursor: pointer;
      z-index: 9;
    }

    .top-arrow-icon {
      position: absolute;
      bottom: 0;
      right: 138px;
      padding: 4px 8px;
      font-size: 12px;
      color: #fff;
      background-color: #409eff;
      cursor: pointer;
      z-index: 9;
    }

    .bottom-arrow-icon {
      position: absolute;
      bottom: 0;
      right: 92px;
      padding: 4px 8px;
      font-size: 12px;
      color: #fff;
      background-color: #409eff;
      cursor: pointer;
      z-index: 9;
    }

    .el-icon-d-caret {
      position: absolute;
      bottom: -9px;
      left: 50%;
      margin-left: -8px;
      cursor: ns-resize;
      z-index: 9;
    }
  }
}
</style>
