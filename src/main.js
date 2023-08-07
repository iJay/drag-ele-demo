import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueDraggableResizable from "vue-draggable-resizable";

// optionally import default styles
// import "vue-draggable-resizable/dist/VueDraggableResizable.css";

// 全局注册组件
Vue.component("image-widget", () => import("./components/ImageWidget.vue"));
Vue.component("text-widget", () => import("./components/TextWidget.vue"));
// Vue.component("vue-draggable-resizable", VueDraggableResizable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
