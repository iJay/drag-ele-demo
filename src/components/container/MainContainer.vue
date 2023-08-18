<template>
  <div class="main-container">
    <container-wrapper
      v-for="component in componentData.children"
      :key="component.id"
      :componentData="component"
      :style="component.style"
    />
  </div>
</template>

<script>
export default {
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
  },
  name: "MainConatiner",
};
</script>
<style lang="scss">
.main-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 83px);
  height: auto;
  background-color: #fff;
}
</style>
