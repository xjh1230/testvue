<template>
  <div class="demo-input-suffix">
    <div><h1>活动详情</h1></div>
    <el-form  :model="user" class="demo-form-inline" label-width="100px">
      <el-form-item label="Id">
        <el-input v-model="user.id" placeholder="Id"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="属性指标">
        <el-card class="box-card">
            <el-table :data="user.props"  border  style="width: 100%;margin-top: 10px;" >
              <el-table-column prop="name" label="属性">
                <template slot-scope="scope">
                   <el-input v-model="scope.row.name" placeholder="属性"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteProp(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
         
          <el-button type="text" @click="addProp()">新增</el-button>
        </el-card>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input22: "",
      input23: "",
      user: {
        id: 0,
        name: "",
        props: [{ id: 0, name: "" }]
      }
    };
  },
  methods: {
    icon_click() {
      alert("id:" + this.id + ",name:" + this.name);
    },
    addProp: function() {
      let length=this.user.props.length;
      this.user.props.push({ id: length, name: "" });
    },
    deleteProp: function(rows) {
      console.log(rows.id);
      this.user.props = this.user.props.filter(t => t.id != rows.id)
    }
  },
  mounted: function() {
    this.user.id = this.$route.query.id;
    this.user.name = this.$route.query.name;
    // alert("id:"+this.id+',name:'+this.name);
  }
};
</script>
