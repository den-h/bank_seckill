<template>
  <div>

    <div>
      <el-input
          v-model="searchName"
          :prefix-icon="Search"
          placeholder="请输入姓名"
          class="btn"
          size="default">
      </el-input>

      <el-date-picker
          v-model="searchTime"
          type="date"
          placeholder="选择日期"
          size="default"
          value-format="YYYY-MM-DD hh:mm:ss A"
      >
      </el-date-picker>

      <el-button type="primary" size="default" @click="dosearch" class="sre">筛选</el-button>

    </div>

    <div>

      <el-table
          :data="position"
          border
          max-height="700px"
          style="width: 98%;margin-left: 10px">


        <el-table-column
            label="用户id"
            fixed
            width="250">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="姓名"
            width="250">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>


        <el-table-column
            label="初筛状态"
            width="250">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.status}}</span>
          </template>
        </el-table-column>


        <el-table-column
            label=初筛时间>
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          class="mt-4"
          :page-size="PageSize"
          :current-page="CurrentPage"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>

</template>

<script scoped>

import axios from "axios";
import {Search} from "@element-plus/icons-vue";

export default {
  name: "Screen",
  setup() {
    return {
      Search
    }
  },
  data() {
    return {

      searchTime: '',
      position: [{
        userName: '',
        userId: '',
        status: true,
        time: '',
      }],
      position1: [{
        userName: '',
        userId: '',
        status: '',
        time: ''
      }],
      searchName:'',
      total:100,
      CurrentPage:1,
      PageSize:12
    }
  },

  methods: {
    init() {
      axios.post('/api/filterInfo/all',{
        PageSize:this.PageSize
      }).then(res => {
            if (res.data.code === 200) {
             this.position=res.data.data;
             // this.total=res.data.total;
             let k=this.position;
             for(let i=0;i<k.length;i++)
             {

               if(k[i].status===true)
               {
                 k[i].status="通过";
               }
               else k[i].status="不通过";
             }
            } else if (res.data.code === 500217) {
              this.$message.error("用户未登录");
              this.$router.push('/');
            }
          }).catch(error => {
        console.log(error);
      })
    },
    dosearch() {
      axios.post('/api/filterInfo/nameAndDate', {
        time:this.searchTime,
        userName:this.searchName
      }).then(res=>{
        if(res.data.code===200)
        {
          this.position=res.data.data;

          let k=this.position;
          for(let i=0;i<k.length;i++)
          {
            console.log(k[i].status);
            if(k[i].status===true)
              k[i].status="通过";
            else k[i].status="不通过";
          }
          this.$message.success("查询成功")
        }
      }).catch(error=>{
        console.log(error);
        this.$message.error("查询失败");
      })
    },
    handleCurrentChange(val){
      this.CurrentPage=val;
      this.init();
    }
  },

  mounted() {
    this.init();
  }
}
</script>

<style scoped>
.btn {
  margin: 10px 10px 10px 10px;
  width: 200px;
}

.sre {
  margin-left: 10px;
}
.el-table{
  height:600px;
  overflow-y: scroll;
}
.el-pagination {
  width: 50%;
  margin: 20px auto;
  height: 50px;
}

</style>