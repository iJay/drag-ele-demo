<template>
  <div
    class="widget-wrapper"
    :class="[selected ? 'selected' : '']"
    @click="handleSelectedClick"
    :style="componentData.style"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="left-bottom-operation" v-show="selected">
      <i
        class="operation-icon el-icon-delete"
        title="删除"
        @click="handleDeleteComponent"
      ></i>
      <i
        class="operation-icon el-icon-top"
        title="置顶"
        @click="handleMoveToTop"
      ></i>
      <i
        class="operation-icon el-icon-bottom"
        title="置底"
        @click="handleMoveToBottom"
      ></i>
      <i
        v-show="selected"
        class="operation-icon el-icon-setting"
        title="设置"
      ></i>
    </div>
    <component
      :is="componentData.componentName"
      :componentData="componentData"
      ref="wrapperComponent"
    ></component>
  </div>
</template>

<script>
// import _ from "lodash";
import { mapActions, mapState } from "vuex";
import { generateId } from "@/utils";
export default {
  name: "WidgetWrapper",
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
      const widgetItem = this.componentData;
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", widgetItem.componentName);
      let data;
      if (!widgetItem.id) {
        data = {
          componentName: widgetItem.componentName,
          id: generateId(),
        };
      } else {
        data = {
          componentName: widgetItem.componentName,
          id: widgetItem.id,
        };
      }
      e.dataTransfer.setData("application/json", JSON.stringify(data));
    },
    // handleStartResize(event) {
    //   this.isResizing = true;
    //   this.startY = event.clientY;
    //   this.startHeight =
    //     this.$refs.containerComponent.$el.getBoundingClientRect().height;

    //   document.addEventListener("mousemove", _.throttle(this.resize, 100));
    //   document.addEventListener("mouseup", this.stopResize);
    // },
    // resize(event) {
    //   if (this.isResizing) {
    //     const deltaY = event.clientY - this.startY;
    //     this.newHeight = this.startHeight + deltaY;
    //     this.$refs.containerComponent.$el.style.height = `${this.newHeight}px`;
    //   }
    // },
    // stopResize(e) {
    //   e.stopPropagation();
    //   this.updateComponentAttr({
    //     id: this.componentData.id,
    //     attrKey: "height",
    //     attrValue: `${this.newHeight}px`,
    //   });
    //   this.isResizing = false;
    //   document.removeEventListener("mousemove", this.resize);
    //   document.removeEventListener("mouseup", this.stopResize);
    // },
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
