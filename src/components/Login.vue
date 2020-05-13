<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avator_box">
        <img src="../assets/logo.png" />
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="formRules" class="login_form">
        <el-form-item label prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="name"
            prefix-icon="icofont-user-alt-5"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="password"
            type="password"
            prefix-icon="icofont-ui-password"
          ></el-input>
        </el-form-item>
        <el-form-item label class="btns">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      formRules: {
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          // const {data: res} = await this.$http.post('login', this.loginForm);
          /*var res = {
                        meta: {
                            status: 300,
                            error: 'internal server error'
                        }
                    }*/
          var res = {
            meta: {
              status: 200
            },
            data: {
              token: 'iqoqiweoruqpoiqpowiupeoir'
            }
          }
          if (res.meta.status !== 200) {
            this.$message.error({
              showClose: true,
              duration: 2000,
              message: res.meta.error
            })
          } else {
            this.$message.success({
              showClose: true,
              duration: 2000,
              message: 'Hi!! ' + this.loginForm.username
            })
            // 保存token到sessionStorage
            window.sessionStorage.setItem('token', res.data.token)
            // 跳转到home主页
            this.$router.push('/home')
          }
        } else {
          this.$message.error('login failed')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 10px; // 圆边框
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avator_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
