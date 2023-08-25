<template>
  <img class="image-widget" src="../../assets/image-icon.png" />
</template>

<script>
export default {
  name: "ImageWidget",
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.image-widget {
  width: 160px;
  height: 160px;
}
</style>
