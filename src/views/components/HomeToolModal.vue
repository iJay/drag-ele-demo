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
    <section>
      <h4>组件</h4>
      <ul>
        <li
          draggable
          @dragstart="(e) => handleDragStart(e, item)"
          v-for="item in widgets"
          :key="item.label"
        >
          <img :src="item.icon" :alt="item.label" />
        </li>
      </ul>
    </section>
    <section>
      <h4>容器</h4>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", widgetItem.componentName);
      const data = { componentName: widgetItem.componentName };
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
  border: 1px solid #ccc;

  & > header {
    display: flex;
    height: 48px;
    box-sizing: border-box;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  & > section {
    box-sizing: border-box;
    padding: 16px;
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
