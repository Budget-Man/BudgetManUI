<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Income'" :allowAdd="true" :allowDelete="true"
            title="Income" :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
    </Suspense>
    <!-- <el-button @click="DownloadExcel()">In</el-button> -->
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn';
import {axiosInstance} from '../../Services/axiosConfig';
import {reactive} from 'vue';
import{SearchRequest} from '../../components/maynghien/BaseModels/SearchRequest';
import Filter from '../../components/maynghien/BaseModels/Filter';
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
        label: "Số Tiền",
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
function DownloadExcel() {
  var data;
  let searchRequest = reactive<SearchRequest>({
  filters: [
    {
      FieldName: "IsDelete",
      Value: "",
      Operation: undefined,
    },
  ] as Filter[],
  SortBy: undefined,
  PageIndex: 1,
  PageSize: 10,
});
  axiosInstance
    .post("Income/Download", searchRequest, {
      responseType: "blob",
    })
    .then((response) => {
      data = response.data;
      // Chuyển dữ liệu thành một đối tượng Blob
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Tải file về máy
      const filename = "ThongKeThuNhap"+new Date().toLocaleDateString("vi-GB")+".xlsx";
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
}
</script>