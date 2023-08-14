<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <h2>门户低代码开发平台</h2>
        <div class="btn-group">
          <el-button type="text" size="mini" icon="el-icon-document">
            页面管理
          </el-button>
          <el-button type="text" size="mini" icon="el-icon-s-cooperation">
            工具箱
          </el-button>
        </div>
      </div>
      <div class="right">
        <div class="btn-group">
          <el-button size="mini"> 撤销 </el-button>
          <el-button size="mini"> 恢复 </el-button>
          <el-button type="primary" size="mini"> 保存 </el-button>
          <el-button size="mini"> 预览 </el-button>
        </div>
      </div>
    </div>
    <div class="main-content">
      <HomeEditor />
    </div>
  </div>
</template>

<script>
import HomeEditor from "./components/HomeEditor.vue";
export default {
  name: "HomeView",
  components: {
    HomeEditor,
  },
};
</script>
<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .header {
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

  .main-content {
    flex: 1;
    background: url("@/assets/bg-canvas.png");
  }
}
</style>
