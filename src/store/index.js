import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 遍历组件树
function findComponent(componentData, componentMetaData) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === componentMetaData.id) {
      componentData[i] = componentMetaData.component;
      break;
    } else {
      findComponent(componentData[i].children);
    }
  }
}

function handleComponentSelected(componentData, id) {
  for (let i = 0; i < componentData.length; i++) {
    if (componentData[i].id === id) {
      componentData[i].selected = true;
      break;
    } else {
      handleComponentSelected(componentData[i].children);
    }
  }
}

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

function resetComponentSelected(componentData) {
  for (let i = 0; i < componentData.length; i++) {
    componentData[i].selected = false;
    resetComponentSelected(componentData[i].children);
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
      {
        id: 0,
        label: "Flex容器",
        componentName: "flex-container",
        icon: require("../assets/flex-container.svg"),
        selected: false,
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "Section容器",
        componentName: "section-container",
        icon: require("../assets/section-container.svg"),
        selected: false,
        style: {},
        children: [],
      },
      {
        id: 0,
        label: "Main容器",
        componentName: "main-container",
        icon: require("../assets/main-container.svg"),
        selected: false,
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
  },
  actions: {
    // 添加组件
    addComponent({ commit }, componentMetaData) {
      commit("addComponent", componentMetaData);
    },
    changeCoordinate({ commit }, coordinate) {
      commit("changeCoordinate", coordinate);
    },
    changeComponentAttr({ commit }, componentMetaData) {
      commit("changeComponentAttr", componentMetaData);
    },
    changeSelected({ commit }, data) {
      commit("changeSelected", data);
    },
    // 删除组件
    deleteComponent({ commit }, id) {
      commit("deleteComponent", id);
    },
  },
  modules: {},
});
