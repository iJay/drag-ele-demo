<template>
  <div @dragstart="$listeners.dragstart" class="freedom-container">
    FreedomConatiner
  </div>
</template>

<script>
export default {
  name: "FreedomConatiner",
};
</script>
<style lang="scss">
.freedom-container {
  width: 100%;
  min-height: 100px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
