<template>
  <div @dragstart="$listeners.dragstart" class="flex-container">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="flex-row">
      <div
        v-for="(col, colIndex) in cols"
        :key="colIndex"
        class="flex-col"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 2,
    },
    cols: {
      type: Number,
      default: 2,
    },
  },
  name: "FlexConatiner",
};
</script>
<style lang="scss">
.flex-container {
  width: 100%;
  min-height: 160px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .flex-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
    min-height: 80px;
    border-bottom: 1px solid #e0e0e0;

    .flex-col {
      width: 50%;
      height: 80px;
      border-right: 1px solid #e0e0e0;
    }
  }
}
</style>
