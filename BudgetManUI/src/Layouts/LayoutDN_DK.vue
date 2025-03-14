<template>
  <!-- <el-menu  class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @keyup.enter="handleSelect">
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="Login()">{{ $t('login') }}</el-menu-item>
    <el-menu-item index="2" @click="Register()">{{ $t('register') }}</el-menu-item>
  </el-menu> -->
  <!-- <div class="container">
    <div class="left-part">
      <el-image :src="bannerImg"></el-image>
    </div>
    <div class="right-part">
      <router-view />
    </div>
  </div> -->

  <div class="container login_register">
    <el-col :span="17" class="banner"
      ><el-image :src="bannerImg" class="container fade-in-image"></el-image
    ></el-col>
    <el-col
      :span="7"
      :style="{
        position: 'relative',
        background: `url(${background}) center/cover no-repeat`,
      }"
      class="main-area function"
    >
      <el-row class="first-page-menu">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @keyup.enter="handleSelect"
        >
          <el-image :src="logo"></el-image>
          <div class="flex-grow" />
          <el-link v-if="showLoginLink" href="/login">{{
            $t("login")
          }}</el-link>
          <el-link v-if="showRegisterLink" href="/register">{{
            $t("register")
          }}</el-link>
          <!-- <el-menu-item index=""><el-link v-if="showLoginLink" href="/login">Login</el-link></el-menu-item>
          <el-menu-item index=""> <el-link v-if="showRegisterLink" href="/register">Register</el-link></el-menu-item> -->
        </el-menu>
      </el-row>
      <el-row class="container">
        <router-view />
      </el-row>
      <!-- <el-footer>Footer</el-footer> -->
    </el-col>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import bannerImg from "@/assets/images/banner-image-vi.jpg";
import logo from "@/assets/budget-logo.png";
import background from "@/assets/images/background.jpg";
const router = useRouter();
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const Login = () => {
  window.location.href = `/login`;
};
const Register = () => {
  window.location.href = `/register`;
};
const showLoginLink = computed(() => {
  // console.log(router.currentRoute.value.name);
  return router.currentRoute.value.name !== "login";
});
const showRegisterLink = computed(() => {
  // console.log(router.currentRoute.value.name);
  return router.currentRoute.value.name !== "register";
});

// const showRegisterLink= () =>  {
//       return $route.name !== 'register'; // Show only if not on the register route
//     }
</script>
<style>
div.el-row.login-container {
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
.left-part > .el-image {
  width: 70%;
  bottom: 0;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}
.flex-grow {
  flex-grow: 2;
}
ul.el-menu.el-menu--horizontal.el-menu-demo {
  height: 60px;
  padding-right: 5%;
}
.el-menu {
  border-right: none;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  width: 100%;
}

.first-page-menu {
  position: absolute;
  width: 100%;
  z-index: 99;
}
.menu-item {
  height: 60px;
  float: right;
  position: absolute;
}
.flex-grow {
  flex-grow: 1;
}
.fade-in-image {
  opacity: 0;
  animation: fadeInRight 2s forwards;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.main-area {
  animation: moveBackground 120s linear infinite alternate;
}
@keyframes moveBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
}
</style>
