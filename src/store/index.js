import Vue from "vue";
import Vuex from "vuex";
import { generateId } from "../utils";

Vue.use(Vuex);

// 遍历组件树
function findComponent(componentData, componentMetaData) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === componentMetaData.id) {
      componentData[i] = componentMetaData.component;
      break;
    } else {
      findComponent(componentData[i].children, componentMetaData);
    }
  }
}

// 根据id查询相应组件 并返回该组件
function findComponentById(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      return componentData[i];
    } else {
      findComponentById(componentData[i].children, id);
    }
  }
}

// 递归遍历组件树 修改选中状态
function handleComponentSelected(componentData, id, selected) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      componentData[i].selected = selected;
      break;
    } else {
      handleComponentSelected(componentData[i].children);
    }
  }
}

// 根据id删除组件
function deleteComponentById(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      componentData.splice(i, 1);
      break;
    } else {
      deleteComponentById(componentData[i].children);
    }
  }
}

// 重置所有组件的选中状态 为false
function resetComponentSelected(componentData) {
  for (let i = 0; i < componentData.length; i++) {
    componentData[i].selected = false;
    resetComponentSelected(componentData[i].children);
  }
}

// 上移
function moveToTop(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      const deleteItem = componentData.splice(i, 1);
      // 上移到前一个位置
      componentData.splice(i - 1, 0, deleteItem[0]);
      console.log(componentData);
      break;
    }
  }
}

// 下移
function moveToBottom(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
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
    componentData: [],
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
      // {
      //   id: 0,
      //   label: "Flex容器",
      //   componentName: "flex-container",
      //   icon: require("../assets/flex-container.svg"),
      //   selected: false,
      //   style: {},
      //   children: [],
      // },
      // {
      //   id: 0,
      //   label: "Section容器",
      //   componentName: "section-container",
      //   icon: require("../assets/section-container.svg"),
      //   selected: false,
      //   style: {},
      //   children: [],
      // },
      // {
      //   id: 0,
      //   label: "Main容器",
      //   componentName: "main-container",
      //   icon: require("../assets/main-container.svg"),
      //   selected: false,
      //   style: {},
      //   children: [],
      // },
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
        // 2.将组件添加到父组件的children中
        parentComponent.children.push(componentMetaData.component);
      } else {
        // 3.如果没有parentId 说明是根组件 直接添加到根组件中
        componentMetaData.component.id = generateId();
        state.componentData.push(componentMetaData.component);
      }
    },
    // 修改组件属性
    changeComponentAttr(state, componentMetaData) {
      findComponent(state.componentData, componentMetaData);
    },
    // 修改拖拽初始化坐标
    changeCoordinate(state, coordinate) {
      state.coordinate = coordinate;
    },
    // 修改选中组件
    changeSelected(state, data) {
      resetComponentSelected(state.componentData);
      handleComponentSelected(state.componentData, data.id, data.selected);
    },
    // 删除组件
    deleteComponent(state, id) {
      deleteComponentById(state.componentData, id);
    },
    // 上移
    moveToTop(state, id) {
      moveToTop(state.componentData, id);
    },
    // 下移
    moveToBottom(state, id) {
      moveToBottom(state.componentData, id);
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
    changeComponentAttr({ commit }, componentMetaData) {
      commit("changeComponentAttr", componentMetaData);
    },
    // 修改选中组件
    changeSelected({ commit }, data) {
      commit("changeSelected", data);
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
  },
  modules: {},
});
