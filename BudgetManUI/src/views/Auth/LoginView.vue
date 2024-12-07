

<template>
  <el-row class="login-container">
    <el-col :span="24" class="login-col">
      <div class="grid-content ep-bg-purple">
        <p>Hello!</p>
        <p class="hello">Sign in to your account </p>
        <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="state.userName" placeholder="User name" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input v-model="state.password" type="password" width="300px" autocomplete="off" placeholder="Password"
              :prefix-icon="Key" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login()">Sign In</el-button>
            <el-button type="primary" @click="() => {router.push('/register')}">Register</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-image
  src="https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-n%E1%BB%81n-c%C3%B4ng-ngh%E1%BB%87-cho-ppt-scaled.jpg"
  fit="cover"
  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
</el-image>
  </el-row>
</template>
  
<script setup lang="ts">
import { Calendar, Search, User, Key } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { LoginViewModel } from '../../Models/LoginViewModel'
import { handleLogin } from "../../Services/LoginService"
import { useToast } from "vue-toastification";
import router from "@/router";

const _toast = useToast();
const state = reactive<LoginViewModel>({
  userName: '',
  password: '',
  email: ''
});
const login = async () => {
  console.log(state);
  const loginResult = await handleLogin(state);
  console.log("logresult:" + loginResult);
  if (loginResult.isSuccess)
    window.location.href = '/';
  else
    _toast.success(loginResult.message);
}
const register = () => {
  
}
</script>
  
<style>
div.el-row.login-container{
  margin-left: 520px;
  width:450px;
  height:100%
}
.grid-content > .hello
{
  margin-bottom: 50px;
  font-size: 18px;
  color:white ;
  font-family: 'Times New Roman', Times, serif;
}
.grid-content > p {
  font-size: 35px;
  color:white  ;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.login-container {
  width: 400px;
  height: 800px;
}

.login-col {
  display: grid;
  place-items: center;
}

.grid-content {
  width: 400px;
  text-align: center;
}
@media (min-width: 1024px) {
  #app {
    display: block;
    padding: 0 0rem;
  }
}
.el-menu {
    border-right: none;
    color: var(--el-text-color-primary);
    background:#b9ddfb;
    width: 100%;
}
</style>
