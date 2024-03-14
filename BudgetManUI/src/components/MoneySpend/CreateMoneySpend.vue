<template>
    <el-dialog :model-value="openDialog" :title="$t('moneySpend.create')" class="form-dialog" width="50%"
        @close="Close" ref="dialogRef" @opened="focusInput" open-auto-focus>
      
        <div class="editform" v-if="model != undefined" ref="editFormRef">
            <div>
                <label>{{ $t('budget.name') }}</label>
                <el-select v-model="model.BudgetId" :placeholder="$t('budget.choose')" class="action-input" ref="budgetRef">

                    <el-option v-for="item in BudgetList?.data" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <div>
                <label>{{ $t('moneyHolder.name') }}</label>
                <el-select v-model="model.MoneyHolderId" :placeholder="$t('moneyHolder.choose')" class="action-input" ref="moneyHolderRef">

                    <el-option v-for="item in MoneyHolderList?.data" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <el-row class="mb-4">
                <label>{{$t('moneySpend.reason')}}</label>
                <el-input v-model="model.Reason" :placeholder="$t('moneySpend.reason')" ref="reasonRef"/>
            </el-row>
            <el-row class="mb-4">
                <label>{{$t('amount')}}</label>
                <!-- <el-input v-model="model.Amount" :placeholder="$t('amount')" /> -->
                <el-input-currency v-model="model.Amount" :disabled="model?.Details !== undefined && model?.Details.length>0" @input="handleInput"></el-input-currency>
            </el-row>
            <el-row class="mt-1">
                <label>{{ $t('details') }}</label>
                <el-button small type="success" @click="AddDetail" :icon="Plus" class="ml-1" round />

            </el-row>
            <div v-if="model?.Details !== undefined && model?.Details.length>0" ref="moneySpendDetailRef">
                <el-row :gutter="20">
                    <el-col :span="5">
                        {{ $t('moneySpend.reason') }}
                    </el-col>
                    <el-col :span="5">
                        {{ $t('moneySpend.quantity') }}
                    </el-col>

                    <el-col :span="5">
                        {{ $t('moneySpend.unit-price') }}
                    </el-col>
                    <el-col :span="1">
                        {{ $t('total') }}
                    </el-col>
                </el-row>
                <div v-for="detail in model.Details">
                    <el-row :gutter="18" class="mt-1">
                        <el-col :span="5">
                            <el-input v-model="detail.Reason" name="detailReason"></el-input>
                        </el-col>

                        <el-col :span="5">
                            <!-- <el-input v-model="detail.Quantity"></el-input> -->
                        
                            <el-input-number v-model="detail.Quantity" controls-position="right"></el-input-number>
                        </el-col>
                        <el-col :span="5">
                            <!--<el-input v-model="detail.Price" :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" :input-style="number"></el-input>-->
                                <el-input-currency v-model="detail.Price"></el-input-currency>
                        </el-col>
                        <el-col :span="5">
                            {{ formatCurrency(detail.Quantity != undefined && detail.Price != undefined ? detail.Quantity * detail.Price : 0) }}
                        </el-col>
                        <el-col :span="1">
                            <el-button type="danger" :icon="Delete" @click="DeleteDetail(detail)" />
                        </el-col>
                    </el-row>
                </div>
                <el-row :gutter="18" class="mt-1">
                    <el-col :span="7">

                    </el-col>

                    <el-col :span="7">
                        {{ $t('total-amount') }}:
                    </el-col>
                    <el-col :span="3">
                        {{ formatCurrency(TotalPrice) }}
                    </el-col>

                </el-row>
            </div>
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
import { handleAPIUpdateMoneySpend } from '../../Services/MoneySpend/MoneySpendService.ts'

// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts';
import { CreateMoneySpendRequest } from '../../Models/Request/MoneySpend/CreateMoneySpendRequest';
// import type { Ref } from 'vue/dist/vue.js';
import { handleGetDropdownList } from '@/Services/DropdownService';
import {
    Delete,
    Plus,

} from '@element-plus/icons-vue'
import { MoneySpendDetailDto } from '@/Models/Dtos/MoneySpendDetail';

import {useI18n} from 'vue-i18n'
import { DropdownDto } from '@/Models/Dtos/DropdownDto';
// @ts-ignore
import  { AppResponse } from "@/Models/AppResponse";
import elInputCurrency from '@/components/el-input-currency.vue'
import { formatCurrency } from "@/Services/CurrencyUtilities";
// import {  } from 'element-plus'

const {t} = useI18n();
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const props = defineProps<{
    openDialog: boolean,
    item?: CreateMoneySpendRequest
}>();
// Use computed to create a filtered model
const model = ref<CreateMoneySpendRequest>(props.item ?? {} as CreateMoneySpendRequest);

const defaultModel = ref<CreateMoneySpendRequest>({});

const isLoading = ref(false)


const Validate = (): boolean => {
    if (model.value.BudgetId == undefined) {
        ElMessage.error(t("budget.please-choise"));
        return false;
    }
    if (model.value.MoneyHolderId == undefined) {
        ElMessage.error(t('moneyHolder.please-choise'));
        return false;
    }
    if (model.value.Reason == undefined) {
        ElMessage.error(t('moneySpend.please-input-reason'));
        return false;
    }
    // console.log(model.value)
    if (model.value.Amount == undefined || model.value.Amount == 0) {
        ElMessage.error(t('moneySpend.please-input-amount'));
        return false;
    }
    return true;
}
const Close = async () => {
    resetModel();
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

        var apiResult = await handleAPIUpdateMoneySpend(model.value);
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
const AddDetail = () => {
    if (model.value.Details == undefined) {
        model.value.Details = [];
    }
    const detail: MoneySpendDetailDto = {
        Amount: 0,
        Quantity: 0,
        Price: 0,
    }
    model.value.Details.push(detail);
    focustMoneySpendDetailInput();
}
const DeleteDetail = (detail: MoneySpendDetailDto) => {
    if (model.value.Details != undefined) {
        const index = model.value.Details.indexOf(detail, 0);
        model.value.Details.splice(index, 1);
    }

}
const BudgetList = ref<AppResponse<DropdownDto[]|undefined>>();
const MoneyHolderList = ref<AppResponse<DropdownDto[]|undefined>>();
onMounted(async () => {
    BudgetList.value = await handleGetDropdownList("budget");
    if (BudgetList.value?.data?.length==1){
        defaultModel.value.BudgetId = BudgetList.value?.data[0].id;
    }
    MoneyHolderList.value = await handleGetDropdownList("moneyHolder");
    if (MoneyHolderList.value?.data?.length==1){
        defaultModel.value.MoneyHolderId = MoneyHolderList.value?.data[0].id;
    }
    // console.log('onmounted');
    resetModel();
});

const TotalPrice = ref(0);
const updatePrice = (details: CreateMoneySpendRequest) => {
    //  console.log('Update Price:');
    if (details.Details != undefined && details.Details.length > 0) {
        TotalPrice.value = 0;
        let total = 0;
        details.Details.forEach(element => {
            total += element.Quantity != undefined && element.Price != undefined ? element.Quantity * element.Price : 0;
        });
        
        TotalPrice.value = total;
        model.value.Amount= total;
    }
}
watch(model.value, (newArray, oldArray) => {
    //  console.log('Array changed!');
    //  console.log(newArray, oldArray);
    // Perform your desired actions here
     updatePrice(newArray);
});
const editFormRef = ref()
const moneySpendDetailRef = ref()

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

const focustMoneySpendDetailInput = async () => {
    await nextTick();
    const inputsList = moneySpendDetailRef.value.querySelectorAll('input[name="detailReason"]');
    // console.log(inputsList);
    for (let i=0; i< inputsList.length; i++){
        // console.log(inputsList[i].value);
        if (inputsList[i].value=== undefined || inputsList[i].value === ''){
            inputsList[i].focus();
            break;
        }
    }
}

const resetModel = () => {
    // model.value = defaultModel.value; //this code make watch(model.value) not working !
    model.value.Details = [];
    model.value.BudgetId = defaultModel.value.BudgetId;
    model.value.MoneyHolderId = defaultModel.value.MoneyHolderId;
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