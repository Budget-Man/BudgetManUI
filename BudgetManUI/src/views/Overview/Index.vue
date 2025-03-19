<template>
  <el-space
    class="moneyOverviewContainer"
    fill
    :size="30"
    style="overflow: hidden; height: 100%; margin-bottom: 64px"
  >
    <!-- <div class="moneyOverviewContainer"> -->
    <!-- title  -->
    <el-row>
      <el-col :span="24" :align="'center'">
        <el-text size="large" tag="b">{{ $t("moneyOverview.name") }}</el-text>
      </el-col>
      <!-- holder selector -->
      <el-select
        v-model="moneyHolderValue"
        class="m-2 absolute-right"
        size="small"
      >
        <el-option
          v-for="item in moneyHolderData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-row>
    <!-- balance -->
    <el-row>
      <el-text size="large" :align="'center'" style="width: 100%"
        >{{ $t("moneyOverview.yourBalance") }}:
      </el-text>
      <el-col :align="'center'">
        <h2>{{ formatCurrency(balance) }}</h2>
      </el-col>
      <!-- <el-col :span="24">
                    <el-table class="admin-table" :data="budgetData" row-key="id" table-layout="auto" @row-click="handleRowClick" :show-header="false">
                        
                        <el-table-column v-for="column in budgetCol" :key="column.key" :prop="column.key" :label="column.label"
                        :sortable="false" />
                    
                    </el-table>
            </el-col> -->
    </el-row>
    <el-row
      style="
        display: flex;
        gap: 12px;
        overflow: auto;
        flex-wrap: nowrap !important;
        max-height: 80vh;
      "
    >
      <el-col style="flex: 1; flex-shrink: 0">
        <el-row justify="space-between">
          <h2>{{ $t("income.name") }}:</h2>
          <el-col :span="7" style="margin-top: auto">
            <h1 Id="income-summary" class="summary">
              {{ formatCurrency(incomeSummary) }}
            </h1>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="handleOpenCreateIncome">+</el-button>
        </el-row>
        <el-table
          :data="incomeData"
          row-key="id"
          table-layout="auto"
          @row-click="handleIncomeRowClick"
          :show-header="false"
          empty-text=" "
        >
          <el-table-column
            v-for="column in incomeCol.filter((x) => x.showInTable)"
            :key="column.key"
            :prop="column.key"
            :label="column.label"
            :sortable="false"
            :align="column.align"
            :formatter="column.formatter"
          />
        </el-table>
      </el-col>

      <el-col style="flex: 1; flex-shrink: 0">
        <el-row justify="space-between">
          <h2>{{ $t("moneyOverview.expense") }}:</h2>
          <el-col :span="7" style="margin-top: auto">
            <h1 Id="expense-summary" class="summary">
              {{ formatCurrency(expenseSummary) }}
            </h1>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="handleOpenCreateMoneySpend">-</el-button>
        </el-row>
        <el-table
          class="admin-table"
          :data="moneySpendData"
          row-key="id"
          table-layout="auto"
          @row-click="handleMoneySpendRowClick"
          :show-header="false"
          empty-text=" "
        >
          <el-table-column
            v-for="column in moneySpendCol.filter((x) => x.showInTable)"
            :key="column.key"
            :prop="column.key"
            :label="column.label"
            :sortable="false"
            :align="column.align"
            :formatter="column.formatter"
          />
        </el-table>
      </el-col>
    </el-row>
    <!-- </div> -->
  </el-space>

  <MnEditItem
    ref="Income"
    :columns="incomeCol"
    apiName="income"
    :openDialog="isOpenIncomeDialog"
    :title="$t('income.name')"
    createUrl=""
    editUrl=""
    :isEdit="isEdittingIncome"
    :edit-item="incomeItem"
    @onSaved="SaveIncome"
    @onCloseClicked="CloseIncomeDialog"
    :enable-delete="true"
    @onDeleted="handleDeletedIncome"
  />

  <!-- <CreateMoneySpend :openDialog="isOpenMoneySpendDialog" :item="moneySpendItem" @onSaved="AddMoneySpend" @onCloseClicked="CloseCreateMoneySpend"
    :isEdit="isEdittingMoneySpend"></CreateMoneySpend> -->

  <MnEditItem
    ref="MoneySpend"
    :columns="moneySpendCol"
    apiName="moneyspend"
    :openDialog="isOpenMoneySpendDialog"
    :title="$t('moneySpend.name')"
    createUrl=""
    editUrl=""
    :isEdit="isEdittingMoneySpend"
    :edit-item="moneySpendItem"
    @onSaved="SaveMoneySpend"
    @onCloseClicked="CloseMoneySpendDialog"
    :enable-delete="true"
    @onDeleted="handleDeletedMoneySpend"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
// @ts-ignore
import { SearchDTOItem } from "./Models/SearchDTOItem.ts";
import { CreateMoneySpendRequest } from "../../Models/Request/MoneySpend/CreateMoneySpendRequest";
// @ts-ignore
import { TableColumn } from "./Models/TableColumn.ts";
// @ts-ignore

// @ts-ignore

// @ts-ignore
import { Filter } from "@/components/maynghien/BaseModels/Filter";
// @ts-ignore
import { formatCurrency } from "@/Services/CurrencyUtilities";
import { useToast } from "vue-toastification";
// @ts-ignore
import CreateMoneySpend from "@/components/MoneySpend/CreateMoneySpend.vue";
// @ts-ignore
import MnEditItem from "@/components/maynghien/adminTable/MnEditItem.vue";
// @ts-ignore
import { languages } from "@/languages";
import { handleAPISearch } from "@/components/maynghien/adminTable/Service/BasicAdminService.js";
import type { SearchResponse } from "@/components/maynghien/BaseModels/SearchResponse.js";
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest.js";

const _toast = useToast();
const Search = async (apiName: any) => {
  if (moneyHolderValue.value) {
    let filters: Filter[] = [
      {
        FieldName: "moneyHolderId",
        Value: moneyHolderValue.value,
        Type: "dropdown",
        Operation: "",
        DisplayName: "",
        dropdownData: undefined,
      },
    ];
    searchRequest.filters = filters;
  }
  //  console.log(searchRequest.filters);
  var searchApiResponse = await handleAPISearch(searchRequest, apiName);
  // console.log(searchApiResponse);
  if (searchApiResponse.isSuccess && searchApiResponse.data != undefined) {
    // console.log("success");
    let dataResponse: SearchResponse<SearchDTOItem[] | undefined> =
      searchApiResponse.data;
    // console.log(dataResponse);
    if (
      dataResponse != undefined &&
      dataResponse.data != undefined &&
      dataResponse.data.length > 0
    ) {
      return dataResponse.data;
    } else {
      return [];
    }
  }
  _toast.error(searchApiResponse.message);
};
// let budgetData = ref<SearchDTOItem[]>([]);
let searchRequest: SearchRequest = {
  PageIndex: 1,
  PageSize: 10,
  //   filters:  Filter[],
  SortBy: undefined,
};

const formatAmount = (row: any, column: any, cellValue: any) => {
  // console.log(cellValue);
  return formatCurrency(cellValue);
};
const incomeCol: TableColumn[] = [
  {
    key: "moneyHolderId",
    label: languages.global.t("moneyHolder.name"),
    enableEdit: true,
    enableCreate: true,
    hidden: true,
    width: 300,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "moneyHolder",
    },
    isReadonly: true,
    showInTable: false,
  },
  {
    key: "name",
    label: languages.global.t("name"),
    enableCreate: true,
    enableEdit: true,
    hidden: false,
    width: 500,
    required: true,
    inputType: "text",
    align: "left",
    showInTable: true,
  },
  {
    key: "amount",
    label: languages.global.t("amount"),
    enableCreate: true,
    enableEdit: true,
    hidden: false,
    width: 500,
    required: true,
    inputType: "currency",
    align: "right",
    formatter: formatAmount,
    showInTable: true,
  },
];
const moneySpendCol: TableColumn[] = [
  // {
  //     key: "id",
  //     label: "id",
  // },
  {
    key: "moneyHolderId",
    label: languages.global.t("moneyHolder.name"),
    enableEdit: true,
    enableCreate: true,
    hidden: true,
    width: 300,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "moneyHolder",
    },
    isReadonly: true,
    showInTable: false,
  },
  {
    key: "budgetId",
    label: languages.global.t("budget.name"),
    enableEdit: true,
    enableCreate: true,
    hidden: false,
    width: 300,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "budget",
    },
    showInTable: false,
  },
  {
    key: "reason",
    label: languages.global.t("moneySpend.reason"),
    enableCreate: true,
    enableEdit: true,
    hidden: false,
    width: 500,
    required: true,
    inputType: "text",
    align: "left",
    showInTable: true,
  },
  {
    key: "amount",
    label: languages.global.t("amount"),
    align: "right",
    enableCreate: true,
    enableEdit: true,
    inputType: "amount-detail",
    formatter: formatAmount,
    showInTable: true,
  },
  {
    key: "details",
    label: languages.global.t("details"),
    align: "right",
    enableCreate: true,
    enableEdit: true,
    hidden: true,
    showInTable: false,
    inputType: "details",
  },
];
const handleIncomeRowClick = (row: any, column: any, event: any) => {
  // console.log(row)
  // console.log(column)
  // console.log(event)
  incomeItem.value = { ...(row as SearchDTOItem) };
  oldItemAmount.value = incomeItem.value.amount;
  isEdittingIncome.value = true;
  isOpenIncomeDialog.value = true;
};
const handleMoneySpendRowClick = (row: any, column: any, event: any) => {
  //  console.log(moneySpendData.value)
  // moneySpendItem.value =  { ...row as SearchDTOItem}
  moneySpendItem.value = JSON.parse(JSON.stringify(row as SearchDTOItem)); //to prevent change the detail of the row when edit but not save
  //  console.log(moneySpendItem.value)
  oldItemAmount.value =
    moneySpendItem.value.amount != undefined ? moneySpendItem.value.amount : 0;
  isEdittingMoneySpend.value = true;
  isOpenMoneySpendDialog.value = true;
};
const moneyHolderValue = ref("");
const budgetData = ref(null);
const incomeData = ref<SearchDTOItem[] | undefined>([]);
const moneySpendData = ref<SearchDTOItem[] | undefined>([]);
// const moneyHolderData = ref<[{
//     value: 'Option1',
//     label: 'Option1',
//   }] | null>(null)
const moneyHolderData = ref<SearchDTOItem[]>();
// const balance = ref<Number>(0);
const incomeItem = ref<SearchDTOItem>({});
const moneySpendItem = ref<SearchDTOItem>({});
const balance = ref(0);
const oldItemAmount = ref<number>(0);
const incomeSummary = computed(() => {
  if (!incomeData.value) {
    return 0; // or any default value when there's no data
  }

  // const lastColumnKey = incomeCol[incomeCol.length - 1].key;
  return incomeData.value.reduce(
    (sum: number, row: any) => sum + Number(row["amount"]),
    0
  );
});
const expenseSummary = computed(() => {
  if (!moneySpendData.value || moneySpendCol.length == 0) {
    return 0; // or any default value when there's no data
  }

  // const lastColumnKey = moneySpendCol[moneySpendCol.length - 1].key;
  return moneySpendData.value.reduce(
    (sum: number, row: any) => sum + Number(row["amount"]),
    0
  );
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
      balance.value = moneyHolderData?.value?.find(
        (item) => item.id === newValue
      ).balance;
      //const additionalData = await Search("AdditionalData"); // Replace "AdditionalData" with the desired API name
      // Process the additional data as needed
      incomeData.value = [];
      moneySpendData.value = [];
      incomeData.value = await Search("Income");
      // console.log(incomeData.value);
      moneySpendData.value = await Search("MoneySpend");
      // console.log(moneySpendData.value);
    } catch (error) {
      console.error("Error fetching additional data:", error);
      // Handle the error accordingly
    }
  }
});
// const handleColumnVisibilityChange = (column : any) => {
//     console.log(`Column ${column.key} visibility changed to ${column.visible}`);
//   };
// const isOpenEditMoneySpendDialog = ref(false);
const isOpenMoneySpendDialog = ref(false);
const isOpenIncomeDialog = ref(false);
const isEdittingIncome = ref(false);
const isEdittingMoneySpend = ref(false);
const SaveIncome = async () => {
  incomeData.value = await Search("Income");
  isOpenIncomeDialog.value = false;
  //   console.log(incomeItem.value.amount);
  if (isEdittingIncome.value) {
    balance.value -= oldItemAmount.value;
  }
  balance.value += Number(incomeItem.value.amount);
  incomeItem.value = {};
};
const SaveMoneySpend = async () => {
  moneySpendData.value = await Search("MoneySpend");
  isOpenMoneySpendDialog.value = false;
  //   console.log(moneySpendItem.value);
  //   console.log(oldItemAmount.value)
  if (isEdittingMoneySpend.value) {
    balance.value += oldItemAmount.value;
  }
  balance.value -= Number(moneySpendItem.value.amount);
  moneySpendItem.value = {};
};

const CloseIncomeDialog = () => {
  // console.log("close create ");
  if (isOpenIncomeDialog.value) {
    isOpenIncomeDialog.value = false;
  }
  if (isEdittingIncome.value) {
    incomeItem.value = {};
  }
};
const CloseMoneySpendDialog = () => {
  // console.log("close create ");
  if (isOpenMoneySpendDialog.value) {
    isOpenMoneySpendDialog.value = false;
  }
  if (isEdittingMoneySpend.value) {
    moneySpendItem.value = {};
  }
};
const handleOpenCreateIncome = () => {
  // console.log("open create Income");
  incomeItem.value.moneyHolderId = moneyHolderValue.value;
  isEdittingIncome.value = false;
  isOpenIncomeDialog.value = true;
};
const handleOpenCreateMoneySpend = () => {
  // console.log("open create");
  moneySpendItem.value.MoneyHolderId = moneyHolderValue.value;
  isEdittingMoneySpend.value = false;
  isOpenMoneySpendDialog.value = true;
};

onMounted(() => {
  document.addEventListener("keypress", handleKeypress);
});
const handleKeypress = (event: KeyboardEvent) => {
  //   console.log(event.key);
  // Check if the key pressed is the Enter key (key code 13)

  if (
    isOpenIncomeDialog.value === false &&
    isOpenMoneySpendDialog.value === false
  ) {
    if (event.key === "+") {
      CloseMoneySpendDialog();
      handleOpenCreateIncome();
    } else if (event.key === "-") {
      CloseIncomeDialog();
      handleOpenCreateMoneySpend();
    }
  }
};

const handleDeletedMoneySpend = async () => {
  CloseMoneySpendDialog();
  balance.value += oldItemAmount.value;
  moneySpendData.value = await Search("MoneySpend");
};
const handleDeletedIncome = async () => {
  CloseIncomeDialog();
  balance.value -= oldItemAmount.value;
  incomeData.value = await Search("Income");
};
</script>

<style>
.moneyOverviewContainer {
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
  word-break: break-all;
}

.absolute-right {
  position: absolute;
  right: 0px;
}
.absolute-left {
  position: absolute;
  left: 0px;
}
.el-table tr:hover {
  cursor: pointer;
}
.el-table {
  --el-table-row-hover-bg-color: var(--el-color-primary-light-9);
}
</style>
