<template>
  <div class="image-widget-attr">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <!--  -->
      <el-collapse-item title="通用属性" name="1">
        <CommonAttr />
      </el-collapse-item>
      <el-collapse-item title="图片属性" name="2">
        <!-- 上传图片（upload） 透明度（Slider） 链接设置（input不可编辑 后面一个设置按钮 input 和button在一行， 点击是弹窗） -->
        <el-form label-width="80px">
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              list-type="picture-card"
              :auto-upload="false"
              :file-list="fileList"
            >
              <i class="el-icon-plus" v-if="fileList.length <= 0"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="currentSelectedComponent.propValue.url" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="透明度">
            <el-slider
              v-model="currentSelectedComponent.propValue.opacity"
              :min="0"
              :max="100"
            />
          </el-form-item>
          <el-form-item label="链接设置">
            <el-input
              placeholder="请输入链接"
              v-model="currentSelectedComponent.propValue.link"
              style="width: 200px"
            ></el-input>
            <el-button type="primary" @click="handleLinkSetting">
              设置
            </el-button>
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
  name: "ImageWidgetAttr",
  components: {
    CommonAttr,
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      opacity: 100,
      activeNames: ["1"],
    };
  },
  computed: {
    ...mapState(["currentSelectedComponent"]),
  },
  methods: {
    handleLinkSetting() {
      // TODO
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
      this.currentSelectedComponent.propValue.url = file.url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, fileList, "warning");
    },
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss">
.image-widget-attr {
  width: 100%;
}
</style>
