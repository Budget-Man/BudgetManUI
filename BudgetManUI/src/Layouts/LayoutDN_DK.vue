<template>
  <el-menu  class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @keyup.enter="handleSelect">
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="Login()">Login</el-menu-item>
    <el-menu-item index="2" @click="Register()">Register</el-menu-item>
  </el-menu>
<div class="container">
  <div class="left-part">
    <el-image src="https://genieacademy.net/wp-content/uploads/2020/03/phuong-phap-quan-ly-chi-tieu-cua-tu-2048x1165.jpg"></el-image>
  </div>
  <div class="right-part">
      <router-view />
  </div>
</div>
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
div.el-row.login-container{
  margin-left: 50px;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.left-part {
  width: 60%;
}

.right-part {
  width: 30%;
}
.left-part>.el-image{
  width: 70%;
  bottom: 0;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}
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
</style>