
<template>
  <MnTable :columns="tableColumns" :dtoData="datas" />
</template>
  
<script setup lang="ts">

// @ts-ignore
import { MnTable } from './MnTable.ts'

import { ref } from 'vue';
// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'

// @ts-ignore
import { handleSearch } from './Service/BasicAdminService.ts'

// @ts-ignore
import { SearchResponse } from '../BaseModels/SearchResponse';
import { SearchRequest } from '../BaseModels/SearchRequest';
import type { AppResponse } from '@/models/AppResponse';


const props = defineProps<{
  tableColumns: TableColumn[];
  apiName: string;
}>();
let datas: SearchDTOItem[] | undefined;
let searchRequest: SearchRequest = {
PageIndex: 1,
PageSize: 10,
filters: undefined,
SortByInfo: undefined
}
var searchApiResponse = await handleSearch(searchRequest, props.apiName);
if (searchApiResponse.isSuccess) {
  let dataresponse: AppResponse<SearchResponse<SearchDTOItem[]>> = searchApiResponse.data;
  datas = dataresponse.data?.Data;
}
</script>