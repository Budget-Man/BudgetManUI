<template>
  <div>
    <el-container>
      <el-header>
        <button @click="logout()"><el-icon><SwitchButton /></el-icon> {{userName}}</button>
      </el-header>
      <el-container>
        <el-aside class="menu-aside" :collapse="isCollapse">
          <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
          router= true collapse-transition="false"
            @close="handleClose">
            <el-menu-item @click="toggleMenu">
              <el-icon><Menu /></el-icon>
              <template></template>
            </el-menu-item>
            <el-menu-item index="/MoneyHolder" >
              <el-icon><WalletFilled /></el-icon>
              <template #title>Money Holder</template>
            </el-menu-item>
            <el-menu-item index="/moneyspend" >
              <el-icon><Money /></el-icon>
              <template #title>Money spend</template>
            </el-menu-item>
            <el-menu-item index="/income" >
              <el-icon><Money /></el-icon>
              <template #title>Income</template>
            </el-menu-item>
            <el-menu-item index="/loan" >
              <el-icon><Money /></el-icon>
              <template #title>Loan</template>
            </el-menu-item>
            <el-menu-item index="/debt" >
              <el-icon><Money /></el-icon>
              <template #title>Debt</template>
            </el-menu-item>
            <el-menu-item index="/budget" >
              <el-icon><Money /></el-icon>
              <template #title>Budget</template>
            </el-menu-item>
            <el-menu-item index="/budgetCate" >
              <el-icon><PriceTag /></el-icon>
              <template #title>Budget Category</template>
            </el-menu-item>
           
            <el-menu-item index="/user" >
              <el-icon><Avatar /></el-icon>
              <template #title>USER</template>
            </el-menu-item>
           
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
          <el-image
  src="https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-n%E1%BB%81n-c%C3%B4ng-ngh%E1%BB%87-cho-ppt-scaled.jpg"
  fit="cover"
  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
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
.el-footer{
  height:150px;
}
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
.el-header>p {
  margin-left: 90%;
}

.el-aside {
  color: #b9ddfb;
  background:#b9ddfb;
  height: 580px;
}
.menu-aside{
  width: fit-content;
  
}
.el-menu {
  border-right: none;
  
}

.el-main {
  padding: 10px;
  width: 100%;
  height: 580px;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-footer{
  background-color: #b9ddfb;
}
.el-pagination{
  background-color: #ffffff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: fit-content;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 55px;
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
