
<template>
    <el-row class="login-container">
        <el-col :span="24" class="login-col">
            <div class="grid-content ep-bg-purple">
                <p class="helloRegister">Hello, Friend!</p>
                <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
                    <el-form-item label="" prop="username">
                        <el-input v-model="state.userName" placeholder="User name" :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <el-input v-model="state.password" type="password" width="300px" autocomplete="off"
                            placeholder="Password" :prefix-icon="Key" />
                    </el-form-item>

                    <el-form-item label="" prop="pass">
                        <el-input v-model="state.password" type="password" width="300px" autocomplete="off"
                            placeholder="Nhập lại password" :prefix-icon="Key" />
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="register()">Creat Account</el-button>
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
// @ts-ignore
import { RegisterViewModel } from '../../Models/RegisterViewModel.ts'

// @ts-ignore
import { handleRegister } from "../../Services/RegisterService.ts"
import { useToast } from "vue-toastification";

const _toast = useToast();
const state = reactive<RegisterViewModel>({
    userName: '',
    password: '',
    passwordRetype: '',
    email: ''
});
const register = async () => {
    console.log(state);
    const loginResult = await handleRegister(state);
    console.log("logresult:" + loginResult);
    if (loginResult.isSuccess) {
        window.location.href = '/';
    }
    else
        _toast.success(loginResult.message);
}
</script>
  
<style>
.grid-content > .helloRegister
{
  margin-bottom: 50px;
  font-size: 35px;
  font-family:Georgia, 'Times New Roman', Times, serif
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
  