<template>
<!-- <div > -->
    <el-form :model="form" label-width="240px" class="mainContainer" label-position="left" label-suffix=":">
        <el-form-item label="Language">
          <el-select v-model="form.language" >
            <el-option
                v-for="item in LanguageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
          </el-select>
        </el-form-item>
        <el-form-item label="Currency style">
            <el-select v-model="form.currency">
                <el-option key="USD" label="USD" value="USD" />
                <el-option key="VND" label="VND" value="VND" />
            </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm()">Save</el-button>
          <el-button @click="resetForm()">Reset default</el-button>
        </el-form-item>
    </el-form>
<!-- </div> -->
</template> 
  
<script setup lang="ts">

import { ref, watch, onMounted, computed, nextTick, reactive  } from 'vue'
import Cookies from 'js-cookie';
// @ts-ignore
import languages from '@/languages'

const form = reactive({
            language: 'en',
            currency: ''
            });
const LanguageOptions = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'vn',
    label: 'Tiếng Việt',
  }];

onMounted(async () => {
  try {
    await nextTick(); // Wait for the next update cycle
    form.language = "en";
    form.currency = Cookies.get('currency') || "VND";
    // console.log(form.currency);
  } catch (error) {
    console.error("Error fetching budget data:", error);
    // Handle the error accordingly
  }
});

// const _i18n = i18n;

const submitForm = () => {
  // const formReactive = reactive[formName];
  // formReactive.value.validate((valid) => {
  //     if (valid) {
  //         alert('submit!');
  //     } else {
  //         console.log('error submit!!');
  //         return false;
  //     }
  // });
  // $language.languages.locale = form.language;
  // console.log(form.language);
  // switchLanguage(form.language);
  languages.global.locale = form.language as "en" | "vn";
  Cookies.set('language', form.language, { expires: 365 });

  Cookies.set('currency', form.currency, { expires: 365 });
};


const resetForm = () => {
    // this.$refs[formName].resetFields();
};


</script>

<style>
    .mainContainer{
        background: white;
        padding: 20px 20px 20px 20px;
        width: 100%;
        min-height: 100px;
        border-radius: var(--el-border-radius-base);
    }

    .container {
        display: flex;
        justify-content: space-evenly;
    }

    .column {
        width: 50%;
    }

    .summary {
        text-align: right;
        padding-right: 12px;
    }

    .absolute-right{
        position: absolute;
        right: 0px;
    }
</style>@/languages@/locales