import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    componentData: [],
    widgets: [
      {
        id: 0,
        label: "图片组件",
        componentName: "image-widget",
        icon: require("../assets/image-icon.svg"),
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "文本组件",
        componentName: "text-widget",
        icon: require("../assets/text-icon.svg"),
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "自由容器",
        componentName: "freedom-container",
        icon: require("../assets/freedom-container.svg"),
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "Flex容器",
        componentName: "flex-container",
        icon: require("../assets/flex-container.svg"),
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "Section容器",
        componentName: "section-container",
        icon: require("../assets/section-container.svg"),
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "Main容器",
        componentName: "main-container",
        icon: require("../assets/main-container.svg"),
        dragEnd: false, // 是否已经在容器内
        style: {},
        children: [],
      },
    ],
  },
  getters: {},
  mutations: {
    // 添加组件
    addComponent(state, componentMetaData) {
      // 1.根据id找到对应的父组件
      if (componentMetaData.id) {
        const parentComponent = state.componentData.find(
          (item) => item.id === componentMetaData.id
        );
        // 2.将组件添加到对应的组件中
        parentComponent.children.push(componentMetaData.component);
      } else {
        state.componentData.push(componentMetaData.component);
      }
    },
  },
  actions: {
    // 添加组件
    addComponent({ commit }, componentMetaData) {
      commit("addComponent", componentMetaData);
    },
  },
  modules: {},
});
