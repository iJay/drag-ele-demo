<template>
  <div class="freedom-container" ref="freedomContainer">
    <div
      class="content-container"
      ref="contentContainer"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <widget-wrapper
        v-for="component in componentData.children"
        :componentData="component"
        :key="component.id"
        :parentId="componentData.id"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
export default {
  name: "FreedomConatiner",
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions(["addComponent"]),
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const transferData =
        e.dataTransfer.getData("application/json") &&
        JSON.parse(e.dataTransfer.getData("application/json"));
      const hasExistComponent = this.componentData.children.find(
        (item) => item.id === transferData.id
      );
      const widget = this.$store.state.widgets.find(
        (item) => item.componentName === transferData.componentName
      );
      if (!hasExistComponent) {
        if (widget) {
          const componentOpt = _.cloneDeep(widget);
          const positionX =
            e.pageX - this.$refs.contentContainer.getBoundingClientRect().x;
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const positionY =
            e.pageY -
            this.$refs.contentContainer.getBoundingClientRect().y -
            scrollTop;
          componentOpt.style = {
            ...widget.style,
            top: `${positionY}px`,
            left: `${positionX}px`,
            position: "absolute",
          };
          console.log(componentOpt);
          this.addComponent({
            parentId: this.componentData.id,
            component: componentOpt,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss">
.freedom-container {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  position: relative;

  &:hover {
    .content-container {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .content-container {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>
