<template>
  <!-- <el-row class="login-container"> -->
  <el-col :span="24" class="login-col">
    <div class="grid-content ep-bg-purple">
      <p>Hello!</p>
      <p class="hello">{{ $t("Auth.LoginView.message") }}</p>
      <el-form
        ref="formRef"
        :model="state"
        status-icon
        label-width="px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="" prop="userName">
          <el-input
            v-model="state.userName"
            :placeholder="$t('Auth.LoginView.user-name')"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="state.password"
            type="password"
            width="300px"
            autocomplete="off"
            :placeholder="$t('Auth.LoginView.password')"
            :prefix-icon="Key"
          />
        </el-form-item>
        <el-form-item>
          <el-row justify="space-between" style="width: 100%">
            <el-button
              type="primary"
              @click="login(formRef)"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              <template #icon>
                <el-icon>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      width="24"
                      height="24"
                      stroke="none"
                      fill="#000000"
                      opacity="0"
                    />
                    <g transform="matrix(0.83 0 0 0.83 12 12)">
                      <g style="">
                        <g transform="matrix(1 0 0 1 0 0)">
                          <path
                            style="
                              stroke: rgb(255, 255, 255);
                              stroke-width: 2;
                              stroke-dasharray: none;
                              stroke-linecap: butt;
                              stroke-dashoffset: 0;
                              stroke-linejoin: round;
                              stroke-miterlimit: 4;
                              fill: none;
                              fill-rule: nonzero;
                              opacity: 1;
                            "
                            transform=" translate(-12, -12)"
                            d="M 8.5 4.707 L 8.5 1 L 22.5 1 L 22.5 23 L 8.5 23 L 8.5 19.707 M 1.5 12 L 17.5 12"
                            stroke-linecap="round"
                          />
                        </g>
                        <g transform="matrix(1 0 0 1 2.5 0)">
                          <path
                            style="
                              stroke: rgb(255, 255, 255);
                              stroke-width: 2;
                              stroke-dasharray: none;
                              stroke-linecap: butt;
                              stroke-dashoffset: 0;
                              stroke-linejoin: round;
                              stroke-miterlimit: 4;
                              fill: none;
                              fill-rule: nonzero;
                              opacity: 1;
                            "
                            transform=" translate(-14.5, -12)"
                            d="M 11.5 6 L 17.5 12 L 11.5 18"
                            stroke-linecap="round"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </el-icon>
              </template>
              <span>{{ $t("Auth.LoginView.sign-in") }}</span>
            </el-button>
            <el-button
              type="default"
              @click="googleLogin"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              <el-icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </el-icon>
              <span>
                {{ $t("Auth.LoginView.loginByGG") }}
              </span>
            </el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </el-col>
  <!-- <el-image
      src="https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-n%E1%BB%81n-c%C3%B4ng-ngh%E1%BB%87-cho-ppt-scaled.jpg"
      fit="cover"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
    </el-image> -->
  <!-- </el-row> -->
</template>

<script setup lang="ts">
import { Calendar, Search, User, Key } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
// @ts-ignore
import { LoginViewModel } from "../../Models/LoginViewModel.ts";

// @ts-ignore
import {
  handleLogin,
  handleLoginByGoogle,
} from "../../Services/LoginService.ts";
import { useToast } from "vue-toastification";
import { googleAuthCodeLogin } from "vue3-google-login"; //https://devbaji.github.io/vue3-google-login/#one-tap-prompt
// @ts-ignore
import router from "@/router";
// @ts-ignore
import type { FormInstance, FormRules } from "element-plus";

const _toast = useToast();
const state = reactive<LoginViewModel>({
  userName: "",
  password: "",
  email: "",
});
const fullscreenLoading = ref(false);
const loginValidate = async (formEl: FormInstance) => {
  // console.log('Validate!')
};
const login = async (formEl: FormInstance) => {
  if (!formEl) return false;
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      fullscreenLoading.value = true;
      // console.log(fullscreenLoading);
      const loginResult = await handleLogin(state);
      // console.log("logresult:" + loginResult);
      if (loginResult.isSuccess) {
        // console.log('login success');
        //  router.push('/'); //router.push make axiosConfig not set up accessToken
        window.location.href = "/";
      } else _toast.error(loginResult.message);
      fullscreenLoading.value = false;
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const googleLogin = async () => {
  googleAuthCodeLogin().then(async (response: { code: string }) => {
    // console.log("Handle the response", response);
    fullscreenLoading.value = true;
    const loginResult = await handleLoginByGoogle(response.code);
    if (loginResult.isSuccess)
      //  router.push('/');
      window.location.href = "/";
    else _toast.error(loginResult.message);
    fullscreenLoading.value = false;
  });
};
const formRef = ref<FormInstance>();

const rules = reactive<FormRules<LoginViewModel>>({
  userName: [
    {
      required: true,
      message: "Please input your username",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
      trigger: "change",
    },
  ],
});
onMounted(() => {
  document.addEventListener("keypress", handleKeypress);
});
const handleKeypress = (event: KeyboardEvent) => {
  // console.log(event.key);
  // Check if the key pressed is the Enter key (key code 13)
  if (event.key === "Enter") {
    login(formRef.value);
  }
};
</script>

<style>
div.el-row.login-container {
  margin-left: 520px;
  width: 450px;
  height: 100%;
}
.grid-content > .hello {
  margin-bottom: 50px;
  font-size: 18px;
  color: white;
  font-family: "Times New Roman", Times, serif;
}
.grid-content > p {
  font-size: 35px;
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
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
  width: 100%;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px);
  height: 100%;
}

.fixed-button {
  line-height: 0px;
}
</style>
