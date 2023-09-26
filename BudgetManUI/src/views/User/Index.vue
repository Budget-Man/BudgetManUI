<template>
    <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'user'" :allowAdd="true" :allowDelete="true" :allowEdit="false"></BasicAdminFormVue>
</template>

<script setup lang="ts">
import type BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';

const tableColumns: TableColumn[] = [
    new TableColumn("id", "id", 0, false, false, true),
    new TableColumn("UserName", "User Name", 1, true, true, true),
    new TableColumn("Password", "Password", 0, false, false, true),
]


</script>