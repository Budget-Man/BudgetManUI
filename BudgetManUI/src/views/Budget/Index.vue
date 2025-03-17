<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'budget'" :allowAdd="true" :allowDelete="true" title="Budget"
           :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">
// @ts-ignore
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
// @ts-ignore
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import {useI18n} from 'vue-i18n'
const {t} = useI18n();
const tableColumns: TableColumn[] = [
    {
        key: "id",
        label: "id",
        enableEdit: false,
        enableCreate: false,
        hidden: true,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
    {
        key: "name",
        label: t("budget.name"),
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
    {
        key: "budgetCategoryId",
        label:t("budget.budgetCategoryId"),
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
            apiUrl: "budgetCategory"

        },

    },
    {
        key: "budgetCategoryName",
        label: t("budget.budgetCategoryName"),
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
        key: "balance",
        label: t("budget.balance"),
        enableEdit: true,
        enableCreate: true,
        hidden: true,
        width: 200,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "currency",
        dropdownData: null,

    },
    {
        key: "balanceInfo",
        label: t("budget.balance"),
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 200,
        required: false,
        sortable: false,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
]
const CustomActions: CustomAction[] = ([
    {
        ActionLabel:t("reset-monthly-budget"),
        //ActionName:undefined,
        ApiAction:"budget",
        ApiActiontype: ApiActionType.PATCH,
        DataType: CustomActionDataType.null,
        IsRowAction:false
       

    }
]);

</script>