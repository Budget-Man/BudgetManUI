<template>
  <el-row class="login-container">
    <el-col :span="24" class="login-col" >
      <div class="grid-content ep-bg-purple">
        <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="state.username" placeholder="User name"  :prefix-icon="User"/>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input v-model="state.password" type="password" width="300px" autocomplete="off" placeholder="password"  :prefix-icon="Key"/>
          </el-form-item>

          <el-text v-if="state.errorMessage" class="mx-1" type="danger">{{ state.errorMessage }}</el-text>
          <el-form-item>
            <el-button type="primary" @click="login()">Submit</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
  
<script setup lang="ts">
import { Calendar, Search,User,Key } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';

const state = reactive({
  username: '',
  password: '',
  errorMessage: ''
});
const login = () => {
  state.errorMessage = 'test'
}
</script>
  
<style>
/* Your CSS styles here */
body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-container {
            width: 600px;
            height: 300px;
            background-color: #f0f0f0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .login-col{
          display:grid;
          place-items: center;
        }
        .grid-content{
          width: 400px;
          text-align: center;
        }

</style>
  