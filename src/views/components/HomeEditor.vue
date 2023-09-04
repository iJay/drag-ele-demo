<template>
  <div class="home-editor">
    <div v-if="!componentData || componentData.length === 0" class="tip-text">
      <p>请点击创建页面</p>
      <el-button type="primary" size="mini" @click.native="handleCreatePage">
        创建页面
      </el-button>
    </div>
    <main-container v-else :componentData="componentData && componentData[0]" />
    <div class="btn-group" v-if="this.componentData[0]">
      <el-button type="primary" size="mini" @click="handleAddContainer">
        添加通栏
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "HomeEditor",
  computed: {
    ...mapState(["componentData"]),
  },
  methods: {
    ...mapActions(["addComponent", "updateSelected"]),
    handleCreatePage() {
      const componentOpt = {
        componentName: "main-container",
        style: {
          width: "1200px",
        },
        children: [],
        selected: false,
      };
      this.addComponent({
        parentId: null,
        component: componentOpt,
      });
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
        parentId: this.componentData[0] && this.componentData[0].id,
        component,
      });
    },
  },
};
</script>

<style lang="scss">
.home-editor {
  position: relative;
  .tip-text {
    margin-top: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
    p {
      margin-right: 8px;
    }
  }
  .btn-group {
    margin-top: 32px;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
