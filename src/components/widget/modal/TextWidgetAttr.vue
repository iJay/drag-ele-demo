<template>
  <div class="text-widget-attr">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <!--  -->
      <el-collapse-item title="通用属性" name="1">
        <CommonAttr />
      </el-collapse-item>
      <el-collapse-item title="图片属性" name="2">
        <!-- 文字内容（textarea） 样式设置（checkbox） 字体设置（selelct） 文字大小（inputnumber） 文字颜色（color） -->
        <el-form label-width="80px">
          <el-form-item label="文字内容" prop="text">
            <el-input
              type="textarea"
              v-model="currentSelectedComponent.propValue.text"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="样式设置" prop="style">
            <el-radio-group v-model="currentSelectedComponent.style.fontStyle">
              <el-radio label="bold">加粗</el-radio>
              <el-radio label="italic">斜体</el-radio>
              <el-radio label="oblique">下划线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="字体设置" prop="fontFamily">
            <el-select
              v-model="currentSelectedComponent.style.fontFamily"
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
              v-model="currentSelectedComponent.style.fontSize"
              :min="12"
              :max="100"
              style="width: 200px"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="文字颜色" prop="color">
            <el-color-picker
              v-model="currentSelectedComponent.style.color"
              style="width: 200px"
            ></el-color-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CommonAttr from "@/components/common/CommonAttr.vue";
export default {
  name: "TextWidgetAttr",
  components: {
    CommonAttr,
  },
  data() {
    return {
      fontFamilies: ["宋体", "微软雅黑"],
      activeNames: ["1"],
    };
  },
  computed: {
    ...mapState(["currentSelectedComponent"]),
  },
  methods: {},
};
</script>

<style lang="scss">
.text-widget-attr {
  width: 100%;
}
</style>
