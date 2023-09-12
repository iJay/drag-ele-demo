<template>
  <div class="text-widget-attr">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <!--  -->
      <el-collapse-item title="通用属性" name="1">
        <CommonAttr />
      </el-collapse-item>
      <el-collapse-item title="图片属性" name="2">
        <el-form label-width="80px">
          <el-form-item label="文字内容" prop="text">
            <el-input
              type="textarea"
              v-model="text"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="样式设置" prop="fontStyle">
            <el-radio-group v-model="fontStyle">
              <el-radio label="bold">加粗</el-radio>
              <el-radio label="italic">斜体</el-radio>
              <el-radio label="oblique">下划线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="字体设置" prop="fontFamily">
            <el-select
              v-model="fontFamily"
              placeholder="请选择字体"
              style="width: 200px"
            >
              <el-option
                v-for="item in fontFamilies"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文字大小" prop="fontSize">
            <el-input-number
              v-model="fontSize"
              :min="12"
              :max="100"
              style="width: 200px"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="文字颜色" prop="color">
            <el-color-picker
              v-model="color"
              style="width: 200px"
            ></el-color-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import CommonAttr from "@/components/common/CommonAttr.vue";
export default {
  name: "TextWidgetAttr",
  components: {
    CommonAttr,
  },
  data() {
    return {
      fontFamilies: ["宋体", "微软雅黑"],
      activeNames: "1",
    };
  },
  computed: {
    text: {
      get() {
        return this.$store.state.currentSelectedComponent.propValue.text;
      },
      set(val) {
        this.updateProperty("propValue", "text", val);
      },
    },
    fontStyle: {
      get() {
        return this.$store.state.currentSelectedComponent.style.fontStyle;
      },
      set(val) {
        this.updateProperty("style", "fontStyle", val);
      },
    },
    fontFamily: {
      get() {
        return this.$store.state.currentSelectedComponent.style.fontFamily;
      },
      set(val) {
        this.updateProperty("style", "fontFamily", val);
      },
    },
    fontSize: {
      get() {
        return this.$store.state.currentSelectedComponent.style.fontSize;
      },
      set(val) {
        this.updateProperty("style", "fontSize", val);
      },
    },
    color: {
      get() {
        return this.$store.state.currentSelectedComponent.style.color;
      },
      set(val) {
        this.updateProperty("style", "color", val);
      },
    },
  },
  methods: {
    handleChange(val) {
      this.activeNames = val;
    },
    updateProperty(attr, property, value) {
      this.$store.commit("updateProperty", { attr, property, value });
    },
  },
};
</script>

<style lang="scss">
.text-widget-attr {
  width: 100%;
}
</style>
