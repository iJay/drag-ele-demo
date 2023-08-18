<template>
  <div
    class="conatiner-wrapper"
    :class="[selected ? 'selected' : '']"
    @click="handleSelectedClick"
  >
    <div class="left-bottom-operation" v-show="selected">
      <i
        class="operation-icon el-icon-delete"
        title="删除"
        @click="handleDeleteComponent"
      ></i>
      <i
        class="operation-icon el-icon-top"
        title="上移"
        @click="handleMoveToTop"
      ></i>
      <i
        class="operation-icon el-icon-bottom"
        title="下移"
        @click="handleMoveToBottom"
      ></i>
      <i
        v-show="selected"
        class="operation-icon el-icon-setting"
        title="设置"
      ></i>
    </div>
    <i
      v-show="selected"
      class="operation-icon el-icon-d-caret"
      @mousedown="handleStartResize"
      title="调整高度"
    ></i>
    <component
      :is="componentData.componentName"
      :componentData="componentData"
      ref="containerComponent"
    ></component>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState } from "vuex";
export default {
  name: "ContainerWrapper",
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isResizing: false,
      startY: 0,
      startHeight: 0,
      newHeight: 0,
    };
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
    ]),
    handleSelectedClick(e) {
      e.stopPropagation();
      this.updateSelectedComponent(this.componentData.id);
    },
    handleStartResize(event) {
      this.isResizing = true;
      this.startY = event.clientY;
      this.startHeight =
        this.$refs.containerComponent.$el.getBoundingClientRect().height;

      document.addEventListener("mousemove", _.throttle(this.resize, 100));
      document.addEventListener("mouseup", this.stopResize);
    },
    resize(event) {
      if (this.isResizing) {
        const deltaY = event.clientY - this.startY;
        this.newHeight = this.startHeight + deltaY;
        this.$refs.containerComponent.$el.style.height = `${this.newHeight}px`;
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
    handleMoveToTop(e) {
      e.stopPropagation();
      this.moveToTop(this.componentData.id);
    },
    handleMoveToBottom(e) {
      e.stopPropagation();
      this.moveToBottom(this.componentData.id);
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
.conatiner-wrapper {
  position: relative;

  &.selected {
    border: 1px dashed #409eff;
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
