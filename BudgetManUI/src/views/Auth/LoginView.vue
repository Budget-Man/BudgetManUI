

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
            <el-input v-model="state.password" type="password" width="300px" autocomplete="off" placeholder="assword"
              :prefix-icon="Key" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login()">Sign In</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div>
        <p>Hiii</p>
      </div> -->
    </el-col>
  </el-row>
</template>
  
<script setup lang="ts">
import { Calendar, Search, User, Key } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
// @ts-ignore
import { LoginViewModel } from '../../Models/LoginViewModel.ts'

// @ts-ignore
import { handleLogin } from "../../Services/LoginService.ts"
import { useToast } from "vue-toastification";

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
</script>
  
<style>
.grid-content > .hello
{
  margin-bottom: 50px;
  font-size: 18px;
  font-family: 'Times New Roman', Times, serif;
}
.grid-content > p {
  font-size: 25px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
/* Your CSS styles here */
body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 600px;
  height: 400px;
  background-color: var(--el-color-primary-light-7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-col {
  display: grid;
  place-items: center;
  
}

.grid-content {
  width: 400px;
  text-align: center;
}
</style>
  