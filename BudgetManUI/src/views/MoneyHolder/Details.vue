<template>
    <el-row :gutter="20">
        <el-col :span="5">
            {{ $t('moneyHolder.name') }}: {{ MoneyHolder?.name }}
        </el-col>
        <el-col :span="5">
            {{ $t('moneyHolder.balance') }}: {{ MoneyHolder?.totalAmount }}
        </el-col>
        
    </el-row>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'moneyHolderTracking'" :allowAdd="true" :allowDelete="true"
        :createUrl="useRoute().params.Id.toString()"
            title="moneyHolderTracking" :CustomActions="CustomActions" :allowEdit="true" :CustomFilters="CustomFilters"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">
// @ts-ignore
import type { Filter } from '@/components/maynghien/BaseModels/Filter';
// @ts-ignore
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
// @ts-ignore
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { useRoute } from 'vue-router';
// @ts-ignore
import { handleGetMoneyHolderDetails } from '@/Services/MoneyHolder/MoneyHolderService'
// @ts-ignore
import type { MoneyHolderDto } from '@/Models/Dtos/MoneyHolderDto';
import { ref } from 'vue';
import type { AppResponse } from '@/Models/AppResponse';
import { useI18n } from 'vue-i18n';
const MoneyHolder = ref<MoneyHolderDto|undefined>();
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
        FieldName: "MoneyHolderId",
        Value: useRoute().params.Id.toString(),
        DisplayName: undefined,
        Operation:undefined,
        Type:undefined,
        dropdownData:undefined
    }
])

handleGetMoneyHolderDetails(useRoute().params.Id.toString()).then(
    (response:  AppResponse<MoneyHolderDto>) => {
        if(response.isSuccess){
            MoneyHolder.value = response.data;
            
        }
        
    }
)
//console.log(useRoute().params.Id.toString())
</script>