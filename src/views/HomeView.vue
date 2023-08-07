<template>
  <div class="home">
    <div class="widget-container">
      <ul>
        <li
          draggable="true"
          @dragstart="(e) => handleDragStart(e, item)"
          v-for="item in widgets"
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
        v-for="el in componentData"
        :class="['drag-element']"
        draggable="true"
        @dragstart="(e) => handleDragStart(e, el)"
        :key="el.id"
        :is="el.componentName"
        :style="el.style"
      ></component>
    </div>
  </div>
</template>

<script>
let componentId = 1;
export default {
  name: "HomeView",
  data() {
    return {
      mode: "preview", // preview, online
      widgets: [
        {
          id: 0,
          label: "图片组件",
          componentName: "image-widget",
          icon: require("../assets/image-icon.svg"),
          dragEnd: false, // 是否已经在容器内
          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
          },
        },
        {
          id: 0,
          label: "文本组件",
          componentName: "text-widget",
          icon: require("../assets/text-icon.svg"),
          dragEnd: false, // 是否已经在容器内
          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
          },
        },
        {
          id: 0,
          label: "自由容器",
          componentName: "freedom-container",
          icon: require("../assets/freedom-container.svg"),
          dragEnd: false, // 是否已经在容器内
          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
          },
        },
        {
          id: 0,
          label: "Flex容器",
          componentName: "flex-container",
          icon: require("../assets/flex-container.svg"),
          dragEnd: false, // 是否已经在容器内
          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
          },
        },
        {
          id: 0,
          label: "Section容器",
          componentName: "section-container",
          icon: require("../assets/section-container.svg"),
          dragEnd: false, // 是否已经在容器内
          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
          },
        },
        {
          id: 0,
          label: "Main容器",
          componentName: "main-container",
          icon: require("../assets/main-container.svg"),
          dragEnd: false, // 是否已经在容器内
          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
          },
        },
      ],
      mouseInEleX: 0,
      mouseInEleY: 0,
      componentData: [],
    };
  },
  methods: {
    handleDragStart(e, widgetItem) {
      // 记录当前拖动元素的鼠标在元素内的位置
      this.mouseInEleX = e.pageX - e.currentTarget.getBoundingClientRect().x;
      this.mouseInEleY = e.pageY - e.currentTarget.getBoundingClientRect().y;
      console.log(this.mouseInEleX, this.mouseInEleY);
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", widgetItem.componentName);
      const data = {
        componentName: widgetItem.componentName,
        id: widgetItem.id,
      };
      e.dataTransfer.setData("application/json", JSON.stringify(data));
    },
    handleDragOver(e) {
      e.preventDefault();
    },
    handleDrop(e) {
      e.preventDefault();
      const transferData = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      console.log("transferData", transferData);
      const hasExist = this.componentData.some(
        (item) =>
          item.id === transferData.id &&
          item.componentName === transferData.componentName
      );
      if (!hasExist) {
        const component = this.widgets.find(
          (item) => item.componentName === transferData.componentName
        );
        if (component) {
          const componentOpt = Object.assign({}, component);
          componentOpt.id = componentId++;
          // 重新定义拖拽元素在容器内释放的位置
          const positionX =
            e.pageX - this.$refs.displayContainer.offsetLeft - this.mouseInEleX;
          const positionY =
            e.pageY - this.$refs.displayContainer.offsetTop - this.mouseInEleY;
          componentOpt.style = {
            ...component.style,
            top: `${positionY}px`,
            left: `${positionX}px`,
          };
          this.componentData.push(componentOpt);
        }
      } else {
        const positionX =
          e.pageX - this.$refs.displayContainer.offsetLeft - this.mouseInEleX;
        const positionY =
          e.pageY - this.$refs.displayContainer.offsetTop - this.mouseInEleY;
        const component = this.componentData.find(
          (item) => item.id === transferData.id
        );
        component.style = {
          ...component.style,
          top: `${positionY}px`,
          left: `${positionX}px`,
        };
      }
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
