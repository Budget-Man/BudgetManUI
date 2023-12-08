<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'DebtsPay'" :allowAdd="true" :allowDelete="false"
        :createUrl="useRoute().params.Id.toString()"
            title="DebtsPay" :CustomActions="CustomActions" :allowEdit="false" :CustomFilters="CustomFilters"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import type { Filter } from '@/components/maynghien/BaseModels/Filter';
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
// @ts-ignore
import { handleGetDebt } from '../../Services/Debt/DeptService.ts'
import type { DebtDto } from '@/Models/Dtos/DebtDto';
const Debt = ref<DebtDto|undefined>();
const tableColumns: TableColumn[] = [
    {
        key: "debtsName",
        label: "Tên",
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
            apiUrl: "Debt"

        },
    },
    {
        key: "paidAmount",
        label: "Số tiền thanh toán",
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
    // {
    //     key: "interest",
    //     label: "Lãi",
    //     enableEdit: true,
    //     enableCreate: true,
    //     hidden: false,
    //     width: 500,
    //     required: false,
    //     sortable: true,
    //     showSearch: false,
    //     inputType: "text",
    //     dropdownData: null,
    // },
    // {
    //     key: "interestRate",
    //     label: "Lãi Suất",
    //     enableEdit: false,
    //     enableCreate: false,
    //     hidden: false,
    //     width: 500,
    //     required: false,
    //     sortable: true,
    //     showSearch: false,
    //     inputType: "text",
    //     dropdownData: null,
    // },
    {
        key: "isPaid",
        label: "Đã thanh toán",
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
        key: "moneyHolderId",
        label: "Nơi giữ tiền",
        enableEdit: false,
        enableCreate: true,
        hidden: true,
        width: 300,
        required: false,
        sortable: false,
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
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,

    },
    // {
    //     key: "ratePeriod",
    //     label: "Tỷ lệ thời gian",
    //     enableEdit: true,
    //     enableCreate: true,
    //     hidden: false,
    //     width: 500,
    //     required: false,
    //     sortable: true,
    //     showSearch: false,
    //     inputType: "dropdown",
    //     dropdownData: {
    //         displayMember: "ratePeriodText",
    //         keyMember: "ratePeriod",
    //         data: [
    //             {
    //                 ratePeriod:0,
    //                 ratePeriodText: "Daily",
    //             },
    //             {
    //                 ratePeriod:1,
    //                 ratePeriodText: "Weekly",
    //             },
    //             {
    //                 ratePeriod:2,
    //                 ratePeriodText: "Monthly",
    //             },
    //             {
    //                 ratePeriod:3,
    //                 ratePeriodText: "Quarterly",
    //             },
    //             {
    //                 ratePeriod:4,
    //                 ratePeriodText: "Annually",
    //             },
    //             {
    //                 ratePeriod:5,
    //                 ratePeriodText: "Irregular",
    //             },
    //         ]

    //     },
    // },
    // {
    //     key: "moneyHolderId",
    //     label: "Nơi Giữ Tiền",
    //     enableEdit: true,
    //     enableCreate: true,
    //     hidden: true,
    //     width: 300,
    //     required: true,
    //     sortable: true,
    //     showSearch: true,
    //     inputType: "dropdown",
    //     dropdownData: {
    //         displayMember: "name",
    //         keyMember: "id",
    //         apiUrl: "moneyHoler"

    //     },

    // },
    // {
    //     key: "moneyHolderName",
    //     label: "Nơi Giữ Tiền",
    //     enableEdit: false,
    //     enableCreate: false,
    //     hidden: false,
    //     width: 300,
    //     required: true,
    //     sortable: true,
    //     showSearch: false,
    //     inputType: "text",
    //     dropdownData: null,

    // },
    // {
    //     key: "budgetId",
    //     label: "Ngân Sách",
    //     enableEdit: true,
    //     enableCreate: true,
    //     hidden: true,
    //     width: 300,
    //     required: true,
    //     sortable: true,
    //     showSearch: false,
    //     inputType: "dropdown",
    //     dropdownData: {
    //         displayMember: "name",
    //         keyMember: "id",
    //         apiUrl: "budget"

    //     },

    // },
    // {
    //     key: "budgetName",
    //     label: "Ngân Sách",
    //     enableEdit: false,
    //     enableCreate: false,
    //     hidden: true,
    //     width: 300,
    //     required: true,
    //     sortable: true,
    //     showSearch: false,
    //     inputType: "text",
    //     dropdownData: null,

    // },
]
const CustomActions: CustomAction[] = ([

]);
const CustomFilters: Filter[] = ([
    {
        FieldName: "debtId",
        Value: useRoute().params.Id.toString(),
        DisplayName: undefined,
        Operation:undefined,
        Type:undefined,
        dropdownData:undefined
    }
])


const RatePeriod =ref("");
handleGetDebt(useRoute().params.Id.toString()).then(
    (response) => {
        if(response.isSuccess){
            Debt.value = response.data;
            switch (response.data?.ratePeriod) {
                case 0:
                    RatePeriod.value="Daily"
                    break;
                    case 1:
                    RatePeriod.value="Weekly"
                    break;
                    case 2:
                    RatePeriod.value="Monthly"
                    break;
                    case 3:
                    RatePeriod.value="Quarterly"
                    break;
                    case 4:
                    RatePeriod.value="Annually"
                    break;
                    case 5:
                    RatePeriod.value="Irregular"
                    break;
                default:
                    break;
            }
        }
        
    }
)
</script>