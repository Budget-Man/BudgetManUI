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
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';

import CreateMoneySpend from '@/components/MoneySpend/CreateMoneySpend.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { ref } from 'vue';
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
        label: "Reason",
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
        label: "Money Holder",
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
        label: "Money Holder",
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
        key: "budgetId",
        label: "Budget",
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
        key: "budgetName",
        label: "Budget",
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
        ActionLabel: "Create",
        ApiActiontype: ApiActionType.POST,
        IsRowAction: false,
        DataType: CustomActionDataType.null,
    }
]);
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