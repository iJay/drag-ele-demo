import Vue from "vue";
import Vuex from "vuex";
import { generateId } from "../utils";

Vue.use(Vuex);

// 更新组件属性
function updateComponentAttr(componentData, componentMetaData) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === componentMetaData.id) {
      componentData[i][componentMetaData.attrKey] = componentMetaData.attrValue;
      break;
    } else {
      updateComponentAttr(componentData[i].children, componentMetaData);
    }
  }
}

// 根据id查询相应组件 并返回该组件
function findComponentById(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      return componentData[i];
    } else {
      const foundComponent = findComponentById(componentData[i].children, id);
      if (foundComponent) {
        return foundComponent; // 如果在子组件中找到了，返回子组件
      }
    }
  }
  return null; // 如果未找到组件，返回 null
}

// 根据id删除组件
function deleteComponentById(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      componentData.splice(i, 1);
      break;
    } else {
      deleteComponentById(componentData[i].children, id);
    }
  }
}

// 上移
function moveToTop(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id && componentData[i - 1]) {
      const deleteItem = componentData.splice(i, 1);
      // 上移到前一个位置
      componentData.splice(i - 1, 0, deleteItem[0]);
      break;
    }
  }
}

// 下移
function moveToBottom(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id && componentData[i + 1]) {
      const deleteItem = componentData.splice(i, 1);
      // 下移到后一个位置
      componentData.splice(i + 1, 0, deleteItem[0]);
      break;
    }
  }
}

export default new Vuex.Store({
  state: {
    coordinate: {
      mouseInEleX: 0,
      mouseInEleY: 0,
    },
    currentSelectedComponent: null, // 当前选中的组件
    componentData: [], // 数据源
    widgets: [
      {
        id: 0,
        label: "图片组件",
        componentName: "image-widget",
        icon: require("../assets/image-icon.svg"),
        selected: false,
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "文本组件",
        componentName: "text-widget",
        icon: require("../assets/text-icon.svg"),
        selected: false,
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "自由容器",
        componentName: "freedom-container",
        icon: require("../assets/freedom-container.svg"),
        selected: false,
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
      // 1.根据id找到对应的父组件
      if (componentMetaData.parentId) {
        componentMetaData.component.id = generateId();
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
        componentMetaData.component.id = generateId();
        state.componentData.push(componentMetaData.component);
      }
    },
    // 修改组件属性
    updateComponentAttr(state, componentMetaData) {
      updateComponentAttr(state.componentData, componentMetaData);
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
      state.currentSelectedComponent = currentSelectedComponent;
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
    updateComponentAttr({ commit }, componentMetaData) {
      commit("updateComponentAttr", componentMetaData);
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
