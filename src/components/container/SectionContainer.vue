<template>
  <div @dragstart="$listeners.dragstart" class="section-container">
    SectionConatiner
  </div>
</template>

<script>
export default {
  name: "SectionConatiner",
};
</script>
<style lang="scss">
.section-container {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
