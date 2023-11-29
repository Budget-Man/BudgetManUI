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
        label: "Name",
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
        label: "TotalAmount",
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
        label: "RemainAmount",
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
        label: "totalInterest",
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
        label: "InterestRate",
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
        label: "RatePeriod",
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
                    ratePeriodText: "Daily",
                },
                {
                    ratePeriod:1,
                    ratePeriodText: "Weekly",
                },
                {
                    ratePeriod:2,
                    ratePeriodText: "Monthly",
                },
                {
                    ratePeriod:3,
                    ratePeriodText: "Quarterly",
                },
                {
                    ratePeriod:4,
                    ratePeriodText: "Annually",
                },
                {
                    ratePeriod:5,
                    ratePeriodText: "Irregular",
                },
            ]

        },
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
        ActionLabel: "Deatail",
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