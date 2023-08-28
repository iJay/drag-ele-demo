import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import {
  generateId,
  updateComponentStyle,
  findComponentById,
  deleteComponentById,
  moveToTop,
  moveToBottom,
} from "../utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentSelectedComponent: null, // 当前选中的组件
    componentData: [], // 数据源
    widgets: [
      {
        id: 0,
        label: "图片组件",
        componentName: "image-widget",
        icon: require("../assets/image-icon.png"),
        style: {
          width: "160px",
          height: "160px",
        },
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
        style: {
          position: "relative",
        },
        children: [],
      },
    ],
  },
  getters: {},
  mutations: {
    // 添加组件
    addComponent(state, componentMetaData) {
      componentMetaData.component.id = generateId();
      // 1.根据id找到对应的父组件
      if (componentMetaData.parentId) {
        const parentComponent = findComponentById(
          state.componentData,
          componentMetaData.parentId
        );
        // z-index默认值为当前children数组长度
        componentMetaData.component.style["z-index"] = 1;
        // 2.将组件添加到父组件的children中
        parentComponent.children.push(componentMetaData.component);
      } else {
        // 3.如果没有parentId 说明是根组件 直接添加到根组件中
        const childComponent = _.cloneDeep(componentMetaData.component);
        state.componentData.push(childComponent);
      }
    },
    // 修改组件属性
    updateComponentStyle(state, componentMetaData) {
      updateComponentStyle(state.componentData, componentMetaData);
    },
    // 修改拖拽初始化坐标
    changeCoordinate(state, coordinate) {
      state.coordinate = coordinate;
    },
    // 修改选中组件
    updateSelectedComponent(state, id) {
      const currentSelectedComponent = findComponentById(
        state.componentData,
        id
      );
      state.currentSelectedComponent = _.cloneDeep(currentSelectedComponent);
    },
    // 删除组件
    deleteComponent(state, id) {
      deleteComponentById(state.componentData, id);
    },
    // 上移
    moveToTop(state, id) {
      moveToTop(state.componentData[0].children, id);
    },
    // 下移
    moveToBottom(state, id) {
      moveToBottom(state.componentData[0].children, id);
    },
    // 置顶
    updateZIndexToTop(state, componentMetaData) {
      // 1.根据id找到对应的父组件
      const parentComponent = findComponentById(
        state.componentData,
        componentMetaData.parentId
      );
      const currentComponent = findComponentById(
        parentComponent.children,
        componentMetaData.id
      );
      // 找出parentComponent的children中zIndex最大的值
      const maxZIndex = parentComponent.children.reduce((prev, cur) => {
        return Math.max(prev, cur.style["z-index"]);
      }, 0);

      // 将当前组件的zIndex设置为最大值+1
      currentComponent.style["z-index"] = maxZIndex + 1;
    },
    // 置底
    updateZIndexToBottom(state, componentMetaData) {
      // 1.根据id找到对应的父组件
      const parentComponent = findComponentById(
        state.componentData,
        componentMetaData.parentId
      );
      const currentComponent = findComponentById(
        parentComponent.children,
        componentMetaData.id
      );
      // 找出parentComponent的children中zIndex最小的值
      const minZIndex = parentComponent.children.reduce((prev, cur) => {
        return Math.min(prev, cur.style["z-index"]);
      }, 0);
      // 将当前组件的zIndex设置为最小值-1
      currentComponent.style["z-index"] = minZIndex - 1 > 0 ? minZIndex - 1 : 0;
    },
  },
  actions: {
    // 添加组件
    addComponent({ commit }, componentMetaData) {
      commit("addComponent", componentMetaData);
    },
    // 修改组件定位坐标
    changeCoordinate({ commit }, coordinate) {
      commit("changeCoordinate", coordinate);
    },
    // 修改组件属性
    updateComponentStyle({ commit }, componentMetaData) {
      commit("updateComponentStyle", componentMetaData);
    },
    // 修改选中组件
    updateSelectedComponent({ commit }, data) {
      commit("updateSelectedComponent", data);
    },
    // 删除组件
    deleteComponent({ commit }, id) {
      commit("deleteComponent", id);
    },
    // 上移
    moveToTop({ commit }, id) {
      commit("moveToTop", id);
    },
    // 下移
    moveToBottom({ commit }, id) {
      commit("moveToBottom", id);
    },
    // 置顶
    updateZIndexToTop({ commit }, metaData) {
      commit("updateZIndexToTop", metaData);
    },
    // 置底
    updateZIndexToBottom({ commit }, metaData) {
      commit("updateZIndexToBottom", metaData);
    },
  },
  modules: {},
});
