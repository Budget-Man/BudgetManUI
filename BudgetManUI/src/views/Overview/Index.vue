<template>

    <el-space class="moneyOverviewContainer" fill direction="vertical"  :size="30">
    <!-- <div class="moneyOverviewContainer"> -->
        <!-- title  -->
        <el-row>
            <el-col :span="24"  :align="'center'">
                <el-text size="large" tag="b">{{ $t('moneyOverview.name') }}</el-text>
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
                <h2>{{ $t('income.name') }}:</h2>
                <el-col :span="7" >
                    <h1 Id="income-summary" class="summary">{{ formatCurrency(incomeSummary) }}</h1>
                </el-col>
            </el-row>
            <el-row>
                <el-button @click="handleOpenCreateIncome">+</el-button>
            </el-row>
            <el-table  :data="incomeData" row-key="id" table-layout="auto" @row-click="handleRowClick" :show-header="false" empty-text=" ">
                
                <el-table-column v-for="column in incomeCol.filter(x=>!x.hidden)" :key="column.key" :prop="column.key" :label="column.label"
                    :sortable="false" :align="column.align" :formatter="column.formatter"/>
                
                </el-table>
        </el-col>
    
        <el-col :span="11">
            <el-row justify="space-between">
                <h2>{{ $t('moneyOverview.expense') }}:</h2>
                <el-col :span="7">
                    <h1 Id="expense-summary" class="summary">{{ formatCurrency(expenseSummary) }}</h1>
                </el-col>
            </el-row>
            <el-row>
                <el-button @click="handleOpenCreateMoneySpend">-</el-button>
            </el-row>
            <el-table class="admin-table" :data="expenseData" row-key="id" table-layout="auto" @row-click="handleRowClick" :show-header="false" empty-text=" ">
                
                <el-table-column v-for="column in expenseCol" :key="column.key" :prop="column.key" :label="column.label"
                    :sortable="false" :align="column.align" :formatter="column.formatter"/>
                
                </el-table>
        </el-col>
        </el-row>
    <!-- </div> -->
    </el-space>
    
    <MnEditItem ref="MnEdit" :columns="incomeCol" apiName="income" :openDialog="isOpenCreateIncomeDialog" :title="$t('income.name')"
    createUrl="" editUrl="" :isEdit="false" :edit-item="newIncomeItem"
      @onSaved="AddIncome" @onCloseClicked="CloseCreateIncome" />

    <CreateMoneySpend :openDialog="isOpenCreateMoneySpendDialog" :item="newMoneySpendItem" @onSaved="AddMoneySpend" @onCloseClicked="CloseCreateMoneySpend">
    </CreateMoneySpend>
</template>
  
<script setup lang="ts">

import { ref, watch, onMounted, computed  } from 'vue';
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'
import { CreateMoneySpendRequest } from '../../Models/Request/MoneySpend/CreateMoneySpendRequest';
// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'
// @ts-ignore
import { handleAPICustom, handleAPIDelete, handleAPISearch } from '@/components/maynghien/adminTable/Service/BasicAdminService.ts'
// @ts-ignore
import { SearchRequest, SearchResponse } from '@/components/maynghien/adminTable/Service/BasicAdminService.ts';
// @ts-ignore
import { Filter } from '@/components/maynghien/BaseModels/Filter';
// @ts-ignore
import { formatCurrency } from "@/Services/CurrencyUtilities";
import { useToast } from "vue-toastification";
// @ts-ignore
import CreateMoneySpend from '@/components/MoneySpend/CreateMoneySpend.vue';
// @ts-ignore
import MnEditItem from '@/components/maynghien/adminTable/MnEditItem.vue'
// @ts-ignore
import languages from '@/languages'

const _toast = useToast();
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
    //  console.log(searchRequest.filters);
    var searchApiResponse = await handleAPISearch(searchRequest, apiName);
    // console.log(searchApiResponse);
    if (searchApiResponse.isSuccess && searchApiResponse.data != undefined) {
        // console.log("success");
        let dataResponse: SearchResponse<SearchDTOItem[] | undefined> = searchApiResponse.data;
        // console.log(dataResponse);
        if (dataResponse != undefined && dataResponse.data != undefined && dataResponse.data.length > 0) {
        return dataResponse.data;
        }
        else {
        return [];
        }
    }
    _toast.error(searchApiResponse.message);
}
// let budgetData = ref<SearchDTOItem[]>([]);
let searchRequest: SearchRequest = {
  PageIndex: 1,
  PageSize: 10,
//   filters:  Filter[],
  SortBy: undefined
}

const formatAmount = (row: any, column: any, cellValue: any)  => {
    // console.log(cellValue);
    return formatCurrency(cellValue);
}
const incomeCol : TableColumn[] = [
    {
        key: "moneyHolderId",
        label: languages.global.t('income.moneyHolderId'),
        enableEdit: true,
        enableCreate: true,
        hidden: true,
        width: 300,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "moneyHolder"

        },

    },
    {
        key: "name",
        label: "name",
        enableCreate: true,
        enableEdit: true,
        hidden: false,
        width: 500,
        required: true,
        inputType: "text",
        align: "left",
        showInTable: true
    },
    {
        key: "amount",
        label: "Amount",
        enableCreate: true,
        enableEdit: true,
        hidden: false,
        width: 500,
        required: true,
        inputType: "currency",
        align: "right",
        formatter : formatAmount,
        showInTable: true
    },
];
const expenseCol : TableColumn[] = [
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
        align: "right",
        formatter : formatAmount
    },
];

const handleRowClick = (row: any, column: any, event: any) => {

// selectedId.value = row.id;

};
const moneyHolderValue = ref('')
const budgetData = ref(null);
const incomeData = ref<[] | null>(null)
const expenseData = ref<[] | null>(null)
// const moneyHolderData = ref<[{
//     value: 'Option1',
//     label: 'Option1',
//   }] | null>(null)
const moneyHolderData = ref<[SearchDTOItem]>();
// const balance = ref<Number>(0);
const newIncomeItem = ref<SearchDTOItem>({});
const newMoneySpendItem = ref<CreateMoneySpendRequest>({});
const balance = ref(0);

const incomeSummary = computed(() => {
    if (!incomeData.value) {
        return 0; // or any default value when there's no data
    }

    const lastColumnKey = incomeCol[incomeCol.length - 1].key;
    return incomeData.value.reduce((sum : number, row : any) => sum + Number(row[lastColumnKey]), 0);
        
});
const expenseSummary = computed(() => {
    // console.log(expenseCol)
    // console.log(expenseCol.length)
    // console.log(expenseCol[incomeCol.length - 1])
    if (!expenseData.value || expenseCol.length == 0) {
        return 0; // or any default value when there's no data
    }

    const lastColumnKey = expenseCol[expenseCol.length - 1].key;
    return expenseData.value.reduce((sum : number, row : any) => sum + Number(row[lastColumnKey]), 0);
        
});
onMounted(async () => {
  try {
    
    // budgetData.value = await Search("budget");
    // balance = await Search("Income");

    //incomeData.value = await Search("Income");

    //expenseData.value = await Search("MoneySpend");
    moneyHolderData.value = await Search("MoneyHolder");
    // console.log(moneyHolderData.value);
    
    // console.log(moneyHolderData);
    // Set default value to the id of the first row, if available
    if (moneyHolderData.value && moneyHolderData.value.length > 0) {
      moneyHolderValue.value = moneyHolderData.value[0].id;
    //   if (moneyHolderData.value && moneyHolderData.value.length > 0){
    //     const selectedMoneyHolder = moneyHolderData.value.find((item) => item.id === moneyHolderValue.value);
    //     console.log(selectedMoneyHolder);
    //     balance.value = selectedMoneyHolder ? selectedMoneyHolder.balance : 0;
    //     }
        balance.value = moneyHolderData.value[0].balance;
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
        // console.log(moneyHolderData?.value?.find((item) => item.id === newValue));
        balance.value = moneyHolderData?.value?.find((item) => item.id === newValue).balance;
      //const additionalData = await Search("AdditionalData"); // Replace "AdditionalData" with the desired API name
      // Process the additional data as needed
        incomeData.value =[];
        expenseData.value = [];
        incomeData.value = await Search("Income");
        // console.log(incomeData.value);
        expenseData.value = await Search("MoneySpend");

    } catch (error) {
      console.error("Error fetching additional data:", error);
      // Handle the error accordingly
    }
  }
});
// const handleColumnVisibilityChange = (column : any) => {
//     console.log(`Column ${column.key} visibility changed to ${column.visible}`);
//   };

const isOpenCreateMoneySpendDialog = ref(false);
const isOpenCreateIncomeDialog = ref(false);
const AddIncome = async () => {
    console.log('AddMoneySpend')
    console.log(newIncomeItem.value)
    incomeData.value = await Search("Income");
    isOpenCreateIncomeDialog.value = false;
    balance.value += Number(newIncomeItem.value.amount)
    newIncomeItem.value = {}
}
const AddMoneySpend = async () => {
    // console.log('AddMoneySpend')
    // console.log(newMoneySpendItem.value)
    expenseData.value = await Search("MoneySpend");
    isOpenCreateMoneySpendDialog.value = false;
    balance.value -= Number(newMoneySpendItem.value.Amount)
    newMoneySpendItem.value = {}
}
const CloseCreateIncome = () => {
    // console.log("close create ");
    if (isOpenCreateIncomeDialog.value){
        isOpenCreateIncomeDialog.value = false;
    }
}
const CloseCreateMoneySpend = () => {
    // console.log("close create ");
    if (isOpenCreateMoneySpendDialog.value){
        isOpenCreateMoneySpendDialog.value = false;
    }
    // isEditedOutSide.value = false;
}
const handleOpenCreateIncome = () => {
    // console.log("open create Income");
    newIncomeItem.value.moneyHolderId = moneyHolderValue.value
    isOpenCreateIncomeDialog.value = true;
}
const handleOpenCreateMoneySpend = () => {
    // console.log("open create");
    newMoneySpendItem.value.MoneyHolderId = moneyHolderValue.value
    isOpenCreateMoneySpendDialog.value = true;
}

onMounted(() => {
      document.addEventListener( "keypress", handleKeypress );
});
const handleKeypress = (event : KeyboardEvent) => {
//   console.log(event.key);
  // Check if the key pressed is the Enter key (key code 13)
  
  if (isOpenCreateIncomeDialog.value === false && isOpenCreateMoneySpendDialog.value === false){
    if (event.key === '+') {
        CloseCreateMoneySpend()
        handleOpenCreateIncome()
    }
    else if (event.key === '-') {
        CloseCreateIncome()
        handleOpenCreateMoneySpend()
    }
  }
}
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