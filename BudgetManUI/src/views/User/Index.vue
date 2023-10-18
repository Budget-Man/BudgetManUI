<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'user'" :allowAdd="true" :allowDelete="true"
            :allowEdit="true"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts'
const tableColumns: TableColumn[] = [
    {
        key: "userName",
        label: "User Name",
        enableEdit: true,
        hidden: false,
        width: 500,
        required: true,
        sortable: true,
        showSearch: true,
        inputType: "text",
        dropdownData: null,

    },
    {
        key: "role",
        label: "Role",
        enableEdit: true,
        hidden: false,
        width: 300,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "role",
            keyMember: "role",
            data: [
                {
                    role: "admin"
                },
                {

                    role: "tenant"
                }
            ]

        },

    },

]


</script>