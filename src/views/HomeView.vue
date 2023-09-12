<template>
  <div class="home">
    <HomeHeader />
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
      <div
        class="rule-line"
        :style="ruleLinePositionStyle"
        ref="hRuleLine"
      ></div>
      <HomeMarkLine />
    </div>
    <template v-if="currentSelectedComponent">
      <el-dialog
        title="组件属性"
        :visible.sync="isShowAttrDialog"
        width="640px"
        :before-close="handleCloseAttrDialog"
      >
        <component :is="currentSelectedComponent.componentName + '-attr'" />
        <slot name="footer">
          <el-button @click="handleCloseAttrDialog">取 消</el-button>
          <el-button type="primary" @click="handleConfirmAttrDialog">
            确 定
          </el-button>
        </slot>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import HomeEditor from "./components/HomeEditor.vue";
import HomeHeader from "./components/HomeHeader.vue";
import HomeMarkLine from "./components/HomeMarkLine.vue";
import { mapState, mapActions } from "vuex";
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
    HomeHeader,
    HomeMarkLine,
  },
  computed: {
    ...mapState(["currentSelectedComponent", "isShowAttrDialog"]),
    ruleLinePositionStyle() {
      return {
        // TODO: 位置计算取值有问题 应该是取得当前选中组件的pageX和pageY
        top: "0px",
        left: "0px",
        right: "0px",
      };
    },
  },
  mounted() {
    this.hRuleStyle.width = window.innerWidth - 20;
    this.vRuleStyle.height = window.innerHeight * 4;
    this.$nextTick(() => {
      this.drawRule();
      // this.updateRuleLine(this.$refs.hRuleLine);
    });
  },
  methods: {
    ...mapActions(["controlAttrDialog", "saveCurrentNewComponent"]),
    handleCloseAttrDialog() {
      this.controlAttrDialog(false);
    },
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
    handleConfirmAttrDialog() {
      this.saveCurrentNewComponent();
      this.controlAttrDialog(false);
    },
  },
};
</script>
<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main-content {
    flex: 1;
    background: url("@/assets/bg-canvas.png");
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    overflow: scroll;

    .rule-line {
      display: none;
      position: absolute;
      width: 100%;
      height: 1px;
      background: #409eff;
      z-index: 1999;
    }

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
