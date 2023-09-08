<template>
  <div class="home-header">
    <div class="left">
      <h2>门户低代码开发平台</h2>
      <div class="btn-group">
        <el-button type="text" size="mini" icon="el-icon-document">
          页面管理
        </el-button>
        <el-button
          type="text"
          size="mini"
          icon="el-icon-s-cooperation"
          @click="handleShowToolsModal"
        >
          工具箱
        </el-button>
      </div>
    </div>
    <div class="right">
      <div class="btn-group">
        <el-button size="mini" @click="undoSnapshot"> 撤销 </el-button>
        <el-button size="mini" @click="redoSnapshot"> 恢复 </el-button>
        <el-button type="primary" size="mini"> 保存 </el-button>
        <el-button size="mini" @click="handlePreview"> 预览 </el-button>
      </div>
    </div>
    <home-tool-modal
      v-show="isShowToolModal"
      @close="isShowToolModal = false"
    />
    <el-dialog
      title="页面预览"
      :visible.sync="isShowPreview"
      width="80%"
      :before-close="handleClosePreview"
      fullscreen
    >
      <home-preview :componentData="componentData" />
    </el-dialog>
  </div>
</template>

<script>
import HomeToolModal from "./HomeToolModal.vue";
import HomePreview from "./HomePreview";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomeHeader",
  components: {
    HomeToolModal,
    HomePreview,
  },
  data() {
    return {
      isShowToolModal: false,
      isShowPreview: false,
    };
  },
  computed: {
    ...mapState(["componentData"]),
  },
  methods: {
    ...mapActions(["undoSnapshot", "redoSnapshot"]),
    handleShowToolsModal() {
      this.isShowToolModal = true;
    },
    handleCloseToolModal() {
      this.isShowToolModal = false;
    },
    handlePreview() {
      this.isShowPreview = true;
    },
    handleClosePreview() {
      this.isShowPreview = false;
    },
  },
};
</script>

<style lang="scss">
.home-header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  padding: 0 32px;
  border-bottom: 1px solid #ccc;

  .left {
    flex: 0 0 50%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .btn-group {
      width: 200px;
      display: flex;
      align-items: center;
      margin-left: 80px;
    }
  }

  .right {
    flex: 0 0 50%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.tool-modal {
  width: 280px;
  height: 480px;
}
</style>
