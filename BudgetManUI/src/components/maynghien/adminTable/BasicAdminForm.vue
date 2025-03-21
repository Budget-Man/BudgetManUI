
<template>
  <ConfirmPopup></ConfirmPopup>

  <MnActionPane :allowAdd="allowAdd" :tableColumns="tableColumns" :isEdit="isEditting"
    @onBtnSearchClicked="handleBtnSearchClicked" @onBtnAddClicked="handleOpenCreate" :CustomActions="CustomButtons"
    :openDialog="openDialogCreate" @onCustomAction="handleCustomAction">
  </MnActionPane>
  <div class="table-container">
    <MnTable :columns="tableColumns" :datas="datas" :onSaved="handleSaved" :enableEdit="allowEdit"
      :enableDelete="allowDelete" :onCloseClicked="handleOnEditCloseClicked" @onEdit="handleEdit" @onDelete="handleDelete"
      :CustomActions="CustomRowActions" @on-custom-action="handleCustomAction" @onSortChange="handleSortChange" />
      <div v-if="datas.length>0">
    <el-pagination small background layout="prev, pager, next" :total="totalItem" :page-size="10"
      @current-change="handlePageChange" :current-page="searchRequest.PageIndex" class="mt-4" />
    <!-- Found {{ totalItem }} results. Page {{ searchRequest.PageIndex }} of total {{ totalPages }} pages -->
    <div class="el-pagination"> {{ totalItem }} {{ $t('results') }}. {{ $t('page') }} {{ searchRequest.PageIndex }} / {{ totalPages }}</div>
    </div>
  </div>

  <MnEditItem ref="MnEdit" :columns="tableColumns" :apiName="apiName" :openDialog="openDialogCreate" :title="title"
    :createUrl="createUrl" :editUrl="editUrl" :editItem="EdittingItem" :isEdit="isEditting" @onSaved="handleSaved"
    @onCloseClicked="handleOnEditCloseClicked" />



</template>
  
<script setup lang="ts">

// @ts-ignore
import MnTable from './MnTable.vue'

// @ts-ignore
import MnActionPane from './MnActionPane.vue'
// @ts-ignore
import MnEditItem from './MnEditItem.vue'

import { ref, watch } from 'vue';
// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'

// @ts-ignore
import { handleAPICustom, handleAPIDelete, handleAPISearch } from './Service/BasicAdminService.ts'

// @ts-ignore
import { Filter } from '../BaseModels/Filter';
// @ts-ignore
import { SearchResponse } from '../BaseModels/SearchResponse';
import { SearchRequest } from '../BaseModels/SearchRequest';
// import type { AppResponse } from '@/Models/AppResponse';
// @ts-ignore
import { ElMessage } from 'element-plus';
import type {  CustomAction, CustomActionResponse } from './Models/CustomAction';

import  { ApiActionType } from './Models/CustomAction';
import { SortByInfo } from '../BaseModels/SortByInfo';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from 'primevue/confirmpopup';
const confirm = useConfirm();

//#region Method

const Search = async () => {
  var searchApiResponse = await handleAPISearch(searchRequest, props.apiName);
  if (searchApiResponse.isSuccess && searchApiResponse.data != undefined) {
    let dataresponse: SearchResponse<SearchDTOItem[] | undefined> = searchApiResponse.data;

    if (dataresponse != undefined && dataresponse.data != undefined && dataresponse.data.length > 0) {
      datas.value = dataresponse.data;
      if (dataresponse.totalPages != undefined)
        totalPages.value = dataresponse.totalPages;
      else
        totalPages.value = 0;
      if (dataresponse.totalRows != undefined) {
        totalItem.value = Math.abs(dataresponse.totalRows);
      }
      else
        totalItem.value = 0;
    }
    else {
      datas.value = [];
    }
  }
  // console.log(datas);
}

//#endregion
//#region main

const props = defineProps<{
  tableColumns: TableColumn[];
  apiName: string;
  createUrl?: string;
  editUrl?: string;
  allowAdd: boolean;
  allowEdit: boolean;
  allowDelete: boolean;
  title: string;
  CustomActions: CustomAction[];
  CustomFilters?: Filter[];
  isEditedOutSide?: boolean;
}>();
const emit = defineEmits<{

  (e: 'onCustomAction', item: CustomActionResponse): void;
}>()
let datas = ref<SearchDTOItem[]>([]);
const totalPages = ref(0);
const totalItem = ref(10);


let searchRequest: SearchRequest = {
  PageIndex: 1,
  PageSize: 10,
  filters: props.CustomFilters,
  SortBy: undefined
}
const CustomButtons = ref<CustomAction[]>([{}]);
const CustomRowActions = ref<CustomAction[]>([{}]);

const search = async () => {
  await Search();
};

search();

//#endregion
//#region variable
const SelectedRowId = ref<string | null>(null);
const EdittingItem = ref<SearchDTOItem>({});
const openDialogCreate = ref<boolean>(false);
const isEditting = ref(false);
//#endregion

//#region event funcs
const handleBtnSearchClicked = (filters: Filter[]) => {
  filters = filters.concat(props.CustomFilters ?? []);
  searchRequest.filters = filters;
  searchRequest.PageIndex = 1;
  Search();

}
const handleSaved = async () => {
  openDialogCreate.value = false;
  searchRequest.PageIndex = 1;
  EdittingItem.value = new SearchDTOItem(props.tableColumns);
  Search();
}
const handleOnEditCloseClicked = async () => {
  openDialogCreate.value = false;
  EdittingItem.value = new SearchDTOItem(props.tableColumns);
}
type OpenCreateDialogType = () => void;
type ChildMethodType = () => void;

// // Explicitly specify the type of the injected value with a default value
// const childMethod: ChildMethodType|undefined = inject('childMethod', undefined);

// const OpenCreateDialog: OpenCreateDialogType = inject('OpenDialogEditItem', undefined);

const handleOpenCreate = async () => {
  // console.log("open create");

  EdittingItem.value = new SearchDTOItem(props.tableColumns);

  isEditting.value = false;
  openDialogCreate.value = true;
}
const handleDelete = async (id: string, target: EventTarget | null) => {
  // console.log('handle delete id: ' + id)
  // console.log(target)
  confirm.require({
    target: target as HTMLElement | undefined,
    message: t("delete-confirm"),
    // header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: t("cancel"),
    acceptLabel: t("delete"),
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: async () => {
      var deleteresult = await handleAPIDelete(id, props.apiName);
      if (deleteresult.isSuccess) {
        ElMessage({
          message: t("row-deleted"),
          type: "success",
        });
        await Search();
      } else {
        ElMessage({
          message: t("deleted-error"),
          type: "error",
        });
      }
    },
    reject: () => {
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    },
  });
};
const handleSortChange = async (event: any) => {
  const sortByInfo: SortByInfo = {
    FieldName: event.column.property,
    Ascending: event.column.order != "descending"

  }
  searchRequest.SortBy = sortByInfo;
  searchRequest.PageIndex = 1;
  await Search();
};
const SelectedId = ref("");
//provide('OpenDialogCreateItem', openDialogCreate);
const handleEdit = async (item: SearchDTOItem) => {
  EdittingItem.value = { ...item };
  isEditting.value = true;
  openDialogCreate.value = true;
}
const handleCustomAction = async (item: CustomActionResponse) => {
  if (item.Action.ApiActiontype != ApiActionType.None ) {
    // console.log(item);
    var url: string = props.apiName +( item.Action.ActionName!=undefined? ("/" + item.Action.ActionName):"");
    // console.log(url)
    var apiResult = await handleAPICustom(item.Data, item.Action, url);
    console.log(apiResult);

    if (!apiResult.isSuccess) {
      console.log(apiResult);
      return;
    }
    else {
      searchRequest.PageIndex = 1;
      await Search();
    }
  }
  else {
    emit("onCustomAction", item);
  }
}
const handlePageChange = async (value: number) => {
  searchRequest.PageIndex = value;
  await Search();
}
//#endregion

watch(() => props.CustomActions, () => {
  CustomButtons.value = props.CustomActions.filter(m => m.IsRowAction == false);
  CustomRowActions.value = props.CustomActions.filter(m => m.IsRowAction == true);
  // console.log(CustomRowActions);
}, { immediate: true })

watch(() => props.isEditedOutSide, () => {
  if(props.isEditedOutSide!=undefined && props.isEditedOutSide==true){
    Search();
  }
}, { immediate: true })
</script>