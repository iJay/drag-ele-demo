export default {
  name: "HomePreview",
  props: {
    componentData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    renderComponent(componentDatas) {
      return componentDatas.map((elementData) => {
        return (
          <elementData.componentName
            componentData={elementData}
            style={elementData.style}
            mode="preview"
          >
            {this.renderComponent(elementData.children)}
          </elementData.componentName>
        );
      });
    },
  },
  render() {
    return this.componentData.map((elementData) => {
      return (
        <elementData.componentName
          componentData={elementData}
          style={elementData.style}
          mode="preview"
        >
          {this.renderComponent(elementData.children)}
        </elementData.componentName>
      );
    });
  },
};
