<template>
    <div id="app1">
        <!--表头-->
        <el-row :gutter="20">
            <el-col :span="4">
                <el-input :inline="true" prefix-icon="el-icon-search" v-model="conditions.name" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select :inline="true" v-model="conditions.typeid" placeholder="所属分类" clearable>
                    <el-option v-for="item in types" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="14">
                <el-button type="primary" v-on:click="load" icon="fa fa-search">查询</el-button>
                <el-tooltip class="item" effect="dark" content="Top Left 分类列表" placement="top-start">
                    <el-button type="primary" v-on:click="listTypeLoad" icon="fa fa-list-ul">分类列表</el-button>
                </el-tooltip>
                 <el-button type="primary" v-on:click="showEditForm(emptyProductForm)" icon="plus">新增产品</el-button>
            </el-col>
        </el-row>
        <!--表格-->
        <el-table :data="tbInfos" height="500" border show-summary style="width: 100%;margin-top: 10px;" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="Id" width="80">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="code" label="编码" width="120">
            </el-table-column>
            <el-table-column prop="add_time" label="添加时间" width="120">
            </el-table-column>
            <el-table-column prop="product_class_name" label="所属分类" width="120">
            </el-table-column>
            <el-table-column label="封面">
                <template slot-scope="scope">
                    <img v-if="scope.row.front_cover_img" :src="scope.row.front_cover_img" class="avatar">
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="showEditForm(scope.row)">修改</el-button>
                    <el-button type="text" @click="deleteForm(scope.row)">删除</el-button>
                    <a target="_blank" v-bind:href="scope.row.url">预览</a>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="sizes" :page-size="dtSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right; margin-top: 10px; ">
        </el-pagination>

        <!-- 产品详情弹窗 -->
        <el-dialog :visible.sync="outerVisible" :title="ProductForm.id>0?'修改产品':'添加产品'" :modal="true"   :close-on-click-modal="false" :close-on-press-escape="false" width="80%" style="margin-top: 20px;margin-left: 120px;" >
             
              <el-form :model="ProductForm" :rules="ProductRules" ref="ProductForm" label-width="100px" class="demo-ProductForm" >
                <h3>产品信息管理</h3>
                <el-form-item label="关键字" prop="name" required>
                      <el-input v-model="ProductForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="编码" prop="code" required>
                      <el-input v-model="ProductForm.code"></el-input>
                  </el-form-item>
                  <el-form-item label="是否可用" >
                      <el-col :span="12">
                        <el-checkbox  v-model="ProductForm.is_enables"  @change="change">可用</el-checkbox >
                      </el-col>
                       <el-col :span="2">所属分类</el-col>
                      <el-col :span="10">
                          <el-select v-model="ProductForm.product_class_id" placeholder="所属分类" clearable>
                            <el-option v-for="item in types" :key="item.name" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="封面图片" required>
                      <el-upload class="upload-demo" drag :action="fileUploadApi" :on-success="imgUploadSuccess" :auto-upload="true" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">将文件拖到此处，或
                          <em>点击上传</em>
                          </div>
                          <div style='display:none;' class="el-upload__tip" slot="tip">只能上传png/jpg文件</div>
                      </el-upload>
                       <img width="20%" :src="ProductForm.front_cover_img" alt="">
                  </el-form-item>
                  
                  <el-form-item label="产品内容" >
                      <el-card>
                              <editor ref="myTextEditor"
                                      :fileName="'myFile'"
                                      :name="'myFile1'"
                                      :canCrop="canCrop"
                                      :uploadUrl="uploadUrl"
                                      :baseUrl="baseUrl"
                                     
                                      v-model="ProductForm.content"></editor>
                            <div v-html="ProductForm.content"></div>
                      </el-card>
                  </el-form-item>
                
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('ProductForm')" :loading="editFormLoading">确定</el-button>
              </div>
        </el-dialog>
    </div>
</template>
<script>
import editor from "../../util/Quilleditor";
import server from "../../store/server";
import "../../util";
import clone from "clone";

export default {
  // @uploadSuccess="editorImgUploadSuccess"
  data() {
    return {
      canCrop: true,
      baseUrl: server.baseFile,
      /*测试上传图片的接口，返回结构为{url:''}*/
      uploadUrl: server.baseFile + "/api/files/?path=info", //富文本编辑器上传地址
      fileUploadApi: server.baseFile + "/api/files/?path=info", //封面图片上传地址

      sizes: [1, 5, 10],
      dtSize: 5,
      page: 1,
      total: 0,
      types: [{}],
      tbInfos: [],
      conditions: {
        name: "",
        typeid: 0
      },
      emptyProductForm: {
        id: 0,
        name: "",
        code: "",
        product_class_id: 0,
        product_class_name: "",
        content: "",
        is_enable: 1,
        is_enables: false,
        front_cover_img: ""
      },
      ProductForm: {
        id: 0,
        name: "",
        code: "",
        product_class_id: 0,
        product_class_name: "",
        content: "",
        is_enable: 1,
        is_enables: false,
        front_cover_img: ""
      },
      ProductRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        code: [
          { message: "请输入标题", trigger: "blur" },
          { min: 0, max: 25, message: "长度在 0 到 25 个字符", trigger: "blur" }
        ]
      },
      outerVisible: false,
      editFormLoading: false
    };
  },
  methods: {
    load: function() {
      //获取产品分类
      server.get("/product_class1/?sidx=id&sord=desc").then(res => {
        if (res) {
          this.types = res.rows;
        }
      });
      //获取产品列表
      let o = {
        page: this.page,
        size: this.dtSize,
        conditions: this.conditions
      };
      server.post("/product_list/", o, this).then(res => {
        let { page, total, records, rows } = res;
        this.tbInfos = rows;
        this.total = records;
      });
    },
    //分类列表
    listTypeLoad: function() {
      alert("分类列表页面");
    },
    //list 数据后颜色控制
    tableRowClassName: function({ row, rowIndex }) {
      // console.log(row.is_enable);
      if (row.is_enable == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    //页大小变化处理
    handleSizeChange: function(size) {
      this.dtSize = size;
      this.load();
    },
    //页码变化处理
    handlePageChange: function(page) {
      this.page = page;
      this.load();
    },
    //编辑产品
    showEditForm: function(model) {
      if (model) {
        model.is_enables = model.is_enable == 1;
        this.ProductForm = clone(model);
      }
      this.outerVisible = true;
    },
    change: function(data) {
      // this.ProductForm.is_enable=this.ProductForm.is_enables?1:0;
      // console.log(data);
      // console.log(this.ProductForm.is_enables);
      // console.log(this.ProductForm.is_enable);
    },
    //提交编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let model = clone(this.ProductForm);
        console.log(model.is_enables);
        model.is_enable = model.is_enables ? 1 : 0;
        this.editFormLoading = true;
        server.post("/product/", model, this).then(res => {
          this.editFormLoading = false;
          let { state, data, msg } = res;
          let successMsg = model.id > 0 ? "修改成功(:=" : "添加成功(:=";
          let failureMsg = model.id > 0 ? "修改失败，请稍后重试(:=" : "添加失败，请稍后重试(:=";
          this.editFormLoading = false;
          if (state == 0) {
            this.outerVisible = false;
            this.load();
            this.$message({ type: "success", message: msg });
          } else {
            this.$message({ type: "error", message: msg });
          }
        });
      });
    },
    //删除产品
    deleteForm: function(row) {
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let o = {
          id: row.id,
          _method: "DELETE"
        };
        server.post("/product/", o, this).then(res => {
          let { state, data, msg } = res;
          if (state == 0) {
            this.load();
            this.$message({ type: "success", message: msg });
          } else {
            this.$message({ type: "error", message: msg });
          }
        });
      });
    },

    //目前没用 editor获取不到
    editorImgUploadSuccess(res) {
      //富文本编辑器文件上传成功
      if (res.state) {
        // console.log(server.baseFile + res.url);
        this.editor.focus();
        this.editor.insertEmbed(
          this.editor.getSelection().index,
          "image",
          server.baseFile + res.url
        );
      }
    },
    imgUploadSuccess(res) {
      //图片上传成功
      if (res.state) {
        this.ProductForm.front_cover_img = server.baseFile + res.url;
      }
    }
  },
  components: {
    editor
  },
  mounted: function() {
    this.load();
  },
  created: function() {}
};
</script>

<style>
#app1 {
  margin-top: 10px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table__row img {
  width: 58px;
  height: 54px;
}
</style>

