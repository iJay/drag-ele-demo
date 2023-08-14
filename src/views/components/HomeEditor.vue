<template>
  <div class="home-editor">
    <div v-if="!componentData || componentData.length === 0" class="tip-text">
      <p>请点击创建页面</p>
      <el-button type="primary" size="mini" @click="handleCreatePage">
        创建页面
      </el-button>
    </div>
    <main-container v-else :componentData="componentData && componentData[0]" />
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
    ...mapActions(["addComponent"]),
    handleCreatePage() {
      const componentOpt = {
        componentName: "MainContainer",
        style: {
          width: "1200px",
        },
        children: [],
      };
      this.addComponent({
        parentId: null,
        component: componentOpt,
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
}
</style>
