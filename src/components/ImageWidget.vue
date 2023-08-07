<template>
  <img
    @dragstart="$listeners.dragstart"
    class="image-widget"
    src="../assets/image-icon.svg"
  />
</template>

<script>
export default {
  name: "ImageWidget",
  components: {},
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
