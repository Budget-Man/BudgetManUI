<template>
    <el-dialog :model-value="openDialog" title="Create Money spend" class="form-dialog" width="50%"
        @close="emit('onCloseClicked')">

        <div class="editform" v-if="model != undefined">
            <div>
                <label>Budget</label>
                <el-select v-model="model.BudgetId" placeholder="Chose Budget" class="action-input">

                    <el-option v-for="item in BudgetList.data" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <div>
                <label>Money Holder</label>
                <el-select v-model="model.MoneyHolderId" placeholder="Chose Money holder" class="action-input">

                    <el-option v-for="item in MoneyHolderList.data" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <el-row class="mb-4">
                <label>Reason</label>
                <el-input v-model="model.Reason" placeholder="Reason" />

            </el-row>

            <el-row class="mt-1">
                <label>Details</label>
                <el-button small type="success" @click="AddDetail" :icon="Plus" class="ml-1" round />

            </el-row>

            <el-row :gutter="20">
                <el-col :span="5">
                    Reason
                </el-col>
                <el-col :span="5">
                    Quantity
                </el-col>

                <el-col :span="5">
                    Unit Price
                </el-col>
                <el-col :span="1">
                    Total
                </el-col>
            </el-row>
            <div v-for="detail in model.Details">
                <el-row gutter="18" class="mt-1">
                    <el-col :span="5">
                        <el-input v-model="detail.Reason"></el-input>
                    </el-col>

                    <el-col :span="5">
                        <el-input v-model="detail.Quantity"></el-input>
                    </el-col>

                    <el-col :span="5">
                        <el-input v-model="detail.Price"></el-input>
                    </el-col>
                    <el-col :span="5">
                        {{ detail.Quantity != undefined && detail.Price != undefined ? detail.Quantity * detail.Price : 0 }}
                    </el-col>
                    <el-col :span="1">
                        <el-button type="danger" :icon="Delete" @click="DeleteDetail(detail)" />
                    </el-col>
                </el-row>
            </div>
            <el-row gutter="18" class="mt-1">
                <el-col :span="7">

                </el-col>

                <el-col :span="7">
                    Total Amount:
                </el-col>
                <el-col :span="3">
                    {{ TotalPrice }}
                </el-col>

            </el-row>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('onCloseClicked')">Cancel</el-button>
                <el-button type="primary" @click="Save">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, toRefs, computed, watch, inject } from 'vue';
// @ts-ignore
import { ElMessage, ElInput } from 'element-plus';
// @ts-ignore
import { handleAPIUpdateMoneySpend } from '../../Services/MoneySpend/MoneySpendService.ts'

// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts';
import { CreateMoneySpendRequest } from '../../Models/Request/MoneySpend/CreateMoneySpendRequest';
import type { Ref } from 'vue/dist/vue.js';
import { handleGetDropdownList } from '@/Services/DropdownService';
import {
    Delete,
    Plus,

} from '@element-plus/icons-vue'
import { MoneySpendDetailDto } from '@/Models/Dtos/MoneySpendDetail';
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const props = defineProps<{

    openDialog: boolean;
}>();
// Use computed to create a filtered model
const model = ref<CreateMoneySpendRequest>({});
const Validate = (): boolean => {
    if (model.value.BudgetId == undefined) {
        ElMessage.error('Please choise Budget.');
        return false;
    }
    if (model.value.MoneyHolderId == undefined) {
        ElMessage.error('Please choise Money holder.');
        return false;
    }
    return true;
}
const Close = async () => {

}
const Save = async () => {
    const valid = Validate();
    if (valid && model.value != undefined) {

        var editresult = await handleAPIUpdateMoneySpend(model.value);
        if (editresult.isSuccess) {
            ElMessage({
                message: 'data Updated.',
                type: 'success',
            });
        }
        else {
            ElMessage.error('Update failed.');
            return;
        }

        emit("onSaved");
    }
    else {
        // ElMessage.error('valid failed.');
    }
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
}
const DeleteDetail = (detail: MoneySpendDetailDto) => {
    if (model.value.Details != undefined) {
        const index = model.value.Details.indexOf(detail, 0);
        model.value.Details.splice(index, 1);
    }

}
const BudgetList = await handleGetDropdownList("budget");
const MoneyHolderList = await handleGetDropdownList("moneyHolder");
const TotalPrice = ref(0);
const updatePrice = (details: CreateMoneySpendRequest) => {

    TotalPrice.value = 0;
    let total = 0;
    if (details.Details != undefined && details.Details.length > 0) {
        details.Details.forEach(element => {
            total += element.Quantity != undefined && element.Price != undefined ? element.Quantity * element.Price : 0;
        });
    }
    console.log("total:" + total);

    TotalPrice.value = total;
}
watch(model.value, (newArray, oldArray) => {
    console.log('Array changed!', newArray, oldArray);
    // Perform your desired actions here
     updatePrice(newArray);
});
</script>

<style>
.form-dialog {
    margin-top: 0;
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