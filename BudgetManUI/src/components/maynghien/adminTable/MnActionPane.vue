el-button
<template>
  <el-row
    class="action-pane flex justify-between"
    style="flex-wrap: nowrap; gap: 2px; overflow: auto; justify-content: space-between;"
  >
    <div style="display: flex;gap:2px;flex-wrap: nowrap;flex-shrink: 0;">
      <div v-for="filter in filters" style="flex-shrink: 0">
        <el-input
          v-model="filter.Value"
          :placeholder="filter.DisplayName"
          v-if="filter.Type == undefined || filter.Type == 'text'"
          class="action-input"
        >
        </el-input>
        <el-select
          v-model="filter.Value"
          :placeholder="filter.DisplayName"
          class="action-input"
          v-if="filter.Type == 'dropdown'"
        >
          <el-option label="" value="" />

          <el-option
            v-for="item in filter.dropdownData.data"
            :key="item[filter.dropdownData.keyMember]"
            :label="item[filter.dropdownData.displayMember]"
            :value="item[filter.dropdownData.keyMember]"
          />
        </el-select>
      </div>
      <el-button
        type="primary"
        v-if="filters != undefined && filters.length > 0"
        :icon="Search"
        @click="handlebtnSearchClicked"
      >
        {{ $t("search") }}</el-button
      >
    </div>

    <div style="flex-shrink: 0;">
      <el-button
        type="primary"
        :icon="Plus"
        @click="handlebtnAddClicked"
        v-if="allowAdd"
      >
        {{ $t("create") }}</el-button
      >
      <el-button
        v-for="customAction in CustomActions"
        :icon="customAction.Icon"
        @click="handlebtnCustomActionClicked(customAction)"
      >
        {{ customAction.ActionLabel }}
      </el-button>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Plus,
} from "@element-plus/icons-vue";

// @ts-ignore
import { TableColumn } from "./Models/TableColumn.ts";

// @ts-ignore
import { Filter } from "../BaseModels/Filter";

import { ref, watch } from "vue";
import { CustomActionResponse, CustomAction } from "./Models/CustomAction";
import { handleAPIGetDropdownList } from "./Service/BasicAdminService";
const props = defineProps<{
  tableColumns: TableColumn[];
  allowAdd: boolean;
  CustomActions: CustomAction[];
}>();

const emit = defineEmits<{
  (e: "onBtnAddClicked"): void;
  (e: "onBtnSearchClicked", filters: Filter[]): void;
  (e: "onCustomAction", item: CustomActionResponse): void;
}>();
const filters = ref<Filter[]>([]);

const dropdownData = ref<any[]>([]);
props.tableColumns.forEach((colum) => {
  if (colum.showSearch) {
    const newFilter: Filter = {
      FieldName: colum.key,
      DisplayName: colum.label,
      Value: "",
      Operation: "",
      Type: colum.inputType,
      dropdownData: colum.dropdownData,
    };
    filters.value?.push(newFilter);
  }
});
const handlebtnAddClicked = () => {
  //console.log("btn add click");
  emit("onBtnAddClicked");
  //console.log("not err");
};
const handlebtnSearchClicked = () => {
  const filtersRequest = filters.value.filter(
    (filter) =>
      filter.Value !== null && filter.Value !== undefined && filter.Value != ""
  );

  emit("onBtnSearchClicked", filtersRequest);
};

const handlebtnCustomActionClicked = async (action: CustomAction) => {
  let response: CustomActionResponse = new CustomActionResponse(
    action,
    filters
  );
  emit("onCustomAction", response);
};
watch(
  () => props.tableColumns,
  async () => {
    props.tableColumns.forEach(async (tableCol) => {
      if (
        tableCol.inputType == "dropdown" &&
        tableCol.dropdownData.apiUrl != undefined
      ) {
        var data = await handleAPIGetDropdownList(tableCol.dropdownData.apiUrl);
        // console.log(data);

        if (data != undefined && data.data) {
          tableCol.dropdownData.data = data.data;
        }
      }
    });

    // console.log(props.tableColumns);
    filters.value = [];
    props.tableColumns.forEach((colum) => {
      if (colum.showSearch) {
        const newFilter: Filter = {
          FieldName: colum.key,
          DisplayName: colum.label,
          Value: "",
          Operation: "",
          Type: colum.inputType,
          dropdownData: colum.dropdownData,
        };
        filters.value?.push(newFilter);
      }
    });
  },
  { immediate: true }
);
</script>
<style>
.action-pane {
  width: "100%";
  padding: 10px;
  gap: 1em;
}

.action-pane .buttons {
  padding: 5px 0px;
}

.action-pane .action-input {
  padding-right: 5px;
}
</style>
