<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'budget'" :allowAdd="true" :allowDelete="true" title="Budget"
           :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';

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
        label: "name",
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
        label: "Category",
        enableEdit: true,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "budgetCategory"

        },

    },
    {
        key: "budgetCategoryName",
        label: "Category",
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: true,
        sortable: true,
        showSearch: true,
        inputType: "text",
        dropdownData: null,

    },
    {
        key: "balance",
        label: "Balance",
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 200,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "number",
        dropdownData: null,

    },
]
const CustomActions: CustomAction[] = ([
    
]);
</script>