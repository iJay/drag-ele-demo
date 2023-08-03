import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FlexContainer from "./components/FlexContainer.vue";
import TextContainer from "./components/TextContainer.vue";

// 全局注册flex容器组件
Vue.component("flex-container", FlexContainer);
Vue.component("text-container", TextContainer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
