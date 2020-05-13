<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/header.jpg" alt width="50px" height="50px" />
        <span>Shop Admin System</span>
      </div>
      <el-button type="info" @click="logout">Logout</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">||||</div>
        <el-menu background-color="#333744" text-color="#ffffff" active-text-color="#409bff"
         unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="defaultActive">
          <!---router 开启路由模式，会跳转到子目录index指定的路由--->
          <!---一级菜单 :index 可以让菜单项行为独立，打开，关闭，不影响其他menu--->
          <el-submenu :index="'/' + item.path" v-for="item in menuList" :key="item.id">
            <!--- 一级菜单的模版 --->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id" @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      defaultActive: ''
    }
  },
  created() {
    this.getMenuList()
    this.defaultActive = window.sessionStorage.getItem("defaultActive");
  },
  methods: {
    saveNavState(navPath) {
      window.sessionStorage.setItem('defaultActive', navPath);
      this.defaultActive = navPath;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      window.sessionStorage.removeItem('token')
      this.$message.info({
        message: 'logout',
        showClose: true,
        duration: 2000
      })
      this.$router.push('/login')
    },
    async getMenuList() {
      // const {data: res} = await this.$http.get('menus')
      var res = {
        meta: {
          status: 200,
          msg: 'success'
        },
        data: [
          {
            authName: 'User Admin',
            children: [
              {
                authName: 'UserList',
                id: 129,
                order: 1,
                path: 'userlist'
              }
            ],
            id: 128,
            order: 1,
            path: 'users'
          },
          {
            authName: 'Permission Admin',
            id: 130,
            order: 2,
            children: [
              {
                authName: 'RoleList',
                id: 140,
                order: 1,
                path: 'rolelist'
              },
              {
                authName: 'PermList',
                id: 141,
                order: 1,
                path: 'permlist'
              }
            ],
            path: 'rights'
          },
          {
            authName: 'Product Admin',
            id: 131,
            children: [
              {
                authName: 'ProductList',
                id: 151,
                order: 1,
                path: 'productlist'
              },
              {
                authName: 'CategoryParameter',
                id: 152,
                order: 1,
                path: 'categoryparam'
              },
              {
                authName: 'Product Category',
                id: 153,
                order: 1,
                path: 'productcategory'
              }
            ],
            order: 2,
            path: 'product'
          },
          {
            authName: 'Order Admin',
            id: 132,
            order: 2,
            children: [
               {
                authName: 'OrderList',
                id: 160,
                order: 1,
                path: 'orderlist'
              }
            ],
            path: 'rights'
          },
          {
            authName: 'Data Analysis',
            id: 133,
            order: 2,
            path: 'rights'
          }
        ]
      }
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: res.meta.msg,
          showClose: true,
          duration: 2000
        })
      }
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #ffffff;
  font-size: 30px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>