<template>
  <div class="home-mark-line">
    <div
      class="mark-line-h mark-line-top-x"
      :style="markLineTopXPosition"
    ></div>
    <div
      class="mark-line-h mark-line-bottom-x"
      :style="markLineBottomXPosition"
    ></div>
    <div
      class="mark-line-v mark-line-left-y"
      :style="markLineLeftYPosition"
    ></div>
    <div
      class="mark-line-v mark-line-right-y"
      :style="markLineRightYPosition"
    ></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HomeMarkLine",
  data() {
    return {
      eleSize: {
        width: 0,
        height: 0,
      },
      elePosition: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    markLineTopXPosition() {
      return {
        top: `${this.elePosition.y}px`,
      };
    },
    markLineBottomXPosition() {
      return {
        top: `${this.elePosition.y + this.eleSize.height}px`,
      };
    },
    markLineLeftYPosition() {
      return {
        left: `${this.elePosition.x}px`,
      };
    },
    markLineRightYPosition() {
      return {
        left: `${this.elePosition.x + this.eleSize.width}px`,
      };
    },
  },
  methods: {
    ...mapActions(["updateRuleLine"]),
  },
  mounted() {
    this.updateRuleLine(this);
  },
};
</script>

<style lang="scss">
.home-mark-line {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  display: none;
  .mark-line-h {
    position: absolute;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 1px;
    background: #409eff;
    z-index: 1999;
  }
  .mark-line-v {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 1px;
    height: 100%;
    background: #409eff;
    z-index: 1999;
  }
}
</style>
