<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'MoneySpend'" :allowAdd="false" :allowDelete="false"
            :is-edited-out-side="isEditedOutSide" title="Money spend" :CustomActions="CustomActions" :allowEdit="false"
            @onCustomAction="handleCustomAction">
        </BasicAdminFormVue>
    </Suspense>
    <Suspense>
        <CreateMoneySpend :openDialog="isOpenCreateDialog" @onSaved="Reload" @onCloseClicked="CloseCreate">
        </CreateMoneySpend>
    </Suspense>
    <el-button @click="DownloadExcel()">In</el-button>
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';

import CreateMoneySpend from '@/components/MoneySpend/CreateMoneySpend.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { ref } from 'vue';
import {axiosInstance} from '../../Services/axiosConfig';
import {reactive} from 'vue';
import{SearchRequest} from '../../components/maynghien/BaseModels/SearchRequest';
import Filter from '../../components/maynghien/BaseModels/Filter';
const isEditedOutSide = ref(false);
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
        key: "reason",
        label: "Sự Kiện",
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
        label: "Nơi giữ tiền",
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
            apiUrl: "moneyHolder"

        },

    },
    {
        key: "moneyHolderName",
        label: "Nơi giữ tiền",
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: false,
        sortable: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "name",
            apiUrl: "moneyHolder"

        },

    },
    {
        key: "budgetId",
        label: "Ngân Sách",
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
            apiUrl: "moneyHolder"

        },

    },
    {
        key: "budgetName",
        label: "Ngân Sách",
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
        enableCreate: false,
        hidden: false,
        width: 300,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },

]
const CustomActions: CustomAction[] = ([
    {
        ActionName: "Create",
        ActionLabel: "Thêm",
        ApiActiontype: ApiActionType.POST,
        IsRowAction: false,
        DataType: CustomActionDataType.null,
    }
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
    .post("MoneySpend/Download", searchRequest, {
      responseType: "blob",
    })
    .then((response) => {
      data = response.data;
      // Chuyển dữ liệu thành một đối tượng Blob
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Tải file về máy
      const filename = "ThongKeChiTieu"+new Date().toLocaleDateString("vi-GB")+".xlsx";
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
}
const isOpenCreateDialog = ref(false);
const handleCustomAction = async (item: CustomActionResponse) => {
    if (item.Action.ActionName == "Create") {
        isOpenCreateDialog.value = true;
        isEditedOutSide.value = false;
    }
}
const Reload = async () => {
    isOpenCreateDialog.value = false;
    isEditedOutSide.value = true;
}
const CloseCreate = async () => {
    isOpenCreateDialog.value = false;
    isEditedOutSide.value = false;
}
</script>