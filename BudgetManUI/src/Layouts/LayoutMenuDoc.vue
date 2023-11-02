<template>
  <div>
    <el-container>
      <el-header>
        <button @click="logout()"><el-icon><SwitchButton /></el-icon> {{userName}}</button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '150px'">
          <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
          router= true
            @close="handleClose">
            <el-menu-item @click="toggleMenu">
              <el-icon><Menu /></el-icon>
              <template></template>
            </el-menu-item>
            <el-menu-item index="/income" >
              <el-icon><Money /></el-icon>
              <template #title>Income</template>
            </el-menu-item>
            <el-menu-item index="/budgetCate" >
              <el-icon><PriceTag /></el-icon>
              <template #title>Budget Category</template>
            </el-menu-item>
            <el-menu-item index="/MoneyHolder" >
              <el-icon><WalletFilled /></el-icon>
              <template #title>Money Holder</template>
            </el-menu-item>
            <el-menu-item index="/user" >
              <el-icon><Avatar /></el-icon>
              <template #title>USER</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><Search /></el-icon>
              <template #title>SEARCH USER</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><PieChart /></el-icon>
              <template #title> STATISTICS</template>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon>
                <setting />
              </el-icon>
              <template #title>SETTING</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style>
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.el-header > button {
  height: 100%;
  width: auto;
  background-color: var(--el-color-primary-light-7);
  cursor: pointer;
  float: right;
  border: var(--el-color-primary-light-7);
}
.el-header>p {
  margin-left: 90%;
}

.el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.el-menu {
  border-right: none;
}

.el-main {
  padding: 10px;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
</style>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Setting,
  House,
  Avatar,
  Search,
  PieChart,
  SwitchButton,
  Menu,
  WalletFilled,
  PriceTag,
  Money
} from '@element-plus/icons-vue'
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const userName=getCookie('UserName');
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const toggleMenu = () => {
  // Thay đổi giá trị của biến `isCollapse`
  isCollapse.value = !isCollapse.value;
};
function logout() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }
  window.location.href = "/login";
}
</script>
