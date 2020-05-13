<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>UserAdmin</el-breadcrumb-item>
      <el-breadcrumb-item>UserList</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input
            placeholder="input search word"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="dialogVisible=true">addUser</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="name" width="180"></el-table-column>
        <el-table-column prop="mobile" label="cellphone" width="180"></el-table-column>
        <el-table-column prop="email" label="email" width="180"></el-table-column>
        <el-table-column prop="role_name" label="role" width="180"></el-table-column>
        <el-table-column prop="mg_status" label="status" width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_status" @change="userStatusChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="operation" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="grey"
              content="edit role"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="addUser" :visible.sync="dialogVisible" width="30%">
      <el-form ref="addFormRef" :model="addForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="username" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="phone" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="-fodialogoter">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addUserConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="editUser" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="editFormRef" :model="editForm" label-width="80px" :rules="editFormRules">
        <el-form-item label="username" prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="phone" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="-fodialogoter">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="editUserConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkMobile = (rule, value, cb) => {
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('please input legal phone number'))
    }
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('please input legal email'))
    }

    return {
      userList: [],
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      dialogVisible: false,
      editDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      editForm: {
        username: '',
        email: '',
        phone: ''
      },
      addFormRules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 30,
            message: 'length between 3 and 30',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'please input password', trigger: 'blur' }
        ],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        phone: [{ required: true, validator: checkMobile, trigger: 'blur' }]
      },
      editFormRules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 30,
            message: 'length between 3 and 30',
            trigger: 'blur'
          }
        ],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        phone: [{ required: true, validator: checkMobile, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    deleteUser(userInfo) {
      console.log('delete User')
      console.log(userInfo)
      this.$confirm('delete ?', 'Attention', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          this.$message.success({
            message: 'deleted',
            showClose: true,
            duration: 2000
          })
        })
        .catch(() => {
        })
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
      console.log('editDialogclosed')
    },
    editUserConfirm() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        // const {data: res} = await this.$http.post('editUser', this.editForm);
        this.$refs.editFormRef.resetFields()
        this.editDialogVisible = false
        this.$message.success({
          message: 'edit user success',
          showClose: true,
          duration: 2000
        })
      })
    },
    showEditDialog(userInfo) {
      this.editForm.username = userInfo.username
      this.editForm.email = userInfo.email
      this.editForm.phone = userInfo.mobile
      console.log(userInfo)
      this.editDialogVisible = true
    },
    addUserConfirm() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        // const {data: res} = await this.$http.post('addUser', this.addForm);
        this.dialogVisible = false
        this.$refs.addFormRef.resetFields()
        this.getUserList()
        this.$message.success({
          showClose: true,
          duration: 2000,
          message: 'add user succeed'
        })
        console.log('call server and add user')
      })
    },
    addDialogClose() {
      this.dialogVisible = false
      this.$refs.addFormRef.resetFields()
      console.log('dialog closed and fields reseted..')
    },
    userStatusChanged(userInfo) {
      console.log(userInfo)
      console.log('save user info to server')
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async getUserList() {
      console.log('get user list from server..')
      // const{data: res} = await this.$http.get('users', {params: this.queryInfo});
      const res = {
        data: {
          users: [
            {
              id: 1,
              username: 'amy',
              mobile: '13291822134',
              type: 1,
              email: 'qqoiw@qwe.com',
              create_time: '2019-02-04T20:00:00Z',
              mg_status: true,
              role_name: 'admin'
            },
            {
              id: 2,
              username: 'Jack',
              mobile: '13291822134',
              type: 2,
              email: 'qqoiw@qwe.com',
              create_time: '2019-02-04T20:00:00Z',
              mg_status: true,
              role_name: 'user'
            }
          ],
          total: 0
        }
      }
      this.userList = res.data.users
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
</style>