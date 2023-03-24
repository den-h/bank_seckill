<template>
  <div>

    <div>

      <el-button type="primary" size="small" class="add" @click="addvisible=true">添加</el-button>

      <el-dialog v-model="addvisible">


        <el-form ref="form" :model="form" label-width="80px" class="hhh">


          <el-form-item label="商品名称">
            <el-input v-model="form.seckillName"></el-input>
          </el-form-item>

          <el-form-item label="商品利率">
            <el-input v-model="form.seckillRate"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="form.seckillPrice"></el-input>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input v-model="form.seckillDescribe"></el-input>
          </el-form-item>

          <el-form-item label="商品库存">
            <el-input v-model="form.seckillStock"></el-input>
          </el-form-item>

          <el-form-item label="秒杀时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="开始时间" v-model="form.beginDate" value-format="YYYY-MM-DD h:mm:ss A"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">---</el-col>
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="结束时间" v-model="form.finalDate" value-format="YYYY-MM-DD h:mm:ss A"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addSubmit">添加</el-button>
            <el-button @click="addvisible=false">取消</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>

      <el-dialog v-model="editvisible">

        <el-form ref="form" :model="editform" label-width="80px" class="hhh">
          <el-form-item label="商品编号">
            <el-input v-model="editform.id" disabled></el-input>
          </el-form-item>

          <el-form-item label="商品名称">
            <el-input v-model="editform.seckillName"></el-input>
          </el-form-item>

          <el-form-item label="商品利率">
            <el-input v-model="editform.seckillRate"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="editform.seckillPrice"></el-input>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input v-model="editform.seckillDescribe"></el-input>
          </el-form-item>

          <el-form-item label="商品库存">
            <el-input v-model="editform.seckillStock"></el-input>
          </el-form-item>

          <el-form-item label="秒杀时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="开始时间" v-model="editform.beginDate" value-format="YYYY-MM-DD hh:mm:ss A"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">---</el-col>
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="结束时间" v-model="editform.finalDate" value-format="YYYY-MM-DD hh:mm:ss A"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editSubmit">编辑</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>

    </div>

    <div>

      <el-table
          :data="position"
          border
          style="width: 98%;margin-left: 10px">

        <el-table-column
            fixed
            label="商品编号"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品名称"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.seckillName }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品利率"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.seckillRate }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品价格"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.seckillPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品描述"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.seckillDescribe }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="商品库存"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.seckillStock }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="开始时间"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.beginDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="结束时间"
            width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.finalDate }}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" fixed="right" width="180px">
          <template #default="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">下架
            </el-button>
          </template>
        </el-table-column>
      </el-table>


    </div>


  </div>

</template>

<script scoped>

import axios from "axios";


export default {

  name: "Allgoods",

  data() {
    return {
      keyword:'',
      position: [{
        id: '1',
        seckillName: '2',
        seckillRate: '4',
        seckillPrice: '',
        seckillDescribe: '',
        seckillStock: '',
        beginDate: '',
        finalDate: ''
      }],
      addvisible: false,
      editvisible:false,
      form: {
        seckillName: '',
        // id: '',
        seckillPrice: '',
        seckillRate: '',
        seckillStock: '',
        seckillDescribe: '',
        beginDate: '',
        finalDate: ''
      },
      editform: {
        seckillName: '',
        id: '',
        seckillPrice: '',
        seckillRate: '',
        seckillStock: '',
        seckillDescribe: '',
        beginDate: '',
        finalDate: ''
      },
    }
  },

  methods: {
    initposition() {
      axios.post('/api/goods/allgoods').then((res) => {
        if(res.data.code===200) {
          this.position = res.data.data;
        }
        else if(res.data.code === 500217){
          this.$message.error("用户未登录");
          this.$router.push('/');
        }
      }).catch((error) => {
        console.log(error.data.message)
      })

    },
    cancel(){
      this.editvisible=false;
      this.initposition();
},
    addSubmit() {
      axios.post('/api/goods/add',
         this.form
      ).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("添加成功");
        }else if(res.data.code===500100)
        {
          this.$message.error("商品插入失败");
        }

      })
          .catch(error => {
            console.log(error);
            this.$message.error("添加失败");
          })

      this.addvisible = false;
      this.initposition();
    },

    editSubmit() {
      axios.post('/api/goods/alter', this.editform).then(res => {
        if (res.data.code === 200) {
          this.$message.success("编辑成功")
        }else if(res.data.code===500102)
        {
          this.$message.error("商品修改失败");
        }

      }).catch(error => {
        console.log(error);
        this.$message.error("编辑失败")
      })
      this.editvisible=false;
      this.initposition();
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/goods/delete', {
          goodsid: row.id
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initposition();
          }else if(res.data.code===500101)
          {
            this.$message.error("商品删除失败")
          }
        }).catch(error => {
          console.log(error);
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleEdit(row) {

      this.editvisible = true;
      this.editform = row;


    },
  },
    mounted() {
      this.initposition();

    }
  }

</script>

<style scoped>
.add {
  width: 150px;
  height: 30px;
  margin: 10px 10px 10px;
}
.el-table{
  height: 600px;
  overflow-y: scroll;
}

</style>