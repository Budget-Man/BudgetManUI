<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Loan'" :allowAdd="true" :allowDelete="true"
            title="Loan" :CustomActions="CustomActions" :allowEdit="true" @onCustomAction="ChangePage"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import router from '@/router';
import axios from 'axios';

import {useI18n} from 'vue-i18n'
const {t} = useI18n();
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
        label: t("loan.name"),
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "totalAmount",
        label: t("loan.totalAmount"),
        enableEdit: false,
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
        key: "remainAmount",
        label:  t("loan.remainAmount"),
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    
    {
        key: "totalInterest",
        label: t("loan.totalInterest"),
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "interestRate",
        label: t("loan.interestRate"),
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
        key: "ratePeriod",
        label:  t("loan.ratePeriod"),
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: false,
        sortable: true,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "ratePeriodText",
            keyMember: "ratePeriod",
            data: [
                {
                    ratePeriod:0,
                    ratePeriodText: t("loan.Daily"),
                },
                {
                    ratePeriod:1,
                    ratePeriodText:  t("loan.Weekly"),
                },
                {
                    ratePeriod:2,
                    ratePeriodText: t("loan.Monthly"),
                },
                {
                    ratePeriod:3,
                    ratePeriodText: t("loan.Quarterly"),
                },
                {
                    ratePeriod:4,
                    ratePeriodText: t("loan.Annually"),
                },
                {
                    ratePeriod:5,
                    ratePeriodText: t("loan.Irregular"),
                },
            ]

        },
    },
    {
        key: "moneyHolderId",
        label: t("loan.moneyHolderId"),
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
        label: t("loan.moneyHolderName"),
        enableEdit: false,
        enableCreate: false,
        hidden: false,
        width: 300,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
]
const CustomActions: CustomAction[] = ([
    {
        ActionName: "Deatail",
        ActionLabel:t('details'),
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
function ChangePage(item: CustomActionResponse){
    if(item.Action.ActionName == "Deatail")
    router.push("/loan/" + item.Data.id);
}
</script>