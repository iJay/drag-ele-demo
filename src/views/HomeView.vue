<template>
  <div class="home">
    <div class="widget-container">
      <draggable
        tag="ul"
        :list="widgets"
        :clone="handleCloneEle"
        :group="{ name: 'componentTree', pull: 'clone', put: false }"
      >
        <li v-for="item in widgets" :key="item.id">{{ item.name }}</li>
      </draggable>
    </div>
    <div class="display-container">
      <draggable
        class="nest-list-wrapper"
        :list="components"
        group="componentTree"
      >
        <component
          v-for="el in components"
          :key="el.name"
          :components="el.children"
          :is="el.componentType"
        ></component>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "HomeView",
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      widgets: [
        {
          id: 1,
          name: "widget1",
          type: "flex-container",
          children: [],
        },
        {
          id: 2,
          name: "widget2",
          type: "flex-container",
          children: [],
        },
        {
          id: 3,
          name: "widget3",
          type: "flex-container",
          children: [],
        },
        {
          id: 4,
          name: "widget4",
          type: "text-container",
          children: [],
        },
        {
          id: 5,
          name: "widget5",
          type: "text-container",
          children: [],
        },
        {
          id: 6,
          name: "widget6",
          type: "text-container",
          children: [],
        },
      ],
      components: [],
    };
  },
  methods: {
    handleCloneEle(item) {
      return {
        name: "component" + item.id,
        id: item.id,
        children: item.children,
        componentType: item.type,
      };
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
        justify-content: center;
        align-items: center;
      }
    }
  }
  .display-container {
    flex: 1;
    background-color: #eee;
    margin: 20px;

    .nest-list-wrapper {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    ul {
      width: 100%;
      min-height: 100px;
      list-style: none;
      box-sizing: border-box;
      padding: 16px;
      margin: 0px;
      li {
        width: 100%;
        background-color: #ccc;
        border: 1px solid #000;
      }
    }
  }
}
</style>
