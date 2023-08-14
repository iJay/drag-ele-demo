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
        <canvas
          id="h-rule-canvas"
          :width="hRuleStyle.width"
          :height="hRuleStyle.height"
        ></canvas>
      </div>
      <div class="v-rule">
        <canvas
          id="v-rule-canvas"
          :width="vRuleStyle.width"
          :height="vRuleStyle.height"
        ></canvas>
      </div>
      <HomeEditor />
    </div>
  </div>
</template>

<script>
import HomeEditor from "./components/HomeEditor.vue";
export default {
  name: "HomeView",
  data() {
    return {
      hRuleStyle: {
        width: 0,
        height: 20,
      },
      vRuleStyle: {
        width: 20,
        height: 0,
      },
    };
  },
  components: {
    HomeEditor,
  },
  mounted() {
    this.hRuleStyle.width = window.innerWidth - 20;
    this.vRuleStyle.height = window.innerHeight * 4;
    this.$nextTick(() => {
      this.drawRule();
    });
  },
  methods: {
    drawRule() {
      this.drawHRule();
      this.drawVRule();
    },
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
          hRuleCtx.lineTo(i * hRuleInterval, 16);
          hRuleCtx.font = "10px Arial";
          hRuleCtx.fillStyle = "#000";
          hRuleCtx.fillText(i * hRuleInterval, i * hRuleInterval + 2, 15);
        } else if (i % 5 === 0) {
          hRuleCtx.moveTo(i * hRuleInterval, 0);
          hRuleCtx.lineTo(i * hRuleInterval, 8);
        } else {
          hRuleCtx.moveTo(i * hRuleInterval, 0);
          hRuleCtx.lineTo(i * hRuleInterval, 4);
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
        // 如果是10的倍数，画长一点的标尺 并且标注数字 标注的数字竖向显示
        if (i % 10 === 0) {
          vRuleCtx.moveTo(0, i * vRuleInterval);
          vRuleCtx.lineTo(16, i * vRuleInterval);
          vRuleCtx.save();
          vRuleCtx.font = "10px Arial";
          vRuleCtx.fillStyle = "#000";
          // TODO: 数字竖向显示 需要旋转90度
          vRuleCtx.fillText(i * vRuleInterval, 5, i * vRuleInterval + 12);
        } else if (i % 5 === 0) {
          vRuleCtx.moveTo(0, i * vRuleInterval);
          vRuleCtx.lineTo(8, i * vRuleInterval);
        } else {
          vRuleCtx.moveTo(0, i * vRuleInterval);
          vRuleCtx.lineTo(4, i * vRuleInterval);
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
    padding: 20px;
    overflow: scroll;

    .h-rule {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background: #fff;
      box-sizing: border-box;
      padding-left: 20px;
      overflow: hidden;
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
      overflow: hidden;
    }
  }
}
</style>
