<template>
  <el-card class="form-container" shadow="never" v-if="homeAdvertise">
    <el-form
      :model="homeAdvertise"
      :rules="rules"
      ref="homeAdvertiseFrom"
      label-width="150px"
      size="small"
    >
      <el-form-item label="名称：" prop="" >
        <el-input v-model="homeAdvertise.informationName" class="input-width" ></el-input>
      </el-form-item>
      <el-form-item label="来源：" prop="informationSource">
        <el-input v-model="homeAdvertise.informationSource" class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="开始时间：" prop="createTime">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.createTime"></el-date-picker>
      </el-form-item>
    
      <el-form-item label="图片：">
        <single-upload v-model="homeAdvertise.icon"></single-upload>
      </el-form-item>
    
      <el-form-item label="内容：" prop="">
        <quill-editor :content="homeAdvertise.informationContent" @change="onEditorChange($event)"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import SingleUpload from "@/components/Upload/singleUpload";
import { quillEditor } from "vue-quill-editor";

import {
  createHomeAdvertise,
  getHomeAdvertise,
  updateHomeAdvertise
} from "@/api/homeAdvertise";

import { fetchNewsAdd, fetchNewsUpdate, fetchNewsdate } from "@/api/health";
const defaultTypeOptions = [
  {
    label: "PC首页轮播",
    value: 0
  },
  {
    label: "APP首页轮播",
    value: 1
  }
];
const defaultHomeAdvertise = { 
  informationName: "",
  informationSource: null,
  icon: null,
  createTime: null,
  informationContent: ""
};
export default {
  name: "HomeAdvertiseDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      homeAdvertise: null,
      rules: {
        name: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        url: [{ required: true, message: "请输入广告链接", trigger: "blur" }],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择到期时间", trigger: "blur" }
        ],
        pic: [{ required: true, message: "请选择广告图片", trigger: "blur" }]
      },
      typeOptions: Object.assign({}, defaultTypeOptions)
    };
  },
  created() {
    if (this.isEdit) {
      fetchNewsdate(this.$route.query.id).then(response => {
        this.homeAdvertise = response.data;
      });
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.content = html;
      this.homeAdvertise.informationContent = this.content; 
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            if (this.isEdit) {
              fetchNewsUpdate(this.$route.query.id, this.homeAdvertise).then(
                response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000
                  });
                  this.$router.back();
                }
              );
            } else {
              fetchNewsAdd(this.homeAdvertise).then(response => {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000
                });
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 70%;
}
</style>


