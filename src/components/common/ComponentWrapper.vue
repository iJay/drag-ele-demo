<template>
  <div class="component-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ComponentWrapper",
};
</script>

<style lang="scss">
.component-wrapper {
  display: inline-block;
}
</style>
