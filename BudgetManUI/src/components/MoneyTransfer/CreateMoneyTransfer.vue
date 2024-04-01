<template>
    <el-dialog :model-value="openDialog" :title="$t('moneySpend.create')" class="form-dialog" width="50%"
        @close="Close" ref="dialogRef" @opened="focusInput" open-auto-focus>
      
        <div class="editform" v-if="model != undefined" ref="editFormRef">
            
            <div>
                <label>{{ $t('moneyTransfer.from') }}</label>
                <el-select v-model="model.FromMoneyHolderId" :placeholder="$t('moneyHolder.choose')" class="action-input" ref="moneyHolderFromRef">

                    <el-option v-for="item in MoneyHolderList?.data" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <div>
                <label>{{ $t('moneyTransfer.from') }}</label>
                <el-select v-model="model.ToMoneyHolderId" :placeholder="$t('moneyHolder.choose')" class="action-input" ref="moneyHolderToRef">

                    <el-option v-for="item in MoneyHolderList?.data" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <el-row class="mb-4">
                <label>{{$t('amount')}}</label>
                <!-- <el-input v-model="model.Amount" :placeholder="$t('amount')" /> -->
                <el-input-currency v-model="model.Amount"  @input="handleInput"></el-input-currency>
            </el-row>
           
        </div>
        <template #footer  >
            <span class="dialog-footer">
                <el-button @click="Close">{{ $t('cancel') }}</el-button>
                <el-button type="primary" @click="Save">
                    {{ $t('confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref , toRefs, computed, watch, inject, onMounted, nextTick } from 'vue';
// @ts-ignore
import { ElMessage, ElInput, ElLoading } from 'element-plus';
// @ts-ignore
import { handleAPICreateMoneyTransfer } from '../../Services/MoneyTransfer/MoneyTransferService.ts'

// import type { Ref } from 'vue/dist/vue.js';
// @ts-ignore
import { handleGetDropdownList } from '@/Services/DropdownService';
import {
    Delete,
    Plus,

} from '@element-plus/icons-vue'
// @ts-ignore
import { MoneyTransferDto } from '@/Models/Dtos/MoneyTransferDto';

import {useI18n} from 'vue-i18n'
// @ts-ignore
import { DropdownDto } from '@/Models/Dtos/DropdownDto';
// @ts-ignore
import  { AppResponse } from "@/Models/AppResponse";
// @ts-ignore
import elInputCurrency from '@/components/el-input-currency.vue'
// @ts-ignore
import { formatCurrency } from "@/Services/CurrencyUtilities";
// import {  } from 'element-plus'

const {t} = useI18n();
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const props = defineProps<{
    openDialog: boolean,
    item?: MoneyTransferDto
}>();
// Use computed to create a filtered model
const model = ref<MoneyTransferDto>(props.item ?? {} as MoneyTransferDto);

const defaultModel = ref<MoneyTransferDto>({});

const isLoading = ref(false)


const Validate = (): boolean => {
    if (model.value.FromMoneyHolderId == undefined) {
        ElMessage.error(t("moneyTransfer.please-choise-from"));
        return false;
    }
    if (model.value.ToMoneyHolderId == undefined) {
        ElMessage.error(t("moneyTransfer.please-choise-to"));
        return false;
    }
    
    if (model.value.Amount == undefined || model.value.Amount == 0) {
        ElMessage.error(t('moneyTransfer.please-input-amount'));
        return false;
    }
    return true;
}
const Close = async () => {
    
    emit('onCloseClicked');
}
const dialogRef = ref()
const Save = async () => {
    if (isLoading.value) return
    isLoading.value = true;
    const valid = Validate();
    // console.log(dialogRef.value)
    //set loading screen for dialog
    const loadingScreen = ElLoading.service({
        target:  dialogRef.value!=null ? dialogRef.value.$el.nextElementSibling.querySelector('.el-dialog') : null
    })
    if (valid && model.value != undefined) {

        var apiResult = await handleAPICreateMoneyTransfer(model.value);
        console.log(apiResult)
        if (apiResult.isSuccess) {
            ElMessage({
                message: 'data Updated.',
                type: 'success',
            });
            emit("onSaved");
        }
        else {
            console.log(apiResult)
            ElMessage.error(apiResult.message);
            return;
        }
        model.value=defaultModel.value;
    }
    else {
        // ElMessage.error('valid failed.');
    }
    isLoading.value = false;
    loadingScreen.close()
    
}

const MoneyHolderList = ref<AppResponse<DropdownDto[]|undefined>>();
onMounted(async () => {
    
    MoneyHolderList.value = await handleGetDropdownList("moneyHolder");
    if (MoneyHolderList.value?.data?.length==1){
        defaultModel.value.FromMoneyHolderId = MoneyHolderList.value?.data[0].id;
        defaultModel.value.ToMoneyHolderId = MoneyHolderList.value?.data[0].id;
    }
    // console.log('onmounted');
    
});


const editFormRef = ref()
const moneyHolderFromRef = ref()

const moneyHolderToRef = ref()
const focusInput = () => {
    const inputsList = editFormRef.value.querySelectorAll('input');
    // console.log(inputsList);
    for (let i=0; i< inputsList.length; i++){
        // console.log(inputsList[i].value);
        if (inputsList[i].value=== undefined || inputsList[i].value === ''){
            inputsList[i].focus();
            break;
        }
    }
}

const handleInput = (event: Event) => {
    // console.log(event)
    // console.log(model.value.Amount)
}

onMounted(() => {
      document.addEventListener( "keypress", handleKeypress );
});
const handleKeypress = (event : KeyboardEvent) => {
//   console.log(event.key);
    if(props.openDialog){
  // Check if the key pressed is the Enter key (key code 13)
        if (event.key === 'Enter') {
            Save()
        }
    }
}

</script>

<style>
.form-dialog {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
    height: 100%;
}

.editform .el-select {
    width: 100%;
}

.mt-1 {
    margin-top: 1rem;
}

.ml-1 {
    margin-left: 1rem;
}
</style>