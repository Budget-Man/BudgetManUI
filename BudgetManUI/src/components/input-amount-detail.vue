<template>
<!-- <div v-if="proxyValue != undefined"> --> 
<div>
    <el-input-currency v-model="amountValue" :placeholder="props.placeholder"
        :disabled="moneyDetails != undefined && moneyDetails != null && moneyDetails.length > 0"></el-input-currency>

    
    <el-row class="mt-1">
        <label>{{ $t('details') }}</label>
        <el-button small type="success" @click="AddDetail" :icon="Plus" class="ml-1" round />

    </el-row>
    <div v-if="moneyDetails !== undefined && moneyDetails != null && moneyDetails.length>0" ref="moneySpendDetailRef">
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
        <!-- <div v-for="detail in model.Details"> -->
        <div v-for="(detail, index) in moneyDetails" :key="index">
            <el-row :gutter="18" class="mt-1">
                <el-col :span="5">
                    <el-input v-model="detail.reason" name="detailReason"></el-input>
                </el-col>

                <el-col :span="5">
                    <el-input-number v-model="detail.quantity" controls-position="right" @keyup="updateTotalAmount" @change="updateTotalAmount"></el-input-number>
                </el-col>
                <el-col :span="5">
                    <el-input-currency v-model="detail.price" @keyup="updateTotalAmount"></el-input-currency>
                </el-col>
                <el-col :span="5">
                    {{ formatCurrency(detail.quantity != undefined && detail.price != undefined ? detail.quantity * detail.price : 0) }}
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
</template>
<script setup lang="ts">
import { ref , toRefs, computed, watch, inject, onMounted, nextTick } from 'vue';
// @ts-ignore
import { AmountAndDetailDto } from "@/Models/Dtos/AmountAndDetailDto";
// @ts-ignore
import type { MoneyDetailDto } from "@/Models/Dtos/MoneyDetailDto";
// @ts-ignore
import elInputCurrency from '@/components/el-input-currency.vue'
// @ts-ignore
import { formatCurrency } from "@/Services/CurrencyUtilities";
import {
    Delete,
    Plus,
} from '@element-plus/icons-vue'

const props = defineProps<{
    // modelValue: AmountAndDetailDto | string | number | undefined,
    placeholder: string | undefined
}>();
const model = ref<AmountAndDetailDto>({});
// const amount = ref(props.modelValue | props.modelValue?.amount | undefined);
// const detail = ref(props.modelValue?.detail);
const TotalPrice = ref(0);

// watch(() => props.modelValue, () => {
//     model.value = new AmountAndDetailDto();
//     model.value.Amount = props.modelValue as number;
// }, 
// { immediate: true })

// onMounted(() => {
//     console.log(detailValue.value)
// });
// const proxyValue = defineModel({
//     type : AmountAndDetailDto,
//     required: true,
//     set(value){
//         console.log(value)
//         model.value.Amount = value as number;
//         return model
//     },
//     get(){
//         console.log(model.value)
//         return model.value
//     }
// })
const amountValue = defineModel<string>('amount')

// watch(() => amountValue, () => {
//     console.log(amountValue)
//     // model.value.Amount = Number(amountValue);
// })
const moneyDetails = defineModel<Array<MoneyDetailDto>>('details',{
    // set(value) {
    //   console.log(value)
    //   return value;
    // },
    // //get() {
    //  console.log(detailValue.value)
    //  return detailValue.value;
    //}
})
// const detailsTest = ref(detailValue.value)
watch(() => moneyDetails.value, () => {
    // console.log(moneyDetails.value)
    updateTotalAmount();
})

const updateTotalAmount = () =>{
    // console.log(detailValue.value)
    if (moneyDetails.value != undefined && moneyDetails.value.length > 0) {
    TotalPrice.value = 0;
    let total = 0;
    moneyDetails.value.forEach((element) => {
      total +=
        element.quantity != undefined && element.price != undefined
          ? element.quantity * element.price
          : 0;
    });

    TotalPrice.value = total;
    amountValue.value = total.toString();
  }
}
const AddDetail = async () => {
    // console.log(detailValue.value)
    // if (model.value == undefined){
    //     model.value = new AmountAndDetailDto();
    // }
    if (moneyDetails.value == undefined) {
        // console.log(detailValue.value)
        // if (Number(model.value)) {
        //     let amount = model.value as number;
        //     model.value = new AmountAndDetailDto();
        //     model.value.Amount = amount;
        // }
        moneyDetails.value = [];
        await nextTick();
        // console.log(detailValue.value)
    }
    // console.log(detailValue.value)
    const detail: MoneyDetailDto = {
        amount: 0,
        quantity: 0,
        price: 0
    };
    moneyDetails.value.push(detail);
    focustMoneySpendDetailInput();
}

const DeleteDetail = (detail: MoneyDetailDto) => {
    if (moneyDetails.value != undefined) {
        const index = moneyDetails.value.indexOf(detail, 0);
        moneyDetails.value.splice(index, 1);
    }

}
const moneySpendDetailRef = ref()
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
// const emit = defineEmits<{
//   (e: 'update:value', value: AmountAndDetailDto | undefined): void;
// }>();
// watch(() => model, () =>{
//     console.log(model.value)
//     emit('update:value', model.value);
// });
</script>