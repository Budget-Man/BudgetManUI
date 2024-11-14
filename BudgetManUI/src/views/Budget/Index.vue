<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'budget'" :allowAdd="true" :allowDelete="true" title="Budget"
           :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn';

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
        label: "Tên",
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
        label: "Hạng Mục",
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
            apiUrl: "budgetCategory"

        },

    },
    {
        key: "budgetCategoryName",
        label: "Hạng Mục",
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: true,
        sortable: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "name",
            apiUrl: "budgetCategory"

        },

    },
    {
        key: "balance",
        label: "Số Tiền",
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