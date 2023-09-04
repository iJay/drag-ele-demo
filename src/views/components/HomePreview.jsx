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
      console.log("renderComponent componentDatas", componentDatas);
      return componentDatas.map((elementData) => {
        console.log("renderComponent elementData", elementData);
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
      // return componentDatas.map((elementData) => {
      //   console.log("renderComponent elementData", elementData);
      //   return (
      //     <elementData.componentName
      //       componentData={elementData}
      //       style={elementData.style}
      //     >
      //       {this.renderComponent(elementData)}
      //     </elementData.componentName>
      //   );
      // });
    },
  },
  render() {
    return this.componentData.map((elementData) => {
      console.log("render elementData", elementData);
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
