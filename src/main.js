import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "reset-css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

// 全局注册组件
Vue.component("image-widget", () =>
  import("./components/widget/ImageWidget.vue")
);
Vue.component("text-widget", () =>
  import("./components/widget/TextWidget.vue")
);
Vue.component("flex-container", () =>
  import("./components/container/FlexContainer.vue")
);
Vue.component("freedom-container", () =>
  import("./components/container/FreedomContainer.vue")
);
Vue.component("main-container", () =>
  import("./components/container/MainContainer.vue")
);
Vue.component("section-container", () =>
  import("./components/container/SectionContainer.vue")
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
