<template>
  <div
    class="widget-wrapper"
    :class="[selected ? 'selected' : '']"
    @click="handleSelectedClick"
    :style="componentData.style"
    ref="widgetWrapper"
    draggable
    @mousedown="handleDragStart"
  >
    <div class="left-bottom-operation" v-show="selected">
      <i
        class="operation-icon el-icon-delete"
        title="删除"
        @click="handleDeleteComponent"
      ></i>
      <i
        class="operation-icon el-icon-top"
        title="置于顶部"
        @click="handleMoveToTop"
      ></i>
      <i
        class="operation-icon el-icon-bottom"
        title="置于底部"
        @click="handleMoveToBottom"
      ></i>
      <i
        v-show="selected"
        class="operation-icon el-icon-setting"
        title="设置"
      ></i>
    </div>
    <template v-if="selected">
      <i
        class="drag-dot"
        :class="`drag-dot—${item}`"
        v-for="(item, index) in 4"
        :key="index"
        @mousedown="(e) => handleStartResize(e, item)"
      ></i>
    </template>
    <component
      :is="componentData.componentName"
      :componentData="componentData"
      ref="wrapperComponent"
    ></component>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState } from "vuex";
// import { generateId } from "@/utils";
export default {
  name: "WidgetWrapper",
  data() {
    return {
      isDragging: false,
      initialPageX: 0,
      initialPageY: 0,
      eleNewPositionX: 0,
      eleNewPositionY: 0,
      eleStartPositionX: 0,
      eleStartPositionY: 0,
      isResizing: false,
      startX: 0,
      startY: 0,
      startHeight: 0,
      startWidth: 0,
      newHeight: 0,
      newWidth: 0,
      positionStartX: 0,
      positionStartY: 0,
      positionX: 0,
      positionY: 0,
    };
  },
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
    parentId: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["currentSelectedComponent"]),
    selected() {
      return (
        this.currentSelectedComponent &&
        this.currentSelectedComponent.id === this.componentData.id
      );
    },
  },
  methods: {
    ...mapActions([
      "updateComponentAttr",
      "moveToTop",
      "moveToBottom",
      "deleteComponent",
      "updateSelectedComponent",
      "updateZIndexToTop",
      "updateZIndexToBottom",
    ]),
    handleSelectedClick(e) {
      e.stopPropagation();
      this.updateSelectedComponent(this.componentData.id);
    },
    handleDragStart(e) {
      e.preventDefault();
      console.log("handleDragStart", e);
      this.isDragging = true;
      this.initialPageX = e.pageX;
      this.initialPageY = e.pageY;
      this.eleStartPositionX = this.$refs.widgetWrapper.offsetLeft;
      this.eleStartPositionY = this.$refs.widgetWrapper.offsetTop;
      document.addEventListener("mousemove", _.throttle(this.handleDrag, 100));
      document.addEventListener("mouseup", this.stopDrag);
    },
    handleDrag(e) {
      e.preventDefault();
      console.log("handleDrag", e);
      if (this.isDragging) {
        const deltaX = e.pageX - this.initialPageX;
        const deltaY = e.pageY - this.initialPageY;
        this.eleNewPositionX = this.eleStartPositionX + deltaX;
        this.eleNewPositionY = this.eleStartPositionY + deltaY;
        console.log("handleDrag", this.eleNewPositionX, this.eleNewPositionY);
        this.$refs.widgetWrapper.style.left = `${this.eleNewPositionX}px`;
        this.$refs.widgetWrapper.style.top = `${this.eleNewPositionY}px`;
      }
    },
    stopDrag() {
      console.log("stopDrag");
      this.isDragging = false;
      this.updateComponentAttr({
        id: this.componentData.id,
        attrKey: "top",
        attrValue: `${this.eleNewPositionX}px`,
      });
      this.updateComponentAttr({
        id: this.componentData.id,
        attrKey: "left",
        attrValue: `${this.eleNewPositionY}px`,
      });
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    handleStartResize(event, item) {
      console.log("handleStartResize");
      event.stopPropagation();
      event.preventDefault();
      this.dragDotIndex = item;
      this.isResizing = true;
      this.startY = event.clientY;
      this.startX = event.clientX;
      this.positionStartX = this.$refs.widgetWrapper.offsetLeft;
      this.positionStartY = this.$refs.widgetWrapper.offsetTop;
      this.startHeight =
        this.$refs.wrapperComponent.$el.getBoundingClientRect().height;
      this.startWidth =
        this.$refs.wrapperComponent.$el.getBoundingClientRect().width;
      document.addEventListener("mousemove", _.throttle(this.resize, 100));
      document.addEventListener("mouseup", this.stopResize);
    },
    resize(event) {
      if (this.isResizing) {
        let deltaX, deltaY;
        // TODO：待优化 硬编码
        if ([2, 3].includes(this.dragDotIndex)) {
          deltaX = event.clientX - this.startX;
          if (this.dragDotIndex === 2) {
            this.newWidth = this.startWidth - deltaX;
            this.positionX = this.positionStartX + deltaX;
            console.log("this.positionX", this.positionX);
            this.$refs.widgetWrapper.style.left = `${this.positionX}px`;
          } else {
            this.newWidth = this.startWidth + deltaX;
          }
          this.$refs.wrapperComponent.$el.style.width = `${this.newWidth}px`;
        } else {
          deltaY = event.clientY - this.startY;
          if (this.dragDotIndex === 1) {
            this.newHeight = this.startHeight - deltaY;
            this.positionY = this.positionStartY + deltaY;
            console.log("this.positionY", this.positionY);
            this.$refs.widgetWrapper.style.top = `${this.positionY}px`;
          } else {
            this.newHeight = this.startHeight + deltaY;
          }
          this.$refs.wrapperComponent.$el.style.height = `${this.newHeight}px`;
        }
      }
    },
    stopResize(e) {
      e.stopPropagation();
      // TODO: updateComponentAttr待优化 支持多个属性同时更新
      this.updateComponentAttr({
        id: this.componentData.id,
        attrKey: "height",
        attrValue: `${this.newHeight}px`,
      });
      this.updateComponentAttr({
        id: this.componentData.id,
        attrKey: "width",
        attrValue: `${this.newWidth}px`,
      });
      if ([1, 2].includes(this.dragDotIndex)) {
        console.log("this.updateComponentAttr");
        this.updateComponentAttr({
          id: this.componentData.id,
          attrKey: "left",
          attrValue: `${this.positionX}px`,
        });
        this.updateComponentAttr({
          id: this.componentData.id,
          attrKey: "top",
          attrValue: `${this.positionY}px`,
        });
      }
      this.isResizing = false;
      document.removeEventListener("mousemove", this.resize);
      document.removeEventListener("mouseup", this.stopResize);
    },
    handleMoveToTop(e) {
      this.updateZIndexToTop({
        id: this.componentData.id,
        parentId: this.parentId,
      });
      e.stopPropagation();
    },
    handleMoveToBottom(e) {
      this.updateZIndexToBottom({
        id: this.componentData.id,
        parentId: this.parentId,
      });
      e.stopPropagation();
    },
    handleDeleteComponent(e) {
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
  },
};
</script>

<style lang="scss">
.widget-wrapper {
  position: relative;
  display: inline-block;

  .drag-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1px solid #409eff;
    border-radius: 100%;
    background: #fff;
    &.drag-dot—1 {
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      cursor: n-resize;
    }
    &.drag-dot—2 {
      top: 50%;
      left: -4px;
      transform: translateY(-50%);
      cursor: w-resize;
    }
    &.drag-dot—3 {
      top: 50%;
      right: -4px;
      transform: translateY(-50%);
      cursor: e-resize;
    }
    &.drag-dot—4 {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      cursor: s-resize;
    }
  }

  &.selected {
    border: 1px dashed #409eff;
    cursor: move;
    .operation-icon {
      cursor: pointer;
      background: #ccc;
    }

    .left-bottom-operation {
      position: absolute;
      bottom: 0px;
      right: 0px;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-content: center;
      & > i {
        margin-left: 12px;
      }
    }
    .el-icon-rank {
      position: absolute;
      top: 0px;
      left: 0px;
      cursor: move;
      z-index: 9;
    }
  }
}
</style>
