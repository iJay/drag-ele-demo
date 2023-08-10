<template>
  <div class="home">
    <div class="widget-container">
      <ul>
        <li
          draggable="true"
          @dragstart="(e) => handleDragStart(e, item)"
          v-for="item in $store.state.widgets"
          :key="item.label"
        >
          <img :src="item.icon" alt="" />
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div
      class="display-container"
      ref="displayContainer"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <component
        v-for="el in $store.state.componentData"
        :componentData="el.children"
        :class="['drag-element']"
        draggable="true"
        @dragstart="(e) => handleDragStart(e, el)"
        :uniqueKey="el.id"
        :key="el.id"
        :is="el.componentName"
        :style="el.style"
      ></component>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "HomeView",
  data() {
    return {
      mode: "preview", // preview, online
    };
  },
  methods: {
    handleDrop(e) {
      e.preventDefault();
      const transferData = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      const hasExist = this.$store.state.componentData.some(
        (item) =>
          item.id === transferData.id &&
          item.componentName === transferData.componentName
      );
      if (!hasExist) {
        const widget = this.$store.state.widgets.find(
          (item) => item.componentName === transferData.componentName
        );
        const componentOpt = _.cloneDeep(widget);
        componentOpt.id = transferData.id;
        this.$store.dispatch("addComponent", {
          id: null,
          component: componentOpt,
        });
      }
    },
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
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
        id: `${widgetItem.id}-${
          widgetItem.componentName
        }-${new Date().getTime()}`,
      };
      e.dataTransfer.setData("application/json", JSON.stringify(data));
    },
  },
};
</script>
<style lang="scss">
.home {
  display: flex;
  min-height: 100vh;
  .widget-container {
    flex: 0 0 280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        margin: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: move;

        img {
          width: 60px;
          height: 60px;
        }

        span {
          font-size: 12px;
        }
      }
    }
  }
  .display-container {
    flex: 1;
    background-color: #eee;
    margin: 20px;
    position: relative;
    overflow: hidden;

    .drag-element {
      cursor: move;
    }
  }
}
</style>
