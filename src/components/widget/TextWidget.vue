<template>
  <div
    class="text-widget"
    :contenteditable="contenteditable"
    @dblclick="handleDblClick"
    @blur="contenteditable = false"
    v-html="content"
  ></div>
</template>

<script>
export default {
  name: "TextWidget",
  components: {},
  data() {
    return {
      contenteditable: false,
    };
  },
  props: {
    content: {
      type: String,
      default: "双击编辑文本",
    },
  },
  methods: {
    handleDblClick(e) {
      e.stopPropagation();
      this.contenteditable = true;
    },
  },
};
</script>
<style lang="scss">
.text-widget {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
}
</style>
