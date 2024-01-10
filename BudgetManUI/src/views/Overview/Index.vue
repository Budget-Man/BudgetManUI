<template>

    <el-space class="moneyOverviewContainer" fill direction="vertical"  size="large">
    <!-- <div class="moneyOverviewContainer"> -->
        <!-- title  -->
        <el-row>
            <el-col :span="24"  :align="'center'">
                <el-text size="large" tag="b">{{ $t('moneyOverview.title') }}</el-text>
            </el-col>
            <!-- holder selector -->
            <el-select v-model="moneyHolderValue" class="m-2 absolute-right" size="small">
                <el-option
                    v-for="item in moneyHolderData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    />
            </el-select>
        </el-row>
        <!-- balance -->
        <el-row justify="space-around">
            <el-text size="large" class="absolute-left">{{ $t("moneyOverview.yourBalance") }}: </el-text>
            <el-col :span="24" :align="'center'">
                <h2>{{ formatCurrency(balance)}}</h2>
            </el-col>
            <!-- <el-col :span="24">
                    <el-table class="admin-table" :data="budgetData" row-key="id" table-layout="auto" @row-click="handleRowClick" :show-header="false">
                        
                        <el-table-column v-for="column in budgetCol" :key="column.key" :prop="column.key" :label="column.label"
                        :sortable="false" />
                    
                    </el-table>
            </el-col> -->
        </el-row>
        <el-row justify="space-between">
        <el-col :span="11">
            <el-row justify="space-between">
                <h2>Income:</h2>
                <el-col :span="5" >
                    <h1 Id="income-summary" class="summary">{{ formatCurrency(incomeSummary) }}</h1>
                </el-col>
            </el-row>
            <el-table  :data="incomeData" row-key="id" table-layout="auto" @row-click="handleRowClick" :show-header="false">
                
                <el-table-column v-for="column in incomeCol" :key="column.key" :prop="column.key" :label="column.label"
                    :sortable="false" :align="column.align"/>
                
                </el-table>
        </el-col>
    
        <el-col :span="11">
            <el-row justify="space-between">
                <h2>Outcome:</h2>
                <el-col :span="5">
                    <h1 Id="outcome-summary" class="summary">{{ formatCurrency(outcomeSummary) }}</h1>
                </el-col>
            </el-row>
            <el-table class="admin-table" :data="outcomeData" row-key="id" table-layout="auto" @row-click="handleRowClick" :show-header="false">
                
                <el-table-column v-for="column in outcomeCol" :key="column.key" :prop="column.key" :label="column.label"
                    :sortable="false" :align="column.align"/>
                
                </el-table>
        </el-col>
        </el-row>
    <!-- </div> -->
    </el-space>
</template>
  
<script setup lang="ts">

import { ref, watch, onMounted, computed  } from 'vue';
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'
// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'
// @ts-ignore
import { handleAPICustom, handleAPIDelete, handleAPISearch } from '@/components/maynghien/adminTable/Service/BasicAdminService.ts'
// @ts-ignore
import { SearchRequest, SearchResponse } from '@/components/maynghien/adminTable/Service/BasicAdminService.ts';
// @ts-ignore
import { Filter } from '@/components/maynghien/BaseModels/Filter';
// @ts-ignore
import { formatCurrency } from "@/Services/Utilities";

const Search = async (apiName: any) => {
    if (moneyHolderValue.value)
    {
        let filters : Filter[] = [{ 
            FieldName : "moneyHolderId",
            Value : moneyHolderValue.value,
            Type : "dropdown",
            Operation : "",
            DisplayName : "",
            dropdownData : undefined
        }];
        searchRequest.filters = filters
    }
     console.log(searchRequest.filters);
    var searchApiResponse = await handleAPISearch(searchRequest, apiName);
    // console.log(searchApiResponse);
    if (searchApiResponse.isSuccess && searchApiResponse.data != undefined) {
        // console.log("success");
        let dataResponse: SearchResponse<SearchDTOItem[] | undefined> = searchApiResponse.data;
        // console.log(dataResponse);
        if (dataResponse != undefined && dataResponse.data != undefined && dataResponse.data.length > 0) {
        return dataResponse.data;
        // if (dataresponse.totalPages != undefined)
        //   totalPages.value = dataresponse.totalPages;
        // else
        //   totalPages.value = 0;
        // if (dataresponse.totalRows != undefined) {
        //   totalItem.value = dataresponse.totalRows;
        // }
        // else
        //   totalItem.value = 0;
        }
        else {
        return [];
        }
    }
}
// let budgetData = ref<SearchDTOItem[]>([]);
let searchRequest: SearchRequest = {
  PageIndex: 1,
  PageSize: 10,
//   filters:  Filter[],
  SortBy: undefined
}
const budgetCol : TableColumn[] = [
    // {
    //     key: "id",
    //     label: "id",
    //     hidden: true,
    // },
    {
        key: "budgetCategoryName",
        label: "name",

    },
    {
        key: "balance",
        label: "balance",

    },
];
const incomeCol : TableColumn[] = [
    // {
    //     key: "id",
    //     label: "id",

    // },
    {
        key: "name",
        label: "name",
        align: "left"
    },
    {
        key: "amount",
        label: "Amount",
        align: "right"
    },
];
const outcomeCol : TableColumn[] = [
    // {
    //     key: "id",
    //     label: "id",
    // },
    {
        key: "reason",
        label: "Reason",
        align: "left"
    },
    {
        key: "amount",
        label: "Amount",
        align: "right"
    },
];
const moneyHolderCol : TableColumn[] = [
    {
        key: "budgetCategoryName",
        label: "name",

    },
    {
        key: "balance",
        label: "balance",

    },
];

const handleRowClick = (row: any, column: any, event: any) => {

// selectedId.value = row.id;

};
const moneyHolderValue = ref('')
const budgetData = ref(null);
const incomeData = ref<[] | null>(null)
const outcomeData = ref<[] | null>(null)
// const moneyHolderData = ref<[{
//     value: 'Option1',
//     label: 'Option1',
//   }] | null>(null)
const moneyHolderData = ref<[SearchDTOItem]>();
// const balance = ref<Number>(0);
const balance = computed(() => {
    if (moneyHolderData.value && moneyHolderData.value.length > 0){
        const selectedMoneyHolder = moneyHolderData.value.find((item) => item.id === moneyHolderValue.value);

        // Assuming there is a 'balance' property in the selected item, adjust it accordingly

        return selectedMoneyHolder ? selectedMoneyHolder.balance : 0;
    }
    return 0;
})
const incomeSummary = computed(() => {
    if (!incomeData.value) {
        return 0; // or any default value when there's no data
    }

    const lastColumnKey = incomeCol[incomeCol.length - 1].key;
    return incomeData.value.reduce((sum : number, row : any) => sum + Number(row[lastColumnKey]), 0);
        
});
const outcomeSummary = computed(() => {
    if (!outcomeData.value) {
        return 0; // or any default value when there's no data
    }

    const lastColumnKey = outcomeCol[incomeCol.length - 1].key;
    return outcomeData.value.reduce((sum : number, row : any) => sum + Number(row[lastColumnKey]), 0);
        
});
onMounted(async () => {
  try {
    // budgetData.value = await Search("budget");
    // balance = await Search("Income");

    //incomeData.value = await Search("Income");

    //outcomeData.value = await Search("MoneySpend");
    moneyHolderData.value = await Search("MoneyHolder");
    // console.log(moneyHolderData);
    // Set default value to the id of the first row, if available
    if (moneyHolderData.value && moneyHolderData.value.length > 0) {
      moneyHolderValue.value = moneyHolderData.value[0].id;
    }
  } catch (error) {
    console.error("Error fetching budget data:", error);
    // Handle the error accordingly
  }
});
watch(moneyHolderValue, async (newValue) => {
  if (newValue !== null) {
    try {
        // console.log(newValue);
      //const additionalData = await Search("AdditionalData"); // Replace "AdditionalData" with the desired API name
      // Process the additional data as needed
      incomeData.value = await Search("Income");

        outcomeData.value = await Search("MoneySpend");
    } catch (error) {
      console.error("Error fetching additional data:", error);
      // Handle the error accordingly
    }
  }
});
const handleColumnVisibilityChange = (column : any) => {
    console.log(`Column ${column.key} visibility changed to ${column.visible}`);
  };

</script>

<style>
    .moneyOverviewContainer{
        background: white;
        padding: 20px 20px 20px 20px;
        width: 100%;
        min-height: 100px;
        border-radius: var(--el-border-radius-base);
    }

    .container {
        display: flex;
        justify-content: space-evenly;
    }

    .column {
        width: 50%;
    }

    .summary {
        text-align: right;
        padding-right: 12px;
    }

    .absolute-right{
        position: absolute;
        right: 0px;
    }
    .absolute-left{
        position: absolute;
        left: 0px;
    }
</style>