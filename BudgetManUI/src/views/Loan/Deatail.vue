<template>
    <el-row>
        Loan Name: {{ Loan.data?.name }}
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

const Loan = ref<AppResponse<LoanDto>>({
    data: undefined,
    isSuccess: false,
    message: "",
})
const tableColumns: TableColumn[] = [
    
    {
        key: "paidAmount",
        label: "PaidAmount",
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
        label: "Interest",
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
        label: "InterestRate",
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
        label: "Money Holder",
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
        label: "Budget",
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


handleGetLoan(useRoute().params.Id.toString()).then(
    (response) => {
        Loan.value = response
        console.log(Loan.value)
    }
)
//console.log(useRoute().params.Id.toString())
</script>