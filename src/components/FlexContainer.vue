<template>
  <div class="flex-container">
    <div
      class="flex-container-row"
      v-for="(rowItem, rowIndex) in rows"
      :key="rowIndex"
    >
      <div
        class="flex-container-col"
        v-for="(colItem, colIndex) in cols"
        :key="colIndex"
      >
        <draggable
          class="nest-list-wrapper"
          :list="components"
          group="componentTree"
        >
          <component
            v-for="el in components"
            :key="el.name"
            :components="el.children"
            :is="el.componentType"
          ></component>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "FlexContainer",
  components: {
    draggable,
  },
  props: {
    components: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Number,
      default: 1,
    },
    cols: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.flex-container {
  display: flex;
  min-height: 120px;
  background: #f5f5f5;
  border: 1px dashed #ccc;
  .flex-container-row {
    display: flex;
    flex: 1;
    .flex-container-col {
      flex: 1;
      border: 1px dashed #ccc;
    }
  }
}
</style>
