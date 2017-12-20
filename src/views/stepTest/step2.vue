 <template>
  <el-row>
    <el-col :span="10">
      <el-input v-model="Form.name" placeholder="请输入内容"></el-input>
      <p>{{Form.name}}</p>
    </el-col :span="14">
  </el-row>
</template>


<script>
import store from '../../store'
export default {
  data: function() {
    return {
      Form: {
         name:'11',
      },
     
    }

  },
  methods: {
  
  },
  created: function() {
    Object.assign(this.Form, store.store.state.step2Form);
  },
  beforeRouteLeave: function(to, from, next) {
    Object.assign(store.store.state.step2Form,this.Form);
    next();
  }
}
</script>
