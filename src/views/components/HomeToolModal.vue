<template>
  <div class="home-tool-modal">
    <header>
      <h3>工具箱</h3>
      <i
        class="el-icon-close"
        style="cursor: pointer"
        @click="$emit('close')"
      ></i>
    </header>
    <ul>
      <li
        draggable="true"
        @dragstart="(e) => handleDragStart(e, item)"
        v-for="item in widgets"
        :key="item.label"
      >
        <img :src="item.icon" :alt="item.label" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { generateId } from "@/utils";
export default {
  name: "HomeToolModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["widgets"]),
  },
  methods: {
    handleDragStart(e, widgetItem) {
      // 记录当前拖动元素的鼠标在元素内的位置
      const mouseInEleX =
        (e.pageX - e.currentTarget.getBoundingClientRect().x) /
        e.currentTarget.getBoundingClientRect().width;
      const mouseInEleY =
        (e.pageY - e.currentTarget.getBoundingClientRect().y) /
        e.currentTarget.getBoundingClientRect().height;
      this.$store.dispatch("changeCoordinate", {
        mouseInEleX,
        mouseInEleY,
      });
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", widgetItem.componentName);
      const data = {
        componentName: widgetItem.componentName,
        id: generateId(),
      };
      e.dataTransfer.setData("application/json", JSON.stringify(data));
    },
  },
};
</script>

<style lang="scss">
.home-tool-modal {
  position: fixed;
  top: 80px;
  left: 32px;
  width: 260px;
  height: 480px;
  background: #eee;
  z-index: 199;
  box-sizing: border-box;
  padding: 24px;

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 60px;
      height: 60px;
      margin: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: move;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
