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
    ...mapState(["currentSelectedComponent", "ruleLine"]),
    selected() {
      return (
        this.currentSelectedComponent &&
        this.currentSelectedComponent.id === this.componentData.id
      );
    },
  },
  methods: {
    ...mapActions([
      "updateComponentStyle",
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
      e.stopPropagation();
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
      if (this.isDragging) {
        const deltaX = e.pageX - this.initialPageX;
        const deltaY = e.pageY - this.initialPageY;
        this.eleNewPositionX = this.eleStartPositionX + deltaX;
        this.eleNewPositionY = this.eleStartPositionY + deltaY;
        // 保证拖动元素跟随鼠标移动
        this.$refs.widgetWrapper.style.left = `${this.eleNewPositionX}px`;
        this.$refs.widgetWrapper.style.top = `${this.eleNewPositionY}px`;
        this.updateRuleLine(e);
      }
    },
    updateRuleLine(e) {
      const ruleLineTopPosition = e.pageY - e.offsetY - 60;
      this.ruleLine.style.display = "block";
      this.ruleLine.style.top = `${ruleLineTopPosition}px`;
    },
    stopDrag(e) {
      e.stopPropagation();
      // 防止点击事件触发
      if (
        this.isDragging &&
        this.eleNewPositionX !== 0 &&
        this.eleNewPositionY !== 0
      ) {
        this.updateComponentStyle({
          id: this.componentData.id,
          styleObj: {
            left: `${this.eleNewPositionX}px`,
            top: `${this.eleNewPositionY}px`,
          },
        });
      }
      this.isDragging = false;
      this.ruleLine.style.display = "none";
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    handleStartResize(event, item) {
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
    resize(e) {
      e.preventDefault();
      if (this.isResizing) {
        let deltaX, deltaY;
        // TODO：待优化 硬编码
        if ([2, 3].includes(this.dragDotIndex)) {
          deltaX = e.clientX - this.startX;
          this.positionY = this.positionStartY;
          this.newHeight = this.startHeight;
          if (this.dragDotIndex === 2) {
            this.newWidth = this.startWidth - deltaX;
            this.positionX = this.positionStartX + deltaX;
          } else {
            this.newWidth = this.startWidth + deltaX;
            this.positionX = this.positionStartX;
          }
          this.$refs.widgetWrapper.style.left = `${this.positionX}px`;
          this.$refs.widgetWrapper.style.width = `${this.newWidth}px`;
          this.$refs.wrapperComponent.$el.style.width = `${this.newWidth}px`;
        } else {
          deltaY = e.clientY - this.startY;
          this.positionX = this.positionStartX;
          this.newWidth = this.startWidth;
          if (this.dragDotIndex === 1) {
            this.newHeight = this.startHeight - deltaY;
            this.positionY = this.positionStartY + deltaY;
          } else {
            this.newHeight = this.startHeight + deltaY;
            this.positionY = this.positionStartY;
          }
          this.$refs.widgetWrapper.style.top = `${this.positionY}px`;
          this.$refs.widgetWrapper.style.height = `${this.newHeight}px`;
          this.$refs.wrapperComponent.$el.style.height = `${this.newHeight}px`;
        }
      }
    },
    stopResize(e) {
      e.stopPropagation();
      const styleObj = {
        width: `${this.newWidth}px`,
        height: `${this.newHeight}px`,
        left: `${this.positionX}px`,
        top: `${this.positionY}px`,
      };
      this.updateComponentStyle({
        id: this.componentData.id,
        ...styleObj,
      });
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
