<template>
    <el-dialog v-if="showFirstTimeLogin" v-model="visible" @close="handleClose" class="" width="30%" height="50%"
    ref="dialogRef" :center="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <template #header>
            <h1>{{ $t('welcome-message') }}</h1>
            <h2>{{ $t('first-suggest-message') }}</h2>
        </template>
        <el-form :model="form" label-width="50%" 
        label-position="left" label-suffix=":">
            <el-form-item :label="$t('setting.language')">
                <el-select v-model="form.language"  @change="handleLanguageChange">
                    <el-option
                        v-for="(value, key) in languageOptions"
                        :key="key"
                        :label="value.label"
                        :value="key"
                    />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('setting.currency-style')">
                  <el-select v-model="form.currency">
                      <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                      <!-- <el-option key="VND" label="VND" value="VND" /> -->
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('setting.create-base-data')">
                <el-checkbox  v-model="form.isCreateBaseData"></el-checkbox>
            </el-form-item>
        </el-form> 
        <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="handleConfirm">
                {{ $t('confirm') }}
              </el-button>
            </div>
          </template>
    </el-dialog>
</template>
<script lang="ts" setup>
    import { reactive, ref, computed, onMounted } from 'vue'
    // @ts-ignore
    import {languages, languageOptions } from '@/languages'
    // @ts-ignore
    import { currencyList, getCurrencyStyleFromCookie } from "@/Services/CurrencyUtilities";
    // @ts-ignore
    // import { useStore } from 'vuex'; // Assuming Vuex for state management
    import Cookies from 'js-cookie';
    // @ts-ignore
    import { ElMessage, ElLoading } from 'element-plus';
    // @ts-ignore
    import { handleSaveSetting } from "@/Services/User/SaveSetting";
    // @ts-ignore
    import { SettingViewModel } from './Models/SettingViewModel';

    // const store = useStore();
    // @ts-ignore
    import store from '@/store/';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const visible = ref(true);
    const showFirstTimeLogin =  computed(() : boolean => {
        // Replace with your logic to check first-time login
        console.log('is first login:')
        console.log(localStorage.getItem('isNewUser'))
        return localStorage.getItem('isNewUser') === 'true';
    });
    const form = reactive({
              language: Cookies.get('language'),
              currency: getCurrencyStyleFromCookie(),
              isCreateBaseData: true
            });
    const dialogRef = ref()
    function onOpened() {
        dialogRef.value.focusInput()
    }
    const openDialog = ref(true)

    const handleClose = () => {
        visible.value = false;
    };
    const settingRequest = reactive<SettingViewModel>({});

    const handleConfirm = async () => {
        // console.log('confirm');
        console.log(form);
        // store.commit('setFirstLogin', false);
        // store.commit('setLanguage', form.language);
        // store.commit('setCurrency', form.currency);
        // store.commit('setIsCreateDefaultData', form.isCreateDefaultData);
        const loadingScreen = ElLoading.service({
            target:  dialogRef.value!=null ? dialogRef.value.$el.nextElementSibling.querySelector('.el-dialog') : null
        })

        
        settingRequest.language = form.language;
        settingRequest.currency = form.currency;
        settingRequest.defaultMoneyHolderId = null;
        settingRequest.isCreateBaseData = form.isCreateBaseData;
        // console.log(settingRequest);
        var apiResult = await handleSaveSetting(settingRequest);
        // console.log(apiResult);
        if (apiResult.isSuccess) {
            ElMessage({
                message: t('data-updated'),
                type: 'success',
            });
            // emit("onSaved");
            
            visible.value = false;
            localStorage.setItem('isNewUser', 'false');
            Cookies.set('language', settingRequest.language , { expires: 365 });
            Cookies.set('currency', settingRequest.currency , { expires: 365 });
            window.location.reload();
        }
        else {
            console.log(apiResult)
            ElMessage.error(languages.global.t('unknow-error-message'));
        }
        loadingScreen.close();
    };
    // onMounted(async () => {
    //     try {
            
    //         // form.language = Cookies.get('language') || navigator.language.substring(0,2); //need to replace with user data from back-end
    //         // form.currency = Cookies.get('currency') || "VND";
    //     }
    //     catch (error) {
    //         console.error(error);
    //         // Handle the error accordingly
    //     }
    // });
    const handleLanguageChange = async (value: any) => {
        // console.log(value)
        languages.global.locale.value = value as keyof typeof languageOptions;
    };
</script>
<style>
.form-dialog {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
    height: 50%;
}
</style>