<template>
  <h1>
    index</h1>
</template>
<template>
  <div id="app1">
    <!--表头-->
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input :inline="true" prefix-icon="el-icon-search" v-model="conditions.name" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select :inline="true" v-model="conditions.typeid" placeholder="所属分类" clearable>
          <el-option v-for="item in types" :key="item.name" :label="item.name" :value="item.Id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="14">
        <el-button type="primary" v-on:click="load" icon="fa fa-search">查询</el-button>
        <el-button type="primary" v-on:click="showEditForm(emptyForm)" icon="plus">新增文章</el-button>
        <!--<el-button type="primary" v-on:click="showEditForm(emptyruleForm)" icon="plus">新增文章</el-button>
                                                <el-button type="primary" v-on:click="showEditType(emptyTypeForm)" icon="plus">新增分类</el-button>-->
        <el-tooltip class="item" effect="dark" content="Top Left 分类列表" placement="top-start">
          <el-button type="primary" v-on:click="listTypeLoad" icon="fa fa-list-ul">分类列表</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="tbInfos" height="500" border show-summary style="width: 100%;margin-top: 10px;" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="Id" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="age" label="头像">
        <template slot-scope="scope">
          <img v-if="scope.row.headImg" :src="scope.row.headImg" class="avatar">
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

    <el-pagination background @size-change="handleSizeChange" @current-change="handleDtInfosPageChange" :page-sizes="sizes" :page-size="dtSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right; margin-top: 10px; ">
    </el-pagination>
  </div>
</template>


<script>
import clone from 'clone'
export default {
  data() {
    return {
      conditions: {
        name: '',
        typeid: '',
      },
      types: [
        { name: '选项1', id: 1 },
        { name: '选项A', id: 2 },
        { name: '选项2', id: 3 },
        { name: '选项B', id: 4 },
      ],
      count: 1,
      listTmp: [],
      tbInfos: [],
      dtSize: 10,
      total: 100,
      page: 1,
      sizes: [10, 20, 30, 40],
      emptyForm:{
        id:0,
        name:''
      }
    }
  },
  methods: {
    load() {
      this.tbInfos = [];
      this.page = this.page < 1 ? 1 : this.page;
      this.page = Math.ceil(this.total / this.dtSize) > this.page ? this.page : Math.ceil(this.total / this.dtSize);
      let startIndex = (this.page - 1) * this.dtSize;
      let endIndex = startIndex + this.dtSize;
      for (var i = startIndex; i < this.total && i < endIndex; i++) {
        this.tbInfos.push(this.listTmp[i]);
      }
      // this.total = this.tbInfos.count;
      console.log(this.count);
      this.count++;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'warning-row';
      } else if (rowIndex % 3 == 0) {
        return 'success-row';
      }
      return '';
    },
    listTypeLoad() {

    },
    handleSizeChange(size) {
      this.dtSize = size;
      this.load();
    },
    handleDtInfosPageChange(page) {
      this.page = page;
      this.load();
    },
    showEditForm: function(model) {
      // alert(model.id);
      this.$router.push({
        name:'activeManage',
        query:{'id':model.id,'name':model.name}
      });
    },
    deleteForm: function(model) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        alert(model.id);
      });

    },

  },
  //钩子函数 页面第一次加载时候调用
  mounted() {
    var tmp = {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      url: 'http://sfl.sanfengli.cn/index.php?s=/w16/Vote/Vote/iframe3/url/index.html.html&mdm=17|411',
      age: 10,
      headImg: 'http://img.ivsky.com/img/bizhi/co/201711/16/mclaren_the_tour-013.jpg',
      id: 0,
    }
    this.listTmp = [];
    for (var i = 0; i < this.total; i++) {
      tmp.id = i;
      let model = clone(tmp);
      model.name=model.name+i;
      this.listTmp.push(model);
    }
    this.load();
  }
}
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

