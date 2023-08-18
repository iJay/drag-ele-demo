<template>
  <div
    class="main-container"
    :class="[componentData.selected ? 'selected' : '']"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @click="$listeners.click"
  >
    <i
      class="delete-icon"
      v-if="componentData.selected"
      @click="handleDeleteItem"
    >
      删除
    </i>
    <i class="setting-icon" v-if="componentData.selected">设置</i>
    <container-wrapper
      v-for="component in componentData.children"
      :key="component.id"
      :componentData="component"
      :style="component.style"
      @click="(e) => handleClick(e, component)"
      @dragstart="(e) => handleDragStart(e, component)"
    />
    <div class="btn-group">
      <el-button type="primary" size="mini" @click="handleAddContainer">
        添加
      </el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
export default {
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
  },
  name: "MainConatiner",
  methods: {
    ...mapActions(["addComponent", "deleteComponent"]),
    handleDeleteItem(e) {
      e.stopPropagation();
      this.deleteComponent(this.componentData.id);
    },
    handleAddContainer(e) {
      e.stopPropagation();
      const component = {
        componentName: "freedom-container",
        style: {},
        children: [],
        selected: false,
      };
      this.addComponent({
        parentId: this.componentData.id,
        component,
      });
    },
    handleDrop(e) {
      e.preventDefault();
      const transferData =
        e.dataTransfer.getData("application/json") &&
        JSON.parse(e.dataTransfer.getData("application/json"));
      const hasExist = this.$store.state.componentData.some(
        (item) =>
          item.id === transferData.id &&
          item.componentName === transferData.componentName
      );
      if (!hasExist) {
        const widget = this.$store.state.widgets.find(
          (item) => item.componentName === transferData.componentName
        );
        const componentOpt = _.cloneDeep(widget);
        componentOpt.id = transferData.id;
        this.addComponent({
          parentId: this.componentData.id,
          component: componentOpt,
        });
      }
    },
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleDragStart(e, component) {
      e.dataTransfer.setData("dragData", JSON.stringify(component));
    },
  },
};
</script>
<style lang="scss">
.main-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 83px);
  height: auto;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .btn-group {
    margin-top: 32px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    }
  }
}
</style>
