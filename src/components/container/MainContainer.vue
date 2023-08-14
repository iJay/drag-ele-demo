<template>
  <div
    class="main-container"
    :style="{ width: '1200px' }"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <component
      v-for="component in componentData.children"
      :key="component.id"
      :is="component.componentName"
      :componentData="component"
      :style="component.style"
      @dragstart="(e) => handleDragStart(e, component)"
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
  methods: {
    handleDrop(e) {
      e.preventDefault();
      const data = e.dataTransfer.getData("dragData");
      console.log(data);
    },
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleDragStart(e, component) {
      e.dataTransfer.setData("dragData", JSON.stringify(component));
    },
  },
};
</script>
<style lang="scss">
.main-container {
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 83px);
  height: auto;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
