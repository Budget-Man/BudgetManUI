<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'LoanPay'" :allowAdd="true" :allowDelete="true"
            title="LoanPay" :CustomActions="CustomActions" :allowEdit="true" :CustomFilters="CustomFilters"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import type { Filter } from '@/components/maynghien/BaseModels/Filter';
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { useRoute } from 'vue-router';

const tableColumns: TableColumn[] = [
    {
        key: "debtsName",
        label: "DebtsName",
        enableEdit: false,
        enableCreate: true,
        hidden: true,
        width: 500,
        required: false,
        sortable: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Loan"

        },
    },
    {
        key: "paidAmount",
        label: "PaidAmount",
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
        key: "interest",
        label: "Interest",
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
        key: "interestRate",
        label: "InterestRate",
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
        key: "isPaid",
        label: "IsPaid",
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
]
const CustomActions: CustomAction[] = ([

]);
const CustomFilters: Filter[] = ([
    {
        FieldName: "LoanId",
        Value: useRoute().params.Id.toString(),
        DisplayName: undefined,
        Operation:undefined,
        Type:undefined,
        dropdownData:undefined
    }
])
</script>