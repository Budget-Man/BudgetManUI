<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'DebtPay'" :allowAdd="true" :allowDelete="true"
            title="DebtPay" :CustomActions="CustomActions" :allowEdit="true" :CustomFilters="CustomFilters"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import type { Filter } from '@/components/maynghien/BaseModels/Filter';
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { useRoute } from 'vue-router';
import { ref } from 'vue/dist/vue.js';
// @ts-ignore
import { handleGetDebt } from '../../Services/Debt/DeptService.ts'
import type { DebtDto } from '@/Models/Dtos/DebtDto';
const tableColumns: TableColumn[] = [
    {
        key: "debtsName",
        label: "DebtsName",
        enableEdit: false,
        enableCreate: true,
        hidden: true,
        width: 500,
        required: false,
        sortable: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Debt"

        },
    },
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
        key: "isPaid",
        label: "IsPaid",
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
        key: "ratePeriod",
        label: "RatePeriod",
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "ratePeriodText",
            keyMember: "ratePeriod",
            data: [
                {
                    ratePeriod:0,
                    ratePeriodText: "Daily",
                },
                {
                    ratePeriod:1,
                    ratePeriodText: "Weekly",
                },
                {
                    ratePeriod:2,
                    ratePeriodText: "Monthly",
                },
                {
                    ratePeriod:3,
                    ratePeriodText: "Quarterly",
                },
                {
                    ratePeriod:4,
                    ratePeriodText: "Annually",
                },
                {
                    ratePeriod:5,
                    ratePeriodText: "Irregular",
                },
            ]

        },
    },
    {
        key: "moneyHolderId",
        label: "Category",
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
            apiUrl: "MoneyHolder"

        },

    },
    {
        key: "moneyHolderName",
        label: "Money Holder",
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
        label: "Category",
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
        label: "budget",
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
        FieldName: "DebtId",
        Value: useRoute().params.Id.toString(),
        DisplayName: undefined,
        Operation:undefined,
        Type:undefined,
        dropdownData:undefined
    }
])

const Debt = ref<DebtDto|undefined>();
const RatePeriod =ref("");
handleGetDebt(useRoute().params.Id.toString()).then(
    (response) => {
        if(response.isSuccess){
            Debt.value = response.data;
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
</script>