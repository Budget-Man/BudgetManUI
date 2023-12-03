<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Income'" :allowAdd="true" :allowDelete="true"
            title="Income" :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
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
        key: "moneyHolderId",
        label: "Nơi Giữ Tiền",
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
            apiUrl: "moneyHolder"

        },

    },
    {
        key: "moneyHolderName",
        label: "Nơi Giữ Tiền",
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
    {
        key: "amount",
        label: "Số Lượng",
        enableEdit: false,
        enableCreate: true,
        hidden: false,
        width: 300,
        required: true,
        sortable: false,
        showSearch: false,
        inputType: "number",
        dropdownData: null,

    },

]
const CustomActions: CustomAction[] = ([

]);
</script>