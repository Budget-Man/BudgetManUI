<template>
    <el-row :gutter="20">
        <el-col :span="5">
           Tên Khoản Vay: {{ Loan?.name }}
        </el-col>
        <el-col :span="5">
            Số Tiền vay: {{ Loan?.totalAmount }}
        </el-col>
        <el-col :span="5">
           Lãi Suất: {{ Loan?.interestRate }}
        </el-col>
        <el-col :span="5">
           Thời gian tính: 
            
        </el-col>
    </el-row>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'LoanPay'" :allowAdd="true" :allowDelete="true"
        :createUrl="useRoute().params.Id.toString()"
            title="LoanPay" :CustomActions="CustomActions" :allowEdit="true" :CustomFilters="CustomFilters"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import type { Filter } from '@/components/maynghien/BaseModels/Filter';
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { useRoute } from 'vue-router';
import { handleGetLoan } from '../../Services/Loan/GetById'
import type { LoanDto } from '@/Models/Dtos/LoanDto';
import { ref } from 'vue';
import type { AppResponse } from '@/models/AppResponse';

const Loan = ref<LoanDto|undefined>();
const tableColumns: TableColumn[] = [
    
    {
        key: "paidAmount",
        label: "Số tiền thanh toán",
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "interest",
        label: "Lãi",
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "interestRate",
        label: "Lãi Suất",
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    
    {
        key: "moneyHolderId",
        label: "Nơi giữ tiền",
        enableEdit: false,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: false,
        sortable: false,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "moneyHolder"

        },

    },
    {
        key: "budgetId",
        label: "Ngân Sách",
        enableEdit: false,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: false,
        sortable: false,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "budget"

        },

    },
    {
        key: "moneyHolderId",
        label: "Hạng Mục",
        enableEdit: true,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: true,
        sortable: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "moneyHoler"

        },

    },
    {
        key: "moneyHolderName",
        label: "Người giữ tiền",
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
    {
        key: "budgetId",
        label: "Ngân Sách",
        enableEdit: true,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "budget"

        },

    },
    {
        key: "budgetName",
        label: "Ngân Sách",
        enableEdit: false,
        enableCreate: false,
        hidden: true,
        width: 300,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
]
const CustomActions: CustomAction[] = ([

]);
const CustomFilters: Filter[] = ([
    {
        FieldName: "LoanId",
        Value: useRoute().params.Id.toString(),
        DisplayName: undefined,
        Operation:undefined,
        Type:undefined,
        dropdownData:undefined
    }
])

const RatePeriod =ref("");
handleGetLoan(useRoute().params.Id.toString()).then(
    (response) => {
        if(response.isSuccess){
            Loan.value = response.data;
            switch (response.data?.ratePeriod) {
                case 0:
                    RatePeriod.value="Daily"
                    break;
                    case 1:
                    RatePeriod.value="Weekly"
                    break;
                    case 2:
                    RatePeriod.value="Monthly"
                    break;
                    case 3:
                    RatePeriod.value="Quarterly"
                    break;
                    case 4:
                    RatePeriod.value="Annually"
                    break;
                    case 5:
                    RatePeriod.value="Irregular"
                    break;
                default:
                    break;
            }
        }
        
    }
)
//console.log(useRoute().params.Id.toString())
</script>