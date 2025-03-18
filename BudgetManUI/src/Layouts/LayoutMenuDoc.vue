<template>
  <div class="box screen-h no-rounded" style="overflow: hidden;">
    <el-container class="box flex flex-col full screen-h no-wrap">
      <el-header style="padding-left: 0px" class="box full no-rounded">
        <a href="/" style="all: unset">
          <el-image
            :src="logo"
            style="
              height: 64px;
              filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
            "
            id="mask"
          ></el-image>
        </a>
        <button @click="logout()">
          <el-icon><SwitchButton /></el-icon> {{ userName }}
        </button>
      </el-header>
      <el-container style="overflow: hidden" class="box no-rounded full">
        <el-aside class="menu-aside" :collapse="isCollapse">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo box no-rounded scroll"
            :collapse="isCollapse"
            @open="handleOpen"
            router="true"
            collapse-transition="false"
            @close="handleClose"
          >
            <el-menu-item @click="toggleMenu">
              <el-icon><Menu /></el-icon>
              <template></template>
            </el-menu-item>
            <el-menu-item index="/Overview">
              <el-icon><PieChart /></el-icon>
              <template #title>{{ $t("moneyOverview.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/MoneyHolder">
              <el-icon><WalletFilled /></el-icon>
              <template #title>{{ $t("moneyHolder.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/moneyspend">
              <el-icon><Money /></el-icon>
              <template #title>{{ $t("moneySpend.name") }} </template>
            </el-menu-item>
            <el-menu-item index="/income">
              <el-icon><Money /></el-icon>
              <template #title>{{ $t("income.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/loan">
              <el-icon><Money /></el-icon>
              <template #title>{{ $t("loan.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/debt">
              <el-icon><Money /></el-icon>
              <template #title>{{ $t("debt.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/budget">
              <el-icon><Money /></el-icon>
              <template #title>{{ $t("budget.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/budgetCate">
              <el-icon><PriceTag /></el-icon>
              <template #title>{{ $t("budgetCat.name") }}</template>
            </el-menu-item>

            <el-menu-item index="/user">
              <el-icon><Avatar /></el-icon>
              <template #title>{{ $t("user.name") }}</template>
            </el-menu-item>
            <el-menu-item index="/setting">
              <el-icon><Setting /></el-icon>
              <template #title>{{ $t("setting.name") }}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="" style="overflow: hidden;">
          <div  style="max-height: 100%;overflow: hidden;">
            <router-view />

          </div>
          <el-image
            src="https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-n%E1%BB%81n-c%C3%B4ng-ngh%E1%BB%87-cho-ppt-scaled.jpg"
            fit="cover"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: -1;
            "
          >
          </el-image>
        </el-main>
      </el-container>
      <!-- <el-footer>
        <div class="footer-container">
          <div class="footer-item">
            <h4>Contact Us</h4>
            <p>Address: Ap Bac Street, My Tho City, Tien Giang Province</p>
            <p>Phone: 0273 387 8900</p>
            <p>Email: y021101022@tgu.edu.vn</p>
          </div>
          <div class="footer-item">
            <h4>About Us</h4>
            <p>Welcome to our website!</p>
            <p>We are a company providing high-quality products and services.</p>
            <p>Please visit our website to learn more about us.</p>
          </div>
          <div class="footer-item">
            <h4>News</h4>
            <p><a href="#">Latest News</a></p>
            <p><a href="#">Product News</a></p>
            <p><a href="#">Service News</a></p>
          </div>
        </div>
      </el-footer> -->
    </el-container>
  </div>
</template>

<style>
/* .el-footer {
  height: 150px;
} */
.footer-container {
  display: flex;
  justify-content: space-between;
}

.footer-item {
  width: 25%;
  margin-bottom: 20px;
  margin-left: 5%;
}

.footer-item h4 {
  font-size: 20px;
  margin-bottom: 10px;
}

.footer-item p {
  font-size: 14px;
  line-height: 20px;
}

.el-header {
  position: relative;
  background-color: #b9ddfb;
  color: #b9ddfb;
}
.el-header > button {
  height: 100%;
  width: auto;
  background-color: #b9ddfb;
  cursor: pointer;
  float: right;
  border: #b9ddfb;
}
.el-header > p {
  margin-left: 90%;
}

.el-aside {
  color: #b9ddfb;
  background: #b9ddfb;
}
.menu-aside {
  width: fit-content;
}
.el-menu {
  border-right: none;
}

.el-main {
  padding: 10px;
  width: 100%;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-footer {
  background-color: #b9ddfb;
}
.el-pagination {
  background-color: #ffffff;
  justify-content: center;
  margin-top: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: fit-content;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 55px;
  min-height: 400px;
}
.table-container {
  background-color: white;
  padding: 10px;
  border-radius: var(--el-border-radius-base);
  margin-left: 10px;
  margin-right: 10px;
}
#mask:hover {
  filter: drop-shadow(0 0 0.75rem rgb(0, 255, 255));
  cursor: pointer;
}
</style>
<script lang="ts" setup>
import { ref } from "vue";
import logo from "@/assets/budget-logo.png";
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
  Money,
} from "@element-plus/icons-vue";
const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const userName = getCookie("UserName");
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
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
