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
      <div class="h-rule">
        <canvas id="h-rule-canvas" width="1488" height="20"></canvas>
      </div>
      <div class="v-rule">
        <canvas id="v-rule-canvas" width="20" height="990"></canvas>
      </div>
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
  mounted() {
    this.drawHRule();
    this.drawVRule();
  },
  methods: {
    drawHRule() {
      // 水平标尺 标尺长度是元素宽度 平均分成N个100像素长度，每个100像素长度的标尺间隔为10像素
      const hRuleCanvas = document.getElementById("h-rule-canvas");
      const hRuleCtx = hRuleCanvas.getContext("2d");
      const hRuleLength = hRuleCanvas.width;
      const hRuleInterval = 10;
      const hRuleCount = hRuleLength / hRuleInterval;
      hRuleCtx.strokeStyle = "#ccc";
      hRuleCtx.lineWidth = 1;
      hRuleCtx.beginPath();
      for (let i = 0; i < parseInt(hRuleCount); i++) {
        // 如果是10的倍数，画长一点的标尺 并且标注数字
        if (i % 10 === 0) {
          hRuleCtx.moveTo(i * hRuleInterval, 0);
          hRuleCtx.lineTo(i * hRuleInterval, 20);
          hRuleCtx.font = "12px Arial";
          hRuleCtx.fillStyle = "#000";
          hRuleCtx.fillText(i * hRuleInterval, i * hRuleInterval, 15);
        } else if (i % 5 === 0) {
          hRuleCtx.moveTo(i * hRuleInterval, 0);
          hRuleCtx.lineTo(i * hRuleInterval, 15);
        } else {
          hRuleCtx.moveTo(i * hRuleInterval, 0);
          hRuleCtx.lineTo(i * hRuleInterval, 10);
        }
      }
      hRuleCtx.stroke();
    },
    drawVRule() {
      // 垂直标尺 标尺长度是元素高度 平均分成N个100像素长度，每个100像素长度的标尺间隔为10像素
      const vRuleCanvas = document.getElementById("v-rule-canvas");
      const vRuleCtx = vRuleCanvas.getContext("2d");
      const vRuleLength = vRuleCanvas.height;
      const vRuleInterval = 10;
      const vRuleCount = vRuleLength / vRuleInterval;
      vRuleCtx.strokeStyle = "#ccc";
      vRuleCtx.lineWidth = 1;
      vRuleCtx.beginPath();
      for (let i = 0; i < parseInt(vRuleCount); i++) {
        // 如果是10的倍数，画长一点的标尺 并且标注数字
        if (i % 10 === 0) {
          vRuleCtx.moveTo(0, i * vRuleInterval);
          vRuleCtx.lineTo(20, i * vRuleInterval);
          vRuleCtx.font = "12px Arial";
          vRuleCtx.fillStyle = "#000";
          vRuleCtx.fillText(i * vRuleInterval, 5, i * vRuleInterval);
        } else if (i % 5 === 0) {
          vRuleCtx.moveTo(0, i * vRuleInterval);
          vRuleCtx.lineTo(15, i * vRuleInterval);
        } else {
          vRuleCtx.moveTo(0, i * vRuleInterval);
          vRuleCtx.lineTo(10, i * vRuleInterval);
        }
      }
      vRuleCtx.stroke();
    },
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
    position: relative;
    box-sizing: border-box;
    padding: 20px 0 0 20px;

    .h-rule {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background: #fff;
      box-sizing: border-box;
      padding-left: 20px;
    }

    .v-rule {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      background: #fff;
      box-sizing: border-box;
      padding-top: 20px;
    }
  }
}
</style>
