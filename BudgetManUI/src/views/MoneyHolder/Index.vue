<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'MoneyHolder'" :allowAdd="true" :allowDelete="true" :title="$t('moneyHolder.name')"
        :is-edited-out-side="isEditedOutSide"  :CustomActions="CustomActions" :allowEdit="true"  @onCustomAction="handleCustomAction"></BasicAdminFormVue>
    </Suspense>
    <Suspense>
        <CreateMoneyTransfer :openDialog="isOpenCreateDialog" @onSaved="Reload" @onCloseClicked="CloseCreate">
        </CreateMoneyTransfer>
    </Suspense>
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
// @ts-ignore
import CreateMoneyTransfer from '@/components/MoneyTransfer/CreateMoneyTransfer.vue';
// @ts-ignore
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import router from '@/router';
const {t} = useI18n();

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
        key: "name",
        label: t('name'),
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
        key: "bankName",
        label: t('moneyHolder.bankname'),
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
        key: "balance",
        label: t('balance'),
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "number",
        dropdownData: null,

    },

]
const CustomActions: CustomAction[] = ([
    {
        ActionName: "transfer",
        ActionLabel: t('transfer'),
        ApiActiontype: ApiActionType.None,
        IsRowAction: false,
        DataType: CustomActionDataType.null,
    },
    {
        ActionName: "Deatail",
        ActionLabel:t('details'),
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
const isOpenCreateDialog = ref(false);
const handleCustomAction = async (item: CustomActionResponse) => {
    if (item.Action.ActionName == "transfer") {
        isOpenCreateDialog.value = true;
        isEditedOutSide.value = false;
    }
    else  if(item.Action.ActionName == "Deatail")
            router.push("/moneyholder/" + item.Data.id);
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