<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'MoneySpend'" :allowAdd="false" :allowDelete="true"
            :is-edited-out-side="isEditedOutSide" :title="$t('moneySpend.name')" :CustomActions="CustomActions" :allowEdit="true"
            @onCustomAction="handleCustomAction">
        </BasicAdminFormVue>
    </Suspense>
    <Suspense>
        <CreateMoneySpend :openDialog="isOpenCreateDialog" @onSaved="Reload" @onCloseClicked="CloseCreate">
        </CreateMoneySpend>
    </Suspense>
</template>

<script setup lang="ts">
// @ts-ignore
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
// @ts-ignore
import CreateMoneySpend from '@/components/MoneySpend/CreateMoneySpend.vue';
// @ts-ignore
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { ref, inject } from 'vue';

import {useI18n} from 'vue-i18n'
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
        key: "reason",
        label: t("moneySpend.reason"),
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
        label: t("moneyHolder.name"),
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
        label:  t("moneyHolder.name"),
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
        label:  t("budget.name"),
        enableEdit: true,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: false,
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
        label: t("budget.name"),
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
        label: t('amount'),
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    }
]
const CustomActions: CustomAction[] = ([
    {
        ActionName: "Create",
        ActionLabel: t('create'),
        ApiActiontype: ApiActionType.None,
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