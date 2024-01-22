<template>
<!-- <div > -->
    <el-form :model="form" label-width="240px" class="mainContainer" label-position="left" label-suffix=":">
        <el-form-item :label="$t('setting.language')">
          <el-select v-model="form.language" >
            <el-option
                v-for="item in LanguageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('setting.currency-style')">
            <el-select v-model="form.currency">
                <el-option key="USD" label="USD" value="USD" />
                <el-option key="VND" label="VND" value="VND" />
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('setting.defaultMoneyHolder')">
          <el-select v-model="form.defaultMoneyHolder">
            <el-option
                v-for="item in moneyHolderData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{ $t('save') }}</el-button>
          <el-button @click="resetForm()">{{ $t('reset-default') }}</el-button>
        </el-form-item>
    </el-form>
<!-- </div> -->
</template> 
  
<script setup lang="ts">

import { ref, watch, onMounted, computed, nextTick, reactive  } from 'vue'
import Cookies from 'js-cookie';
// @ts-ignore
import languages from '@/languages'
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'
// @ts-ignore
import { handleAPICustom, handleAPIDelete, handleAPISearch } from '@/components/maynghien/adminTable/Service/BasicAdminService.ts'
// @ts-ignore
import { SearchRequest, SearchResponse } from '@/components/maynghien/adminTable/Service/BasicAdminService.ts';

const form = reactive({
              language: '',
              currency: '',
              defaultMoneyHolder: ''
            });
const LanguageOptions = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'vi',
    label: 'Tiếng Việt',
  }];

onMounted(async () => {
  try {
    await nextTick(); // Wait for the next update cycle
    
    form.language = Cookies.get('language') || "en"; //need to replace with user data from back-end
    form.currency = Cookies.get('currency') || "VND";

    moneyHolderData.value = await getTableData("MoneyHolder");
    if (moneyHolderData.value && moneyHolderData.value.length > 0) {
      form.defaultMoneyHolder = Cookies.get('defaultMoneyHolder') || "";
    }
    // console.log(form.currency);
  } catch (error) {
    console.error("Error fetching budget data:", error);
    // Handle the error accordingly
  }
});

// const _i18n = i18n;

const submitForm = () => {
  // languages.global.legacy = false;
   languages.global.locale.value = form.language as "en" | "vi";
  //languages.global.locale = "vn";
  Cookies.set('language', form.language, { expires: 365 });
  Cookies.set('currency', form.currency, { expires: 365 });
  Cookies.set('defaultMoneyHolder', form.defaultMoneyHolder, { expires: 365 });
  // console.log(form.defaultMoneyHolder);
  //need to save to database
  console.log(form.language);
};



const resetForm = () => {
    // this.$refs[formName].resetFields();
};

const moneyHolderData = ref<[SearchDTOItem]>();

const getTableData = async (apiName: any) => {
    let searchRequest: SearchRequest = {
      PageIndex: 1,
      PageSize: 10,
    //   filters:  Filter[],
      SortBy: undefined
    }
    var searchApiResponse = await handleAPISearch(searchRequest, apiName);
    // console.log(searchApiResponse);
    if (searchApiResponse.isSuccess && searchApiResponse.data != undefined) {
        // console.log("success");
        let dataResponse: SearchResponse<SearchDTOItem[] | undefined> = searchApiResponse.data;
        // console.log(dataResponse);
        if (dataResponse != undefined && dataResponse.data != undefined && dataResponse.data.length > 0) {
          return dataResponse.data;
        }
        else {
          return [];
        }
    }
}
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
</style>