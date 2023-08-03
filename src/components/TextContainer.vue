<template>
  <p class="text-container" :style="styleObject">{{ text }}</p>
</template>

<script>
export default {
  name: "TextContainer",
  props: {
    text: {
      type: String,
      default: "Hello World!",
    },
    rows: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    styleObject() {
      return {
        overflow: "hidden",
      };
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.text-container {
  padding: 0px;
  margin: 0px;
}
</style>
