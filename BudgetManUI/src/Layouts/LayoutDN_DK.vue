<template>
  <el-container>

    <el-menu  class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @keyup.enter="handleSelect">
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1" @click="Login()">Login</el-menu-item>
      <el-menu-item index="2" @click="Register()">Register</el-menu-item>
    </el-menu>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const Login = () => {
    window.location.href = `/login`;
  }
const Register = () => {
    window.location.href = `/register`;
  }
</script>
<style>

.flex-grow {
  flex-grow:2;
}
ul.el-menu.el-menu--horizontal.el-menu-demo {
    height: 60px;
}
.el-menu {
  border-right: none;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  width: 100%;
}

.el-main {
  padding: 10px;
}
/* .el-container{
  background-color:aliceblue;
  height: 740px;
} */
</style>