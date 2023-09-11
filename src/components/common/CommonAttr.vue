<template>
  <div class="common-attr-wrapper">
    <el-form label-width="80px" class="demo-ruleForm" ref="form">
      <!-- 宽度，高度，最小宽度，最大宽度，最小高度，最大高度， X轴，y轴，层级序号 属性2个一行 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="宽度" prop="width">
            <el-input v-model="currentSelectedComponent.style.width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高度" prop="height">
            <el-input
              v-model="currentSelectedComponent.style.height"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最小宽度" prop="minWidth">
            <el-input
              v-model="currentSelectedComponent.style.minWidth"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大宽度" prop="maxWidth">
            <el-input
              v-model="currentSelectedComponent.style.maxWidth"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最小高度" prop="minHeight">
            <el-input
              v-model="currentSelectedComponent.style.minHeight"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大高度" prop="maxHeight">
            <el-input
              v-model="currentSelectedComponent.style.maxHeight"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="X轴" prop="x">
            <el-input v-model="currentSelectedComponent.style.top"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Y轴" prop="y">
            <el-input v-model="currentSelectedComponent.style.left"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="层级序号" prop="zIndex">
            <el-input
              v-model="currentSelectedComponent.style.zIndex"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonAttr",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentSelectedComponent"]),
  },
};
</script>

<style lang="scss">
.common-attr-wrapper {
  width: 100%;
}
</style>
